import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

interface RegisterFormProps {
  onToggle: () => void;
}

export function RegisterForm({ onToggle }: RegisterFormProps) {
  const { register } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register(username, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-2xl shadow-xl w-full max-w-md ${
        isDark ? "bg-gray-800" : "bg-white border border-gray-200"
      }`}>
      <h2 className='text-2xl font-bold mb-6 text-center'>Create Account</h2>

      {error && (
        <div className='mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm'>
          {error}
        </div>
      )}

      <div className='mb-4'>
        <label className='block text-sm font-medium mb-2'>Username</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='johndoe'
          required
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDark
              ? "bg-gray-700 border-gray-600 focus:border-indigo-500"
              : "bg-gray-50 border-gray-300 focus:border-indigo-500"
          } outline-none`}
        />
        <p className='text-xs text-gray-500 mt-1 ml-1'>
          3-30 characters, letters & numbers only
        </p>
      </div>

      <div className='mb-4'>
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

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>
          Confirm Password
        </label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        className='w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors cursor-pointer mb-4'>
        {isLoading ? "Sign Up" : "Create Account"}
      </button>

      <p className='text-center text-sm text-gray-400'>
        Already have an account?{" "}
        <button
          type='button'
          onClick={onToggle}
          className='text-indigo-500 hover:text-indigo-400 font-medium'>
          Sign in
        </button>
      </p>
    </form>
  );
}
