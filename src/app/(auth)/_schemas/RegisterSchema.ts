import * as Yup from "yup";

export const validationParentRegisterSchema = Yup.object({
  email: Yup.string().email().required("Email is required!"),
});
