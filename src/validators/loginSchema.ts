import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password is too short - Minimum 6 characters"),
  })
  .required();

export default loginSchema;
