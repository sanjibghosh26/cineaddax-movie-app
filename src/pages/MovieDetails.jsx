
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../Services/tmdb";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../Services/firebase";
import { UseAuth } from "../Hooks/UseAuth";
import { X, Play, Star, Clock, CalendarDays } from "lucide-react";

function MovieDetails() {
  const { id } = useParams();
  const { user, authLoading } = UseAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [watchlistError, setWatchlistError] = useState("");

  // Fetch movie details and trailer
  useEffect(() => {
    let cancelled = false;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setMovie(null);
        setTrailer(null);
        setTrailerOpen(false);

        const data = await getMovieDetails(id);

        if (cancelled) return;

        setMovie(data);

        const videos = await getMovieVideos(id);

        if (cancelled) return;

        const youtubeTrailer = videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        );

        setTrailer(youtubeTrailer || null);
      } catch (error) {
        console.error("Error fetching movie details:", error);

        if (!cancelled) {
          setMovie(null);
          setTrailer(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Check user's Firestore watchlist
  useEffect(() => {
    let cancelled = false;

    const checkWatchlist = async () => {
      setIsInWatchlist(false);
      setWatchlistError("");

      if (!user || !movie) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (cancelled) return;

        const watchlist = userSnap.exists()
          ? userSnap.data().watchlist || []
          : [];

        setIsInWatchlist(
          watchlist.some((item) => item.id === movie.id)
        );
      } catch (error) {
        console.error("Error checking watchlist:", error);

        if (!cancelled) {
          setWatchlistError(
            "Could not load your watchlist status."
          );
        }
      }
    };

    checkWatchlist();

    return () => {
      cancelled = true;
    };
  }, [user, movie]);

  // Add or remove movie from watchlist
  const handleWatchlist = async () => {
    if (authLoading || watchlistLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (!movie) return;

    setWatchlistLoading(true);
    setWatchlistError("");

    try {
      const userRef = doc(db, "users", user.uid);

      if (isInWatchlist) {
        await setDoc(
          userRef,
          {
            watchlist: arrayRemove(movie),
          },
          { merge: true }
        );

        setIsInWatchlist(false);
      } else {
        await setDoc(
          userRef,
          {
            watchlist: arrayUnion(movie),
          },
          { merge: true }
        );

        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Failed to update watchlist:", error);

      setWatchlistError(
        "Could not update your watchlist. Please try again."
      );
    } finally {
      setWatchlistLoading(false);
    }
  };

  // Open trailer only for authenticated users
  const handleWatchTrailer = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (trailer) {
      setTrailerOpen(true);
    }
  };

  // Loading state
  if (loading || authLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-4 text-white sm:min-h-screen">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-fuchsia-500/20 border-t-fuchsia-500" />
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Loading movie...
          </p>
        </div>
      </main>
    );
  }

  // Movie not found
  if (!movie) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-4 text-white sm:min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold sm:text-2xl">
            Movie not found
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Please try selecting another movie.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 rounded-xl bg-fuchsia-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-fuchsia-500"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Movie Hero / Backdrop */}
      <section className="relative isolate">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          )}

          <div className="absolute inset-0 bg-slate-950/75 sm:bg-slate-950/70" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50 sm:via-slate-950/60" />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid min-w-0 grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-[minmax(190px,0.75fr)_minmax(0,1.5fr)] md:items-center md:gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
            {/* Poster */}
            <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:max-w-[260px] sm:rounded-2xl md:max-w-none">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://placehold.co/500x750?text=No+Image"
                }
                alt={`${movie.title} poster`}
                loading="eager"
                className="aspect-[2/3] h-auto w-full object-cover"
              />
            </div>

            {/* Movie Information */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-fuchsia-400 sm:text-xs sm:tracking-[0.25em]">
                MOVIE DETAILS
              </p>

              <h1 className="mt-2 break-words text-2xl font-extrabold leading-tight sm:mt-3 sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-2 text-sm italic text-slate-400 sm:text-base">
                  {movie.tagline}
                </p>
              )}

              {/* Movie Metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-300 sm:mt-5 sm:gap-x-4 sm:text-sm">
                {movie.release_date && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-fuchsia-400" />
                    {movie.release_date.slice(0, 4)}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {movie.vote_average != null
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-fuchsia-400" />
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "Runtime N/A"}
                </span>
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-1 text-[11px] text-fuchsia-300 sm:px-3 sm:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mt-5 sm:mt-6">
                <h2 className="text-base font-semibold sm:text-lg">
                  Overview
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  {movie.overview || "No description available."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                {trailer && (
                  <button
                    type="button"
                    onClick={handleWatchTrailer}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold transition hover:bg-fuchsia-500 sm:w-auto sm:px-6 sm:text-base"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Watch Trailer</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleWatchlist}
                  disabled={authLoading || watchlistLoading}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6 sm:text-base"
                >
                  {watchlistLoading
                    ? "Updating..."
                    : isInWatchlist
                      ? "✓ Added to Watchlist"
                      : "+ Add to Watchlist"}
                </button>
              </div>

              {/* Watchlist Error */}
              {watchlistError && (
                <p
                  role="alert"
                  className="mt-3 text-xs leading-5 text-red-400 sm:text-sm"
                >
                  {watchlistError}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      {trailerOpen && trailer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setTrailerOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-5">
              <h2 className="min-w-0 truncate pr-2 text-sm font-semibold text-white sm:text-base">
                {movie.title} - Trailer
              </h2>

              <button
                type="button"
                onClick={() => setTrailerOpen(false)}
                className="shrink-0 rounded-full bg-white/5 p-2 text-white transition hover:bg-fuchsia-600"
                aria-label="Close trailer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Responsive YouTube Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={`${movie.title} trailer`}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MovieDetails;
