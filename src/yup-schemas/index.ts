import * as yup from "yup";
import * as reg from "../regex";

export const signInSchema = yup.object({
  username: yup.string().required().min(5),
  password: yup
    .string()
    .required()
    .min(5)
    .matches(reg.rePassword, "Need one special character"),
});

export const signUpSchema = yup.object({
  username: yup.string().required("Username is required").min(5),
  password: yup
    .string()
    .required("Password is required")
    .min(5)
    .matches(reg.rePassword, "Need one special character"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  email: yup.string().required("Email is required").email(),
  first_name: yup
    .string()
    .required("First name is required")
    .max(40)
    .matches(reg.reName, "Please enter valid name"),
  last_name: yup
    .string()
    .required("Last name is required")
    .max(40)
    .matches(reg.reName, "Please enter valid name"),
});
