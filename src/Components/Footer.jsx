
import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Trending", to: "/movies/trending" },
  { label: "Popular", to: "/movies/popular" },
  { label: "Genres", to: "/genres" },
];

const accountLinks = [
  { label: "Profile", to: "/profile" },
  { label: "Favorites", to: "/favorites" },
  { label: "Watchlist", to: "/watchlist" },
  { label: "Settings", to: "/settings" },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              to="/"
              className="inline-block text-lg font-black tracking-tight text-white sm:text-xl"
            >
              CINE<span className="text-fuchsia-500">ADDA</span>X
            </Link>

            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-400 sm:mt-3 sm:text-sm sm:leading-6">
              Discover your next favorite story. Explore movies, trailers, and
              unforgettable worlds.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>

            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs transition hover:text-fuchsia-400 sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white">Account</h3>

            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs transition hover:text-fuchsia-400 sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6">
          <div className="flex flex-col gap-2 text-[10px] leading-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-xs">
            <p>
              © 2026{" "}
              <span className="font-medium text-fuchsia-500">
                Sanjib Ghosh
              </span>
              . All rights reserved.
            </p>

            <p>
              Movie data provided by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 transition hover:text-fuchsia-400"
              >
                TMDB
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
