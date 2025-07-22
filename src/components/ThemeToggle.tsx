import { useEffect, useState } from "react";

function getInitialTheme() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  }
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Alternar tema claro/escuro"
      className="btn-theme-toggle ml-2 text-2xl p-2 rounded-full transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun-fill text-yellow-500"></i>
      ) : (
        <i className="bi bi-moon-fill text-gray-700"></i>
      )}
    </button>
  );
}