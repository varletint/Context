import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export function LoginForm() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password);

    if (!success) {
      setError("Invalid credentials. Password must be at least 4 characters.");
    }
    setIsLoading(false);
  };

  const isDark = theme === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-2xl shadow-xl w-full max-w-md ${
        isDark ? "bg-gray-800" : "bg-white border border-gray-200"
      }`}>
      <h2 className='text-2xl font-bold mb-6 text-center'>Welcome Back</h2>

      {error && (
        <div className='mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm'>
          {error}
        </div>
      )}

      <div className='mb-4'>
        <label className='block text-sm font-medium mb-2'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
          required
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDark
              ? "bg-gray-700 border-gray-600 focus:border-indigo-500"
              : "bg-gray-50 border-gray-300 focus:border-indigo-500"
          } outline-none`}
        />
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='••••••••'
          required
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDark
              ? "bg-gray-700 border-gray-600 focus:border-indigo-500"
              : "bg-gray-50 border-gray-300 focus:border-indigo-500"
          } outline-none`}
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors cursor-pointer'>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
