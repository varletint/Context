import { useTheme } from "../context/ThemeContext";

export function ThemedCard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`p-8 rounded-2xl shadow-xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-900 border border-gray-200"
      }`}>
      <h2 className='text-2xl font-bold mb-4'>
        Current Theme: <span className='capitalize'>{theme}</span>
      </h2>
      <p className='mb-6 opacity-80'>
        This card reads the theme from context using{" "}
        <code className='bg-gray-500/20 px-2 py-1 rounded'>useTheme()</code>
      </p>
      <button
        onClick={toggleTheme}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
          theme === "dark"
            ? "bg-indigo-500 hover:bg-indigo-400 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}>
        Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
