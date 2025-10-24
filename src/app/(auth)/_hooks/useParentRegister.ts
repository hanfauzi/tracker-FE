import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterPayload {
  email: string;
}

interface RegisterResponse {
  token: string;
}

const useRegisterHook = () => {
  const router = useRouter();

  const registerParentMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post<RegisterResponse>(
        "/api/parent/register",
        payload
      );
      return data;
    },
    onSuccess: (data: RegisterResponse) => {
      router.push(`/parent/set-password/${data.token}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Registration Failed!");
    },
  });
  return { registerParentMutation };
};

export default useRegisterHook;
