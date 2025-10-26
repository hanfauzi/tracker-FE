import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
}
export const useAuth = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setSession: (token, user) => set({ accessToken: token, user }),
  setAccessToken: (token) => set((s) => ({ accessToken: token, user: s.user })),
  clearAuth: () => set({ accessToken: null, user: null }),
}));
