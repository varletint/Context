import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export function Dashboard() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`p-8 rounded-2xl shadow-xl w-full max-w-md ${
        isDark ? "bg-gray-800" : "bg-white border border-gray-200"
      }`}>
      <div className='text-center mb-6'>
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-4 ${
            isDark ? "bg-indigo-600" : "bg-indigo-100 text-indigo-600"
          }`}>
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <h2 className='text-2xl font-bold'>Welcome, {user?.name}!</h2>
        <p className='text-sm opacity-70 mt-1'>{user?.email}</p>
      </div>

      <div
        className={`p-4 rounded-lg mb-6 ${
          isDark ? "bg-gray-700" : "bg-gray-100"
        }`}>
        <h3 className='font-semibold mb-2'>Your Profile</h3>
        <ul className='text-sm space-y-1 opacity-80'>
          <li>
            <strong>ID:</strong> {user?.id}
          </li>
          <li>
            <strong>Name:</strong> {user?.name}
          </li>
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
        </ul>
      </div>

      <button
        onClick={logout}
        className='w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer'>
        Sign Out
      </button>
    </div>
  );
}
