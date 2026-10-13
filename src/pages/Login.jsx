
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../Hooks/UseAuth";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, signup, googleLogin } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isSignup) {
        await signup(fullName, email.trim(), password);

        setSuccess(
          "Verification email sent! Check your inbox and verify your email before logging in."
        );
        setIsSignup(false);
        setPassword("");
      } else {
        await login(email.trim(), password);
        navigate("/");
      }
    } catch (err) {
      const messages = {
        "auth/email-already-in-use":
          "This email is already registered. Please log in instead.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect email or password.",
        "auth/email-not-verified":
          "Please verify your email before logging in. Check your inbox.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection.",
      };

      setError(
        messages[err.code] || "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Google sign-in was cancelled."
          : "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30 sm:px-4 sm:text-base";

  return (
    <main className="flex min-h-[calc(100dvh-64px)] items-center justify-center bg-slate-950 px-4 py-6 text-white sm:min-h-[calc(100vh-72px)] sm:px-6 sm:py-10 lg:px-8">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-xl sm:p-7 md:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-fuchsia-400 sm:text-sm">
          CINEADDAX
        </p>

        <h1 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {isSignup
            ? "Create an account to start your movie collection."
            : "Log in to continue your movie journey."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
          {isSignup && (
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 flex min-h-10 min-w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isSignup && (
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="inline-block py-1 text-sm text-fuchsia-400 transition hover:text-fuchsia-300"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="break-words rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm leading-5 text-red-400"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="break-words rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-sm leading-5 text-green-400"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-11 w-full rounded-lg bg-fuchsia-600 px-4 py-3 text-sm font-semibold transition hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            {loading
              ? "Please wait..."
              : isSignup
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        <div className="mt-5 sm:mt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 sm:text-sm">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-3 sm:px-4 sm:text-base"
          >
            <img
              src="/Google_logo.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-slate-400 sm:mt-6 sm:text-sm">
          {isSignup ? "Already have an account?" : "New to CINEADDAX?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignup((current) => !current);
              setError("");
              setSuccess("");
              setShowPassword(false);
            }}
            className="font-semibold text-fuchsia-400 transition hover:text-fuchsia-300"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        <Link
          to="/"
          className="mt-4 block py-1 text-center text-sm text-slate-500 transition hover:text-white sm:mt-5"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}

export default Login;
