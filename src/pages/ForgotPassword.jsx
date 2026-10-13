
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Services/firebase";
import {
  Mail,
  ArrowLeft,
  LoaderCircle,
  CheckCircle,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess(
        "If an account exists with this email, a password reset link has been sent. Please check your inbox and spam folder."
      );
      setEmail("");
    } catch (err) {
      const messages = {
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection.",
        "auth/operation-not-allowed":
          "Password reset is currently unavailable. Please contact support.",
      };

      setError(
        messages[err.code] ||
          "Unable to send the reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 px-4 py-6 text-white sm:px-6 sm:py-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl sm:p-7 md:p-8">
        <Link
          to="/login"
          className="mb-6 inline-flex min-h-10 items-center gap-2 py-2 text-sm text-gray-400 transition hover:text-white sm:mb-8"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 text-white sm:mb-6 sm:h-14 sm:w-14">
          <Mail size={25} className="sm:h-7 sm:w-7" />
        </div>

        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
          Forgot Password?
        </h1>

        <p className="mt-3 mb-6 text-sm leading-6 text-gray-400 sm:mb-7">
          Enter your registered email address. We’ll send you a link
          to reset your password.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <label
              htmlFor="reset-email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>

            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
              className="min-h-11 w-full min-w-0 rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30 disabled:opacity-60 sm:px-4 sm:text-base"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="break-words rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm leading-5 text-red-400"
            >
              {error}
            </p>
          )}

          {success && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm leading-5 text-green-400"
            >
              <CheckCircle
                size={19}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <p className="min-w-0 break-words">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-fuchsia-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={19}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-6 text-gray-400 sm:mt-7 sm:text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-fuchsia-500 transition hover:text-fuchsia-400"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;
