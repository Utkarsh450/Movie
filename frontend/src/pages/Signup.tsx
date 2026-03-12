import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authFail, authStart, authSuccess, clearAuthError } from "../redux/authSlice";
import type { RootState } from "../redux/store";
import { registerRequest } from "../utils/authApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAuthError());

    if (password !== confirmPassword) {
      dispatch(authFail("Passwords do not match"));
      return;
    }

    dispatch(authStart());

    try {
      const data = await registerRequest({
        email: email.trim(),
        password,
      });

      dispatch(authSuccess(data));
      navigate("/", { replace: true });
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.msg
        : null;
      dispatch(authFail(message || "Unable to create account"));
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#040611] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.18),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-14 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1222]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">Create Account</p>
            <h2 className="mt-5 text-4xl font-semibold">Register</h2>
            <p className="mt-3 text-slate-400">
              Start a secured session and unlock protected pages.
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
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-300"
                  placeholder="Repeat your password"
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
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-cyan-300">
                Login
              </Link>
            </p>
          </div>

          <div className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl lg:block">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">Private Access</p>
            <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-tight">
              Save favorites, revisit history, and keep your session protected.
            </h1>
            <div className="mt-10 space-y-4 text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-[#0d1425] p-5">
                Favorites and history are now behind route guards.
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-5">
                Guest pages automatically redirect after authentication.
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#0d1425] p-5">
                Logout clears the secure cookie and resets the frontend state.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
