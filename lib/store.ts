import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role, User } from "@/types";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => {
        Cookies.remove("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
