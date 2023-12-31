import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../../../schema";
import { apiInstance } from "../../../axiosInstance/Instance";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      const response = await apiInstance.post("/signup", values);
      if (response) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        if (response.data.success) {
          toast.success(response.data.success)
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      } else {
        throw new Error("Failed to connect to the backend server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  let message;
  if (touched.name && errors?.name) {
    message = errors.name.message;
  } else if (touched.email && errors?.email) {
    message = errors.email;
  } else if (touched.password && errors?.password) {
    message = errors.password;
  } else if (touched.confirmpassword && errors?.confirmpassword) {
    message = errors.confirmpassword;
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl extrabold text-black">Sign up</h1>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="name"
            className={`
              w-72 px-3 py-2 rounded border light outline-none 
              ${
                errors.name && touched.name
                  ? "border-red-600"
                  : "border-gray-300"
              }
            `}
          />
        </div>
        <div className="mb-4">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="email"
            className={`
            w-72 px-3 py-2 rounded border light outline-none 
            ${
              errors.email && touched.email
                ? "border-red-600"
                : "border-gray-300"
            }
          `}
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="password"
            className={`
            w-72 px-3 py-2 rounded border light outline-none 
            ${
              errors.password && touched.password
                ? "border-red-600"
                : "border-gray-300"
            }
          `}
          />
        </div>
        <div className="mb-4">
          <input
            name="confirmpassword"
            value={values.confirmpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="confirm password"
            className={`
            w-72 px-3 py-2 rounded border light outline-none 
            ${
              errors.confirmpassword && touched.confirmpassword
                ? "border-red-600"
                : "border-gray-300"
            }
          `}
          />
          {message && <p className="text-red-600 light">{message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-72 py-2 px-4  bg-black text-white semibold rounded hover:bg-gray-800 focus:outline-none
            ${isSubmitting ? "opacity-35" : ""}`}
        >
          Create
        </button>
      </form>
      <div className="ml-4">
        <Link to="/login" className="underline mr-1 light">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

export default Signup;
