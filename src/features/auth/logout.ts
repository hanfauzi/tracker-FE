import { axiosRaw } from "@/lib/axios";
import { useAuth } from "@/stores/auth";

export async function logout() {
  try {
    await axiosRaw.post("/api/auth/logout");
  } catch {}
  useAuth.getState().clearAuth();
  if (typeof window !== "undefined") window.location.href = "/login";
}
