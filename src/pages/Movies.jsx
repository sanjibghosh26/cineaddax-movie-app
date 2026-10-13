import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import MovieCard from "../Components/MovieCard";
import MovieSkeleton from "../Components/MovieSkeleton";
import ErrorMessage from "../Components/ErrorMessage";
import Pagination from "../Components/Pagination";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMoviesByGenre,
  searchMovies,
} from "../Services/tmdb";

function Movies() {
  const { category, genreId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        let data;

        if (searchQuery) {
          data = await searchMovies(searchQuery, page);
        } else if (category === "trending") {
          data = await getTrendingMovies(page);
        } else if (category === "popular") {
          data = await getPopularMovies(page);
        } else if (category === "top-rated") {
          data = await getTopRatedMovies(page);
        } else if (genreId) {
          data = await getMoviesByGenre(genreId, page);
        } else {
          // Default /movies page: show popular movies
          data = await getPopularMovies(page);
        }

        if (!cancelled) {
          setMovies(data.results || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);

        if (!cancelled) {
          setError("We couldn't load the movies. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [category, genreId, searchQuery, page, retryCount]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return;
    }

    setSearchParams((currentParams) => {
      const params = new URLSearchParams(currentParams);

      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", String(newPage));
      }

      return params;
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const heading = searchQuery
    ? `Search Results for "${searchQuery}"`
    : genreId
      ? "Movies by Genre"
      : category
        ? category.replace("-", " ")
        : "Movies";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10 lg:py-12">
      <section className="mx-auto w-full max-w-7xl">
        {/* Page Heading */}
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-pink-500 sm:text-xs sm:tracking-[0.25em]">
            EXPLORE THE COLLECTION
          </p>

          <h1 className="mt-2 break-words text-2xl font-extrabold capitalize leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            {heading}
          </h1>

          <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-400 sm:mt-4 sm:text-sm sm:leading-6">
            {searchQuery
              ? `Showing movies matching "${searchQuery}".`
              : "Browse movies and discover your next favorite story."}
          </p>
        </div>

        {/* Error State */}
        {error ? (
          <div className="mt-8 sm:mt-10">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        ) : loading ? (
          /* Loading Skeletons */
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        ) : movies.length === 0 ? (
          /* Empty State */
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 text-center sm:mt-12 sm:rounded-2xl sm:p-10">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              No movies found
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
              We couldn't find any movies matching your search.
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Movie Grid */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 sm:mt-12">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;
