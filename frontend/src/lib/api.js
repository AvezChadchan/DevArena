import axios from "axios";
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";
const ACCESS_TOKEN_KEY = "devarena_access_token";
const REFRESH_TOKEN_KEY = "devarena_refresh_token";
const USER_KEY = "devarena_user";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message || error?.message || "";
    const isExpiredToken =
      error?.response?.status === 401 &&
      message.toLowerCase().includes("jwt expired");

    if (
      typeof window === "undefined" ||
      !isExpiredToken ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshRes = await axios.post(
        `${baseURL}/auth/refresh-access-token`,
        { refreshToken },
        { withCredentials: true, timeout: 10000 }
      );
      const tokens = refreshRes?.data?.data || {};

      if (tokens.accessToken) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      }
      if (tokens.refreshToken) {
        window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      }

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
      return Promise.reject(refreshError);
    }
  }
);
