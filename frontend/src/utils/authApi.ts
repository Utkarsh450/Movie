import axios from "axios";

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
}

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const loginRequest = async (payload: AuthPayload) => {
  const { data } = await authApi.post<AuthResponse>("/login", payload);
  return data;
};

export const registerRequest = async (payload: AuthPayload) => {
  const { data } = await authApi.post<AuthResponse>("/register", payload);
  return data;
};

export const meRequest = async () => {
  const { data } = await authApi.get<AuthResponse>("/@me");
  return data;
};

export const logoutRequest = async () => {
  await authApi.get("/logout");
};

export default authApi;
