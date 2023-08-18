import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../../schema";
import { apiInstance } from "../../axiosInstance/Instance";

function Forgotpass() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, []);
  const onSubmit = async (values, actions) => {
    try {
      const response = await apiInstance.post("/login");
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
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
      <h1 className="text-3xl extrabold text-black">Verify Otp</h1>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="OTP"
            className={`w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none
              ${errors.password && touched.password ? "border-red-600" : ""}`}
          />
       
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-72 py-2 px-4  bg-black text-white semibold rounded hover:bg-gray-800 focus:outline-none" 
            ${isSubmitting ? "opacity-35" : ""}`}
        >
          Verify
        </button>
      </form>

    </div>
  );
}

export default Forgotpass;
