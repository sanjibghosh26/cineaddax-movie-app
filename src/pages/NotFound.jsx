import { Link } from "react-router-dom";
import { Home, Rocket } from "lucide-react";

function NotFound() {
  return (
    <main className="relative flex h-dvh min-h-[500px] w-full flex-col overflow-hidden bg-[#100b2e] text-white">

      {/* Space Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#39216b_0%,_#171039_45%,_#090719_100%)]" />

        {/* Stars */}
        {Array.from({ length: 70 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-white/70"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 61) % 100}%`,
              animationDelay: `${(i % 5) * 0.4}s`,
              opacity: 0.2 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <section className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-8">

        {/* Logo */}
        <Link
          to="/"
          className="absolute left-5 top-5 text-lg font-black tracking-widest sm:left-10 sm:top-7 sm:text-2xl"
        >
          CINE<span className="text-fuchsia-400">ADDAX</span>
        </Link>

        {/* Planet */}
        <div className="absolute left-[8%] top-[23%] h-14 w-14 rounded-full bg-gradient-to-br from-cyan-300 via-blue-600 to-indigo-950 shadow-[0_0_35px_rgba(96,165,250,0.35)] sm:left-[15%] sm:top-[25%] sm:h-24 sm:w-24">
          <div className="absolute left-2 top-4 h-2 w-8 -rotate-25 rounded-full bg-white/20 sm:w-14" />
        </div>

        {/* Moon */}
        <div className="absolute right-[9%] top-[29%] h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-500 shadow-[0_0_25px_rgba(255,255,255,0.2)] sm:right-[24%] sm:top-[30%] sm:h-14 sm:w-14" />

        {/* Floating Astronaut */}
        <div className="absolute right-[10%] top-[53%] animate-bounce text-3xl sm:right-[15%] sm:top-[52%] sm:text-6xl">
          👨‍🚀
        </div>

        {/* 404 Content */}
        <div className="relative z-10 mt-8 w-full max-w-2xl sm:mt-10">

          <Rocket className="mx-auto mb-4 h-9 w-9 -rotate-35 text-amber-300 sm:mb-5 sm:h-12 sm:w-12" />

          <p className="text-[10px] font-bold tracking-[0.3em] text-fuchsia-300 sm:text-sm sm:tracking-[0.35em]">
            LOST IN SPACE
          </p>

          <h1 className="mt-3 bg-gradient-to-b from-white to-indigo-300 bg-clip-text text-7xl font-black leading-none tracking-tight text-transparent sm:text-8xl md:text-[11rem]">
            404
          </h1>

          <h2 className="mt-5 text-lg font-bold sm:text-2xl md:text-3xl">
            Oops! You drifted off course.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-slate-300 sm:text-base sm:leading-6">
            Looks like this page disappeared into another galaxy.
            Let's get you back to the movies.
          </p>

          {/* Home Button */}
          <Link
            to="/"
            className="mx-auto mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-amber-300 px-6 py-3 text-xs font-bold tracking-widest text-white transition duration-300 hover:scale-105 hover:bg-amber-300 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(252,211,77,0.25)] sm:mt-8 sm:px-7 sm:text-sm"
          >
            <Home className="h-4 w-4 shrink-0" />
            GO BACK HOME
          </Link>
        </div>

        {/* Bottom Tagline */}
        <p className="absolute bottom-5 px-3 text-center text-[9px] tracking-widest text-slate-500 sm:bottom-8 sm:text-xs">
          CINEADDAX · YOUR NEXT MOVIE IS OUT THERE
        </p>
      </section>
    </main>
  );
}

export default NotFound;
