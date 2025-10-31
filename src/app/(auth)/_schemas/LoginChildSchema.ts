import * as Yup from "yup";

export const validationChildLoginSchema = Yup.object({
  familyCode: Yup.string()
    .required("Family Code is required!")
    .length(6, "Family Code must be exactly 6 characters")
    .max(6),
  pin: Yup.string().required("PIN is required!").max(6),
});
