import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => void;
}

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
              data: {
                name: name,
              },
            },
          });

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
