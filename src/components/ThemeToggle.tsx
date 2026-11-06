import { useTheme } from "../context/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={theme === "dark"}
      className="btn-theme-toggle ml-2 text-2xl p-2 rounded-full transition flex items-center justify-center"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun-fill text-yellow-500 flex items-center"></i>
      ) : (
        <i className="bi bi-moon-fill text-gray-700 flex items-center"></i>
      )}
    </button>
  );
}
