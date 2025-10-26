import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { axiosInstance, axiosRaw } from "./axios";
import { useAuth } from "@/stores/auth";

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function subscribe(cb: (t: string | null) => void) {
  queue.push(cb);
}
function publish(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuth.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribe((newToken) => {
          if (!newToken) return reject(error);
          original.headers = {
            ...(original.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
          resolve(axiosInstance(original));
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await axiosRaw.post<{ accessToken: string }>(
        "/api/auth/refresh"
      );
      const newToken = data.accessToken;

      useAuth.getState().setAccessToken(newToken);

      publish(newToken);

      original.headers = {
        ...(original.headers || {}),
        Authorization: `Bearer ${newToken}`,
      };
      return axiosInstance(original);
    } catch (e) {
      publish(null);
      useAuth.getState().clearAuth();
      if (typeof window !== "undefined") window.location.href = "/login";
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
