import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for auth context
interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

interface Session {
  user: User;
  access_token: string;
  expires_at: number;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUser: User = {
  id: "current-user",
  email: "prabjyotsingh996@gmail.com",
  user_metadata: {
    full_name: "Prabjyotsingh996"
  }
};

// Mock session data
const mockSession: Session = {
  user: mockUser,
  access_token: "mock-token",
  expires_at: new Date().getTime() + 3600000
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session] = useState<Session | null>(mockSession);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // Always authenticated in the demo
  const isAuthenticated = true;

  // Mock sign out function
  const signOut = async () => {
    console.log("Sign out called (demo mode)");
    // In a real app, this would clear the session
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, error, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 