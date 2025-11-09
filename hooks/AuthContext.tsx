import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        // In production: const current = await appwrite.getCurrentUser();
        // Mock for now:
        const current = null;
        if (current) setUser(current);
      } catch (err) {
        console.log("No logged-in user found:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

    async function login(email: string, password: string) {
        // Replace with: const loggedIn = await appwrite.loginWithEmail(email, password);
        const loggedIn = { id: "1", name: "Test User", email };
        setUser(loggedIn);
    }

    async function register(email: string, password: string, name: string) {
        // Replace with: const newUser = await appwrite.registerWithEmail(email, password, name);
        const newUser = { id: "2", name, email };
        setUser(newUser);
    }

    async function logout() {
        // Replace with: await appwrite.logoutCurrentDevice();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}