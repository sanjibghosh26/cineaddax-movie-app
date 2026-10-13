
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Link
      to={`/movie/${movie.id}`}
      aria-label={`View details for ${movie.title}`}
      className="group block min-w-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900 transition duration-300 hover:border-fuchsia-500/50 sm:rounded-xl sm:hover:-translate-y-1.5"
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/2.7] overflow-hidden sm:aspect-[2/3]">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "https://placehold.co/500x750?text=No+Image"
          }
          alt={`${movie.title} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 sm:group-hover:scale-110"
        />

        {/* Rating */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent px-2 pb-2 pt-8 sm:px-3 sm:pb-3 sm:pt-10">
          <span className="inline-flex items-center rounded-md bg-amber-400 px-1.5 py-1 text-[10px] font-bold text-slate-950 sm:px-2 sm:text-xs">
            ★ {movie.vote_average?.toFixed(1) ?? "N/A"}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="min-w-0 p-2.5 sm:p-3">
        <h3 className="line-clamp-2 min-h-[2rem] text-xs font-semibold leading-4 text-white sm:min-h-[2.5rem] sm:text-sm sm:leading-5">
          {movie.title}
        </h3>

        <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
          {movie.release_date?.slice(0, 4) || "Year unknown"}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
