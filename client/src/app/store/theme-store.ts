import { create, type StateCreator } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type ThemeType = "dark" | "light" | "system";

interface ThemeStore {
  theme: ThemeType;
  setTheme: (value: ThemeType) => void;
}


const themeStore: StateCreator<ThemeStore> = (set) => ({
  theme: "system",
  setTheme: (theme: ThemeType) => set({ theme }),
});

const useThemeStore = create(
  devtools(
    persist(themeStore, {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useThemeStore;
