import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authFail, authStart, authSuccess, clearAuthError } from "../redux/authSlice";
import type { RootState } from "../redux/store";
import { loginRequest } from "../utils/authApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAuthError());
    dispatch(authStart());

    try {
      const data = await loginRequest({
        email: email.trim(),
        password,
      });

      dispatch(authSuccess(data));
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      dispatch(authFail(err?.response?.data?.msg || "Unable to login"));
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.18),_transparent_28%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-14 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl lg:block">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">Member Access</p>
            <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-tight">
              Pick up your watchlist, history, and favorites instantly.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Your session stays in a secure HTTP-only cookie, so the frontend never stores the token in localStorage.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0d1425] p-5">
                <p className="text-3xl font-semibold text-cyan-300">Secure</p>
                <p className="mt-2 text-sm text-slate-400">Cookie-based authentication with protected routes.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-5">
                <p className="text-3xl font-semibold text-orange-300">Fast</p>
                <p className="mt-2 text-sm text-slate-400">Direct login and instant session restore on refresh.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0a1020]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">Welcome Back</p>
            <h2 className="mt-5 text-4xl font-semibold">Login</h2>
            <p className="mt-3 text-slate-400">
              Sign in to access your protected movie space.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-300"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-300"
                  placeholder="Enter your password"
                  minLength={6}
                  required
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              New here?{" "}
              <Link to="/signup" className="font-semibold text-cyan-300">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
