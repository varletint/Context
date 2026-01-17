import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, setAccessToken } from "../services/api";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const response = await authApi.me();
        setUser(response.data.user);
        return response.data.user;
      } catch {
        setUser(null);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const login = async (username: string, password: string) => {
    const response = await authApi.login({ username, password });
    const { user } = response.data.data;
    setUser(user);
    // Invalidate auth query to refetch user data
    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  };

  const register = async (username: string, password: string) => {
    const response = await authApi.register({
      username,
      password,
      role: "user",
    });
    const { user } = response.data.data;
    setUser(user);
    // Invalidate auth query to refetch user data
    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null); // Clear token from memory
      setUser(null);
      // Clear auth query cache
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
