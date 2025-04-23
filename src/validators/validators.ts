import * as yup from "yup";

export const signUpSchema = yup
  .object({
    firstName: yup
      .string()
      .test(
        "length",
        "First name must contain between 2 and 15 characters",
        (value) =>
          typeof value === "string" &&
          value.trim().length > 1 &&
          value.trim().length <= 15
      )
      .matches(/^[A-Z]+$/i, "First name must contain alphabets only")
      .required("Please enter your first name"),
    lastName: yup
      .string()
      .test(
        "length",
        "Last name must contain between 2 and 15 characters",
        (value) =>
          typeof value === "string" &&
          value.trim().length > 1 &&
          value.trim().length <= 15
      )
      .matches(/^[A-Z]+$/i, "Last name must contain alphabets only")
      .required("Please enter your last name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password is too short - Minimum 6 characters")
      .required("Please enter a password"),
    confirm_password: yup
      .string()
      .required("Please retype your password")
      .oneOf([yup.ref("password")], "Your passwords do not match"),
  })
  .required();
