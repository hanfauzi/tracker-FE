"use client";

import { useSessionStore } from "@/stores/auth";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  withCredentials: true,
});

export const axiosRaw = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  withCredentials: true,
});

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
  const token = useSessionStore.getState().accessToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status !== 401 || original._retry)
      return Promise.reject(error);
    if (original.url?.includes("/auth/refresh")) return Promise.reject(error);
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
      useSessionStore.getState().setAccessToken(newToken);
      publish(newToken);
      original.headers = {
        ...(original.headers || {}),
        Authorization: `Bearer ${newToken}`,
      };
      return axiosInstance(original);
    } catch (e) {
      publish(null);
      useSessionStore.getState().clear();
      if (typeof window !== "undefined") window.location.href = "/login";
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
