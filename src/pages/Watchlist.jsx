
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, arrayRemove } from "firebase/firestore";
import { db } from "../Services/firebase";
import { UseAuth } from "../Hooks/UseAuth";
import MovieCard from "../Components/MovieCard";

function Watchlist() {
  const { user, authLoading } = UseAuth();
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadWatchlist = async () => {
      setWatchlist([]);
      setError("");

      if (authLoading) return;

      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (cancelled) return;

        const savedMovies = userSnap.exists()
          ? userSnap.data().watchlist || []
          : [];

        setWatchlist(savedMovies);
      } catch (err) {
        console.error("Failed to load watchlist:", err);

        if (!cancelled) {
          setError("Could not load your watchlist. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWatchlist();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const handleRemove = async (movie) => {
    if (!user || removingId !== null) return;

    setRemovingId(movie.id);
    setError("");

    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        { watchlist: arrayRemove(movie) },
        { merge: true }
      );

      setWatchlist((current) =>
        current.filter((item) => item.id !== movie.id)
      );
    } catch (err) {
      console.error("Failed to remove movie:", err);
      setError("Could not remove this movie. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="flex min-h-[70vh] min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <p className="text-center text-sm text-slate-400 sm:text-base">
          Loading your watchlist...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:p-8 md:p-10">
          <h1 className="text-2xl font-bold sm:text-3xl">
            My Watchlist
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base">
            Please log in to view your personal watchlist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-5 w-full rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold transition hover:bg-fuchsia-500 sm:mt-6 sm:w-auto sm:text-base"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-7 text-white sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <section className="mx-auto w-full max-w-7xl">
        <header>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-fuchsia-400 sm:text-xs sm:tracking-[0.25em]">
            YOUR COLLECTION
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            My Watchlist
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base">
            Movies you saved for later.
          </p>

          {watchlist.length > 0 && (
            <p className="mt-3 text-xs text-slate-500 sm:text-sm">
              {watchlist.length}{" "}
              {watchlist.length === 1 ? "movie" : "movies"} saved
            </p>
          )}
        </header>

        {error && (
          <div
            role="alert"
            className="mt-5 break-words rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm leading-6 text-red-400 sm:mt-6 sm:p-4"
          >
            {error}
          </div>
        )}

        {watchlist.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-center sm:mt-10 sm:px-8 sm:py-12 md:p-10">
            <p className="text-base font-medium text-slate-300 sm:text-lg">
              Your watchlist is empty.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add some movies and they will appear here.
            </p>

            <Link
              to="/movies"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold transition hover:bg-fuchsia-500 sm:mt-6 sm:w-auto sm:text-base"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 items-start gap-x-3 gap-y-6 sm:mt-9 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-5">
            {watchlist.map((movie) => (
              <div key={movie.id} className="min-w-0">
                <MovieCard movie={movie} />

                <button
                  type="button"
                  onClick={() => handleRemove(movie)}
                  disabled={removingId !== null}
                  aria-label={`Remove ${movie.title || "movie"} from watchlist`}
                  className="mt-2 min-h-10 w-full break-words rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-2 text-[11px] font-semibold leading-4 text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:mt-3 sm:px-3 sm:text-xs md:text-sm"
                >
                  {removingId === movie.id
                    ? "Removing..."
                    : "Remove from Watchlist"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Watchlist;
