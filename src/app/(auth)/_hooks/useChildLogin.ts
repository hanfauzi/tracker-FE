import { axiosInstance } from "@/lib/axios";
import { useSessionStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChildLoginPayload {
  familyCode: string;
  pin: string;
}

interface ChildLoginResponse {
  message: string;
  accessToken: string;
  user: { id: string; role: "PARENT" | "CHILD" };
}

const useChildLoginHook = () => {
  const router = useRouter();
  const childLoginMutation = useMutation({
    mutationFn: async (payload: ChildLoginPayload) => {
      const { data } = await axiosInstance.post<ChildLoginResponse>(
        "/api/child/login",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      useSessionStore.getState().setAccessToken(data.accessToken);
      toast.success(data.message ?? "Login Succesfull!");
      router.replace("/child/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Login Failed!");
    },
  });

  return { childLoginMutation };
};

export default useChildLoginHook;
