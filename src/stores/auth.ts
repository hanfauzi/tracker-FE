"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SessionState = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  clear: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (t) => set({ accessToken: t }),
      clear: () => set({ accessToken: null }),
    }),
    {
      name: "tracker", 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
);