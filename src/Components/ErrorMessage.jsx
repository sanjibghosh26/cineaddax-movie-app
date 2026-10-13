import { RefreshCw } from "lucide-react";

function ErrorMessage({ message = "Something went wrong. Please try again." , onRetry }) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
        <span className="text-2xl">⚠️</span>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 rounded-lg bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-500"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;