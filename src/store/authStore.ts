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
      user: {
        id: 'guest',
        name: 'Guest User',
        email: 'guest@example.com'
      },
      isAuthenticated: true,
      isLoading: false,
      
      initializeAuth: () => {
        // No authentication needed, just set as guest
        set({ 
          user: {
            id: 'guest',
            name: 'Guest User',
            email: 'guest@example.com'
          },
          isAuthenticated: true,
          isLoading: false 
        });
      },
    }),
    {
      name: 'anime-auth',
    }
  )
);
