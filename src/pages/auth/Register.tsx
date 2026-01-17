import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface RegisterForm {
  username: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData.username, formData.password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Registration failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className='w-full max-w-md'>
      <div
        className={`rounded-2xl shadow-xl p-8 ${
          isDark
            ? "bg-gray-900 border border-gray-800"
            : "bg-white border border-gray-200"
        }`}>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Create Account</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Join us and start your journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Username */}
          <div>
            <label
              htmlFor='username'
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Enter your username'
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor='password'
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Create a password'
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}>
            {isSubmitting ? (
              <span className='flex items-center justify-center gap-2'>
                <svg
                  className='animate-spin h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className='my-6 flex items-center'>
          <div
            className={`flex-1 h-px ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}></div>
          <span
            className={`px-4 text-sm ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}>
            or
          </span>
          <div
            className={`flex-1 h-px ${
              isDark ? "bg-gray-700" : "bg-gray-300"
            }`}></div>
        </div>

        {/* Login Link */}
        <p className='text-center'>
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Already have an account?{" "}
          </span>
          <Link
            to='/login'
            className='text-blue-500 hover:text-blue-600 font-medium transition-colors'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
