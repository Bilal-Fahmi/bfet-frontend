import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../schema";
import { apiInstance } from "../../axiosInstance/Instance";
import { useDispatch } from "react-redux";
import { login } from "../../Slice/UserSlice";
import jwtDecode from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.role === "user") {
        navigate("/profile");
      } else if (decodedToken.role === "expert") {
        navigate("/expert-dashboard");
      }
    }
  }, []);
  
  const onSubmit = async (values, actions) => {
    try {
      const response = await apiInstance.post("/login", values);
      if (response.data.success) {
        dispatch(login(response.data.user));
        if (response.data.user.role === "expert") {
          navigate("/expert-dashboard");
          toast.success(response.data.success);
        } else {
          navigate("/profile");
          toast.success(response.data.success);
        }

        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
      } else {
        toast.error(response.data.error);

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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  let message;
  if (touched.email && errors?.email) {
    message = errors.email;
  } else if (touched.password && errors?.password) {
    message = errors.password;
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl extrabold text-black">Login</h1>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            placeholder="email"
            className={`w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none 
                ${errors.email && touched.email ? "border-red-600" : ""}`}
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
            className={`w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none
              ${errors.password && touched.password ? "border-red-600" : ""}`}
          />
          {message && <p className="text-red-600 light">{message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-72 py-2 px-4  bg-black text-white semibold rounded hover:bg-gray-800 focus:outline-none" 
            ${isSubmitting ? "opacity-35" : ""}`}
        >
          Sign In
        </button>
      </form>
      <div className="ml-4">
        <Link className="underline mr-1 light">Forgot password?</Link>
        <a>/</a>
        <Link to="/signup" className="underline ml-1 light">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default Login;
