import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string().min(8, "< 8").max(16, "> 16"),
});
