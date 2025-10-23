import * as Yup from "yup";

export const validationParentSetPasswordSchema = Yup.object({
  name: Yup.string().required("Name is required!").min(3, "Name is too short!"),
  phoneNumber: Yup.string()
    .required("Phone Number is required!")
    .min(8, "Phone Number is too short!")
    .max(20, "Phone Number is too long!"),
  password: Yup.string()
    .required("Password is required!")
    .min(5, "Password is too short!"),
});
