
import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react";
import { UseAuth } from "../Hooks/UseAuth.js";
import MobileMenu from "./MobileMenu.jsx";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [failedProfilePhoto, setFailedProfilePhoto] = useState(null);

  const navigate = useNavigate();
  const { user, logout } = UseAuth();

  // Show the profile image only if it has not failed to load.
  const profilePhoto = user?.photoURL;

  const showProfilePhoto =
    Boolean(profilePhoto) && failedProfilePhoto !== profilePhoto;

  const handleProfileImageError = () => {
    if (profilePhoto) {
      setFailedProfilePhoto(profilePhoto);
    }
  };

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-pink-500" : "text-slate-300 hover:text-white"
    }`;

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/movies/search?query=${encodeURIComponent(query)}`);
    setSearchQuery("");
    closeMobileMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      closeMobileMenu();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="relative z-40 border-b border-white/10 bg-slate-950/90 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          className="shrink-0 rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <NavLink to="/" end className="group flex min-w-0 shrink-0 flex-col">
          <span className="text-xl font-black tracking-widest sm:text-2xl">
            CINE<span className="text-fuchsia-500">ADDA</span>X
          </span>

          <span className="hidden text-[9px] font-medium uppercase tracking-[0.35em] text-slate-500 sm:block">
            Your Movie Universe
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 text-sm md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/watchlist" end className={navLinkClass}>
            Watchlist
          </NavLink>

          <NavLink to="/genres" className={navLinkClass}>
            Genres
          </NavLink>

          <NavLink to="/movies/trending" className={navLinkClass}>
            Trending
          </NavLink>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden w-56 lg:block">
          <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-3 transition focus-within:border-fuchsia-500/50">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search movies..."
              aria-label="Search movies"
              className="w-full bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </form>

        {/* Profile / Login */}
        {user ? (
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 transition hover:bg-white/10 sm:gap-2"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
            >
              {showProfilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  onError={handleProfileImageError}
                  className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-600 font-semibold text-white sm:h-9 sm:w-9">
                  {(user.displayName || user.email || "U")
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

              <ChevronDown className="mr-1 h-4 w-4 text-slate-300" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-white/10 px-2 pb-3">
                  {showProfilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={handleProfileImageError}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-600">
                      <UserRound className="h-5 w-5 text-white" />
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.displayName || "Movie Lover"}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="shrink-0 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-semibold transition hover:bg-fuchsia-500 sm:px-4"
          >
            Login
          </button>
        )}
      </nav>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}

export default Navbar;
