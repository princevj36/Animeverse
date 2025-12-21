import { createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: true,
  user: {
    id: 'guest',
    name: 'Guest User',
    email: 'guest@example.com'
  }
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
