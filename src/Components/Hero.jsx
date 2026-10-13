import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../Services/tmdb";

function Hero() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveSlide((currentSlide) => {
        return (currentSlide + 1) % featuredMovies.length;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [featuredMovies.length]);

  // Fetch trending movies
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setFeaturedMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const movie = featuredMovies[activeSlide];

  // Loading state
  if (featuredMovies.length === 0) {
    return (
      <section className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-sm text-slate-400 sm:min-h-[400px] lg:min-h-[500px]">
        Loading featured movies...
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative isolate min-h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 sm:min-h-[460px] sm:rounded-3xl lg:min-h-[560px]"
    >
      {/* Background Images */}
      {featuredMovies.map((featuredMovie, index) => (
        <img
          key={featuredMovie.id}
          src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/35 sm:bg-linear-to-r sm:from-slate-950 sm:via-slate-950/85 sm:to-slate-950/20" />

      {/* Hero Content */}
      <div className="flex min-h-[390px] max-w-2xl flex-col justify-center px-4 py-8 sm:min-h-[460px] sm:px-8 sm:py-12 lg:min-h-[560px] lg:px-10 lg:py-20">
        {/* Badge */}
        <p className="text-[10px] font-semibold tracking-[0.2em] text-pink-500 sm:text-xs sm:text-sm">
          FEATURED MOVIE
        </p>

        {/* Movie Title */}
        <h1 className="mt-2 line-clamp-2 text-3xl font-bold leading-tight tracking-tight sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
          {movie.title}
        </h1>

        {/* Movie Info */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300 sm:mt-4 sm:gap-3 sm:text-sm">
          <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
          <span>•</span>
          <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>

        {/* Movie Overview */}
        <p className="mt-3 line-clamp-4 max-w-xl text-xs leading-5 text-slate-300 sm:mt-5 sm:line-clamp-4 sm:text-sm sm:leading-6 lg:line-clamp-5 lg:leading-7">
          {movie.overview || "Discover more about this featured movie."}
        </p>

        {/* View Details Button */}
        <div className="mt-5 flex gap-3 sm:mt-7">
          <Link
            to={`/movie/${movie.id}`}
            className="rounded-lg bg-fuchsia-600 px-4 py-2.5 text-xs font-semibold transition hover:bg-fuchsia-500 sm:px-5 sm:py-3 sm:text-sm"
          >
            View Details
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="mt-6 flex gap-1.5 sm:mt-8 sm:gap-2">
          {featuredMovies.map((featuredMovie, index) => (
            <button
              key={featuredMovie.id}
              type="button"
              aria-label={`Show ${featuredMovie.title}`}
              aria-pressed={index === activeSlide}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all sm:h-2 ${
                index === activeSlide
                  ? "w-6 bg-fuchsia-500 sm:w-8"
                  : "w-1.5 bg-white/40 hover:bg-white/70 sm:w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;