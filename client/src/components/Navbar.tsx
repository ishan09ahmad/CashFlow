import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [appLoading, setAppLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="relative mx-auto flex h-17.5 max-w-350 items-center justify-between gap-4 sm:gap-8 px-6 ">
      <Link
        to="/"
        className="text-2xl font-bold tracking-tight text-stone-800"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Cash<span className="text-red-700">Flow</span>
      </Link>

      {isLoggedIn ? (
        appLoading ? (
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            {new Array(2).fill("").map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 w-18 sm:w-25 h-7 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between md:flex-1 ">
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses..."
                className="w-80 rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-[17px] font-semibold transition-colors ${
                    isActive
                      ? "text-red-700"
                      : "text-stone-600 hover:text-red-700"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-stone-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-700">
                    <User size={17} />
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-stone-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-stone-100 bg-white p-1.5 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/settings");
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Settings size={17} />
                      Settings
                    </button>

                    <div className="my-1 h-px bg-stone-100" />

                    <button
                      type="button"
                      // onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      ) : appLoading ? (
        <div className="hidden md:flex items-center justify-end gap-4">
          {new Array(3).fill("").map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 w-25 h-7 animate-pulse rounded-2xl"
            ></div>
          ))}
        </div>
      ) : (
        <div className="hidden md:flex md:gap-12  items-center ">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-[15px] font-semibold transition-colors ${
                isActive ? "text-red-700" : "text-stone-600 hover:text-red-700"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-[15px] font-semibold transition-colors ${
                isActive ? "text-red-700" : "text-stone-600 hover:text-red-700"
              }`
            }
          >
            Login
          </NavLink>

          <Link
            to="/register"
            className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}

      {!isLoggedIn && (
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="cursor-pointer rounded-lg p-2 text-stone-700 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isLoggedIn && (
        <div className="absolute left-0 right-0 top-17.5 z-50 border-b border-t border-stone-200 bg-white px-6 py-4 shadow-md md:hidden">
          {appLoading ? (
            <div className="flex flex-col gap-4 pt-1">
              {new Array(3).fill("").map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 w-40 h-8 animate-pulse rounded-2xl "
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1 pt-1">
              <>
                <NavLink
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-[15px] font-semibold transition ${
                      isActive
                        ? "bg-red-50 text-red-700 "
                        : "text-stone-600 hover:bg-red-50 hover:text-red-700"
                    }`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-[15px] font-semibold transition ${
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-stone-600 hover:bg-red-50 hover:text-red-700"
                    }`
                  }
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mt-2 rounded-full bg-red-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-600 ${appLoading ? "animate-pulse" : "animate-none"}`}
                >
                  Sign Up
                </Link>
              </>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
