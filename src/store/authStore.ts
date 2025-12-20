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
            return false;
          }

          if (data.user) {
            const user = mapSupabaseUser(data.user, data.user.user_metadata);
            set({
              user,
              isAuthenticated: true,
            });
            return true;
          }

          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin,
              data: {
                name: name,
              },
            },
          });
          
          // Auto-confirm the user
          if (data.user) {
            await supabase.auth.signInWithPassword({
              email,
              password,
            });
          }

          if (error) {
            console.error('Signup error:', error.message);
            return false;
          }

          if (data.user) {
            const user = mapSupabaseUser(data.user, { name });
            set({
              user,
              isAuthenticated: true,
            });
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
