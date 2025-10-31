import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChildPairingPayload {
  childCode: string;
  pin: string;
}

interface ChildPairingResponse {
  message: string;
  accessToken: string;
  user: { id: string; role: "PARENT" | "CHILD" };
}

const useChildPairingHook = () => {
  const router = useRouter();
  const childPairingMutation = useMutation({
    mutationFn: async (payload: ChildPairingPayload) => {
      const { data } = await axiosInstance.patch<ChildPairingResponse>(
        "/api/child/pairing",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      useAuth.getState().setSession(data.accessToken, data.user);
      toast.success(
        data.message ?? "Your account now active. You can login now!"
      );
      router.replace("/child/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Pairing failed!");
    },
  });

  return { childPairingMutation };
};

export default useChildPairingHook;
