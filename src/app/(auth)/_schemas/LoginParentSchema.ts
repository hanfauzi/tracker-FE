import * as Yup from "yup";

export const validationParentLoginSchema = Yup.object({
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(5, "Password is too short!"),
});
