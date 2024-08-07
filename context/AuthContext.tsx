"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  user: User | null;
  children: React.ReactNode;
}> = ({ user: initialUser, children }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const isAuthenticated = !!user;

  const clearUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
