
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Bookmark,
  Layers,
  TrendingUp,
  Search,
  LogIn,
  LogOut,
} from "lucide-react";

function MobileMenu({ isOpen, onClose, user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const previousPathname = useRef(location.pathname);

  // Close menu only when the route actually changes
  useEffect(() => {
    if (previousPathname.current !== location.pathname) {
      previousPathname.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  // Lock background scrolling and support Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    onClose();
    navigate(`/movies/search?query=${encodeURIComponent(query)}`);
    setSearchQuery("");
  };

  const links = [
    { label: "Home", to: "/", icon: Home, end: true },
    { label: "Watchlist", to: "/watchlist", icon: Bookmark, end: true },
    { label: "Genres", to: "/genres", icon: Layers },
    {
      label: "Trending",
      to: "/movies/trending",
      icon: TrendingUp,
    },
  ];

  return (
    <>
      {/* Background Overlay */}
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close navigation overlay"
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Navigation Drawer */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(88vw,360px)] flex-col border-l border-white/10 bg-slate-950 p-4 shadow-2xl transition-transform duration-300 ease-in-out sm:w-[340px] sm:p-5 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo and Close Button */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
          <Link
            to="/"
            onClick={onClose}
            className="text-lg font-black tracking-widest text-white sm:text-xl"
          >
            CINE<span className="text-fuchsia-500">ADDA</span>X
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="mt-4 shrink-0 text-[9px] font-medium uppercase tracking-[0.25em] text-slate-500 sm:mt-5 sm:text-[10px] sm:tracking-[0.3em]">
          Your Movie Universe
        </p>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 shrink-0">
          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 transition focus-within:border-fuchsia-500/50">
            <Search className="ml-1 h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search movies..."
              aria-label="Search movies"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="shrink-0 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Search
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-1.5 overflow-y-auto sm:gap-2">
          {links.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:px-4 sm:py-3 ${
                  isActive
                    ? "bg-fuchsia-500/10 text-fuchsia-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Account Section */}
        <div className="mt-auto shrink-0 border-t border-white/10 pt-4 sm:pt-5">
          {user ? (
            <>
              {/* User Profile */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-white/5 p-2.5 sm:p-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-600 text-sm font-semibold text-white sm:h-10 sm:w-10">
                    {(user.displayName || user.email || "U")
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.displayName || "Movie Lover"}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={onLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white sm:px-4 sm:py-3"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            /* Login / Signup */
            <Link
              to="/login"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-500 sm:px-4"
            >
              <LogIn className="h-5 w-5 shrink-0" />
              <span>Login / Sign Up</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;
