import { create } from "zustand";
interface themeStore {theme:string,setTheme:(theme:string)=>void}

export const useThemeStore = create((set):themeStore => ({
  theme: localStorage.getItem("LinkUpTheme") || "forest",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("LinkUpTheme", theme);
  },
}));