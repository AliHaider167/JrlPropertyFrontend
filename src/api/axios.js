import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// One token for everyone — role-based access is enforced by the backend,
// so the same axios instance works for public, user, and admin requests.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jrl_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
