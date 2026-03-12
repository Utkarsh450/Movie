import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiTv,
  FiFilm,
  FiGrid,
  FiClock,
  FiLogIn,
  FiLogOut,
  FiUserPlus
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { authStart, logoutSuccess, setAuthError } from "../redux/authSlice";
import type { RootState } from "../redux/store";
import { logoutRequest } from "../utils/authApi";

const links = [
  { to: "/", icon: <FiHome />, label: "Home" },
  { to: "/explore", icon: <FiSearch />, label: "Search" },
  { to: "/tv", icon: <FiTv />, label: "TV Shows" },
  { to: "/movies", icon: <FiFilm />, label: "Movies" },
  { to: "/favorites", icon: <FiGrid />, label: "Favorites" },
  { to: "/history", icon: <FiClock />, label: "History" }
];

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    dispatch(authStart());

    try {
      await logoutRequest();
      dispatch(logoutSuccess());
      navigate("/login", { replace: true });
    } catch {
      dispatch(setAuthError("Unable to logout right now"));
    }
  };

  return (
    <div className="group fixed top-0 left-0 z-20 flex h-screen w-24 flex-col border-r border-white/10 bg-[#04070f]/95 px-4 py-8 backdrop-blur-xl transition-all duration-300 hover:w-72">
      <div className="mb-10 px-2">
        <Link to="/" className="block">
          <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/70">
            Movie
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Pulse</h1>
          <p className="mt-2 max-w-[12rem] text-sm text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Streamlined discovery with a secured profile.
          </p>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center rounded-2xl px-4 py-3 text-lg transition ${
              isActive
                ? "bg-cyan-400/10 text-cyan-200"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <div className="flex min-w-8 justify-center text-xl">
            {item.icon}
          </div>

          <span className="ml-4 -translate-x-4 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {item.label}
          </span>
        </NavLink>
      ))}
      </div>

      <div className="mt-auto space-y-3 px-1">
        {user ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Signed In
              </p>
              <p className="mt-2 truncate text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 px-4 py-3 text-left text-sm font-semibold text-white transition hover:brightness-110"
            >
              <span className="flex min-w-8 justify-center text-lg">
                <FiLogOut />
              </span>
              <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Logout
              </span>
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="flex items-center rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex min-w-8 justify-center text-lg">
                <FiLogIn />
              </span>
              <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Login
              </span>
            </NavLink>

            <NavLink
              to="/signup"
              className="flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white transition hover:brightness-110"
            >
              <span className="flex min-w-8 justify-center text-lg">
                <FiUserPlus />
              </span>
              <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Create Account
              </span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
