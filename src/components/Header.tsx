import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const isDark = theme === "dark";

  return (
    <header
      className={`w-full py-4 px-6 flex justify-between items-center ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}>
      <div>
        <h1 className='text-xl font-bold'>🔐 Auth Context Demo</h1>
        <p className='text-sm opacity-70'>
          {isAuthenticated ? `Logged in as ${user?.name}` : "Not logged in"}
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
          isDark
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}
