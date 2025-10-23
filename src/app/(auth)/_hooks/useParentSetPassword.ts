import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface SetPasswordPayload {
  name: string;
  phoneNumber: string;
  password: string;
}

const useSetPasswordHook = () => {
  const router = useRouter();
  const params = useParams();
  const verifyToken = params.token;

  const setPasswordMutation = useMutation({
    mutationFn: async (payload: SetPasswordPayload) => {
      const { data } = await axiosInstance.patch<SetPasswordPayload>(
        `/api/parent/set-password/${verifyToken}`,
        payload
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Set password succesfull. You can login now!");
      router.replace("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data.message ?? "Set password error!");
    },
  });

  return { setPasswordMutation };
};

export default useSetPasswordHook;
