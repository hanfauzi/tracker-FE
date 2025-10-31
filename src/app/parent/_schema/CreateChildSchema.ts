import * as Yup from "yup";

export const validationCreateChildSchema = Yup.object({
  name: Yup.string().required("Name is required!").min(3).max(20),
});
