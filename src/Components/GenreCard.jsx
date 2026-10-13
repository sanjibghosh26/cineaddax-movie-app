import { Link } from "react-router-dom";

function GenreCard({ genre }) {
  const Icon = genre.icon;

  return (
    <Link
      to={`/movies/genre/${genre.id}`}
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-purple-500/20 bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-slate-800"
    >
      <Icon className="h-7 w-7 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />

      <p className="font-medium text-white">
        {genre.name}
      </p>
    </Link>
  );
}

export default GenreCard;