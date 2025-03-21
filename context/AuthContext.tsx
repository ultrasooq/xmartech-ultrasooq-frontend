"use client";

import { setUserLocale } from "@/src/services/locale";
import React, { createContext, startTransition, useContext, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  tradeRole: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  clearUser: () => void;
  permissions: any[];
  setPermissions: (permissions: any[]) => void;
  applyTranslation: (locale: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  user: User | null;
  permissions: any[];
  children: React.ReactNode;
}> = ({ user: initialUser, permissions: initialPermissions, children }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const [permissions, setPermissions] = useState<any[]>(initialPermissions);

  const isAuthenticated = !!user;

  const clearUser = () => {
    setUser(null);
  };

  const applyTranslation = async (locale: string) => {
    await setUserLocale(locale);
    startTransition(() => {
      
    })
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, clearUser, permissions, setPermissions, applyTranslation }}>
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
