import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Loader from "./Loader";

const GuestRoute = () => {
  const { user, initialized } = useSelector((state: RootState) => state.auth);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <Loader />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
