import { create, type StateCreator } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { UserRole } from "@/types";

interface AuthStore {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  tokenExpiry: number;
  setTokenExpiry: (value: number) => void;
  userRole: UserRole;
  setUserRole: (value: UserRole) => void;
}

const authStore: StateCreator<AuthStore> = (set) => ({
  authenticated: false,
  setAuthenticated: (authenticated: boolean) => set({ authenticated }),
  tokenExpiry: 0,
  setTokenExpiry: (tokenExpiry: number) => set({ tokenExpiry }),
  userRole: "USER",
  setUserRole: (userRole: UserRole) => set({ userRole }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useAuthStore;
