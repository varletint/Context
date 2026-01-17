import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";

// Main content that switches between Login and Dashboard
function MainContent() {
  const { isAuthenticated } = useAuth();

  return (
    <main className='flex-1 flex items-center justify-center p-8'>
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </main>
  );
}

// Wrapper that applies theme styles to the page
function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}>
      <Header />
      <MainContent />
    </div>
  );
}

// App wraps everything in BOTH providers
// Order matters: outer providers are available to inner ones
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
