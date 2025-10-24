import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface LoginPayload {
  email: string;
  password: string;
}

const useParentLoginHook = () => {
  const router = useRouter();
  const loginParentMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post<LoginPayload>(
        "/api/parent/login",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success('Login Successful!');
      router.push("/parent/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Login failed!");
    },
  });

  return { loginParentMutation };
};

export default useParentLoginHook;
