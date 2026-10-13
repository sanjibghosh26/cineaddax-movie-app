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
import { Link } from "react-router-dom";

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

function Genres() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-fuchsia-400">
          EXPLORE BY MOOD
        </p>

        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
          Browse Genres
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Find your next favorite movie by exploring different genres.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {genres.map((genre) => {
            const Icon = genre.icon;

            return (
              <Link
                key={genre.id}
                to={`/movies/genre/${genre.id}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
              >
                <Icon className="h-8 w-8 text-fuchsia-400 transition group-hover:scale-110" />

                <h2 className="mt-5 text-lg font-semibold">
                  {genre.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Explore movies
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Genres;