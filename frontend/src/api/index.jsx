import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔐 Attach token automatically to every request (if present)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
