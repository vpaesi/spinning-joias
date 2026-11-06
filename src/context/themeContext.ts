import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const THEME_PREFERENCE_KEY = "theme-preference";
export const ThemeContext = createContext<ThemeContextValue | null>(null);
