import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type CreateChildPayload = {
  name: string;
};

const useCreateChildHook = () => {
    
  const createChildMutation = useMutation({
    mutationFn: async (payload: CreateChildPayload) => {
      const { data } = await axiosInstance.post(
        "/api/parent/create-child",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Create account child success!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Create account failed!");
    },
  });
  return { createChildMutation };
};

export default useCreateChildHook;
