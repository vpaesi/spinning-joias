import { useEffect, useState } from "react";
import {
  THEME_PREFERENCE_KEY,
  ThemeContext,
  type Theme,
} from "./themeContext";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  return window.localStorage.getItem(THEME_PREFERENCE_KEY) === "light"
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_PREFERENCE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
