import Hero from "../Components/Hero";
import SectionTitle from "../Components/SectionTitle";
import MovieCard from "../Components/MovieCard";
import GenreCard from "../Components/GenreCard";
import MovieSkeleton from "../Components/MovieSkeleton";
import ErrorMessage from "../Components/ErrorMessage";

import {
  Swords,
  Rocket,
  Clapperboard,
  Laugh,
  Drama,
  WandSparkles,
  Ghost,
  Heart,
} from "lucide-react";

import Stats from "../Components/Stats";
import { useEffect, useState } from "react";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../Services/tmdb";

const genres = [
  { id: 28, name: "Action", icon: Swords },
  { id: 12, name: "Adventure", icon: Rocket },
  { id: 16, name: "Animation", icon: Clapperboard },
  { id: 35, name: "Comedy", icon: Laugh },
  { id: 18, name: "Drama", icon: Drama },
  { id: 14, name: "Fantasy", icon: WandSparkles },
  { id: 27, name: "Horror", icon: Ghost },
  { id: 10749, name: "Romance", icon: Heart },
];

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const [trending, popular, topRated] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
        ]);

        if (!cancelled) {
          setTrendingMovies(trending.results);
          setPopularMovies(popular.results);
          setTopRatedMovies(topRated.results);
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
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Hero />

        {/* Trending */}
        <section id="trending" className="mt-16">
          <SectionTitle
            label="DISCOVER"
            title="Trending Now"
            link="/movies/trending"
          />

          {error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {trendingMovies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>

        {/* Popular */}
        <section id="movies" className="mt-16">
          <SectionTitle
            label="EXPLORE"
            title="Popular Movies"
            link="/movies/popular"
          />

          {error ? (
            <div className="hidden">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {popularMovies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>

        {/* Top Rated */}
        <section id="top-rated" className="mt-16">
          <SectionTitle
            label="CRITIC'S PICK"
            title="Top Rated Movies"
            link="/movies/top-rated"
          />

          {error ? (
            <div className="hidden">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {topRatedMovies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>

        {/* Genres */}
        <section id="genres" className="mt-16">
          <SectionTitle label="FIND YOUR MOOD" title="Browse by Genre" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        </section>

        <Stats />
      </div>
    </main>
  );
}

export default Home;
