import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.username || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.username, formData.password);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setErrorMessage(axiosError.response?.data?.message || "Login failed");
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=' items-center justify-center bg-gray-900 p-6'>
      <h1 className=' mb-3 text-center text-white'>Login</h1>
      {errorMessage && (
        <div
          className=' text-center
          mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm'>
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-gray-500 p-8 space-y-2'>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
            outline-none'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
            outline-none'
          />
        </div>
        <button type='submit' className=' bg-black w-full text-white'>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href='/register'>Register</a>
      </p>
    </div>
  );
}
