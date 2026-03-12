import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainRoutes from "./routes/Mainroutes";
import Loader from "./components/Loader";
import { authFail, authStart, authSuccess } from "./redux/authSlice";
import type { RootState } from "./redux/store";
import { meRequest } from "./utils/authApi";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { initialized } = useSelector((state: RootState) => state.auth);
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      dispatch(authStart());

      try {
        const user = await meRequest();

        if (!cancelled) {
          dispatch(authSuccess(user));
        }
      } catch {
        if (!cancelled) {
          dispatch(authFail(null));
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black">
      {!hideNavbar ? <Navbar /> : null}
      <div className={hideNavbar ? "" : "ml-24 lg:ml-24"}>
        <MainRoutes />
      </div>
    </div>
  );
};

export default App;
