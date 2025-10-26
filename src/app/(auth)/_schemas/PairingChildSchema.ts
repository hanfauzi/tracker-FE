import * as Yup from "yup";

export const validationChildPairingSchema = Yup.object({
  childCode: Yup.string()
    .required("Child code is required!")
    .length(16, "Child code must be exactly 16 characters")
    .max(16),
  pin: Yup.string().required("PIN is required!").max(6),
});
