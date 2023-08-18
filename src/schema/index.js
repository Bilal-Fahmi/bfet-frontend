import * as yup from "yup";

const pwdRules = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

export const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(pwdRules, {
      message:
        "Please create a stronger password with min one uppercase letter and one digit ",
    })
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  name: yup
    .string()
    .min(4, { message: "Must be 4 characters or more " })
    .required("Name is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(5)
    .required("Password is required"),
 
})