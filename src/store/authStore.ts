import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const mapSupabaseUser = (supabaseUser: SupabaseUser | null, metadata?: { name?: string }): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    name: metadata?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
    avatar: supabaseUser.user_metadata?.avatar_url,
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      
      initializeAuth: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const user = mapSupabaseUser(session.user, session.user.user_metadata);
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              const user = mapSupabaseUser(session.user, session.user.user_metadata);
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({ user: null, isAuthenticated: false, isLoading: false });
            }
          });
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('Login error:', error.message);
            
            // Check if the error is due to email not being verified
            if (error.message.includes('Email not confirmed')) {
              throw new Error('Please verify your email before logging in. Check your inbox for a verification link.');
            }
            
            return false;
          }

          if (data.user) {
            // Check if the user's email is verified
            if (!data.user.email_confirmed_at) {
              // Sign out the user if email is not verified
              await supabase.auth.signOut();
              throw new Error('Please verify your email before logging in. Check your inbox for a verification link.');
            }
            
            const user = mapSupabaseUser(data.user, data.user.user_metadata);
            set({
              user,
              isAuthenticated: true,
            });
            return true;
          }

          return false;
        } catch (error: any) {
          console.error('Login error:', error);
          // Re-throw the error so it can be handled by the UI
          throw error;
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
                email_redirect_to: `${window.location.origin}?type=signup&email=${encodeURIComponent(email)}`,
              },
              emailRedirectTo: `${window.location.origin}?type=signup&email=${encodeURIComponent(email)}`,
            },
          });

          if (error) {
            console.error('Signup error:', error.message);
            return false;
          }

          // Don't sign in automatically, wait for email verification
          if (data.user) {
            // We'll return true to indicate the signup was successful
            // but we won't set isAuthenticated to true yet
            return true;
          }

          return false;
        } catch (error) {
          console.error('Signup error:', error);
          return false;
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'anime-auth',
    }
  )
);
