import { Link } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiTv,
  FiFilm,
  FiTrendingUp,
  FiVideo,
  FiGrid,
  FiUser
} from "react-icons/fi";

const links = [
  { to: "/", icon: <FiHome />, label: "Home" },
  { to: "/search", icon: <FiSearch />, label: "Search" },
  { to: "/tv", icon: <FiTv />, label: "TV Shows" },
  { to: "/movies", icon: <FiFilm />, label: "Movies" },
  { to: "/videos", icon: <FiVideo />, label: "Videos" },
  { to: "/people", icon: <FiGrid />, label: "People" },
  { to: "/profile", icon: <FiUser />, label: "Profile" }
];

const Navbar: React.FC = () => {
  return (
    <div className="group fixed top-0 left-0 h-screen w-44 z-20 hover:w-64 bg-zinc-900 flex flex-col items-center py-52 gap-14 transition-all duration-300">

      {links.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center w-full text-zinc-100 hover:text-white text-2xl px-16"
        >
          <div className="min-w-6 flex justify-center">
            {item.icon}
          </div>

          <span className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;