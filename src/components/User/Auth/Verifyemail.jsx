import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiInstance } from "../../../axiosInstance/Instance";
import { CircularProgress } from "@nextui-org/react";

const VerificationPage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [value, setValue] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const emailToken = queryParams.get("emailToken");
  useEffect(() => {
    patchData();
  }, []);

  const patchData = async () => {
    try {
      const response = await apiInstance.patch("/verify-link", { emailToken });
      console.log(response);
      if (response.data.success) {
        const interval = setInterval(() => {
          setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 300);

        setTimeout(() => {
          clearInterval(interval);
          nav("/login");
        }, 3000);
      }
      if (!response) throw new Error("Email token not sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <h1 className="extrabold text-3xl">Email verified.</h1>

      <div className="flex pl-3">
        <h1 className="light pt-2 text-gray-400">Page redirecting</h1>
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          showValueLabel={true}
        />
      </div>
    </div>
  );
};

export default VerificationPage;
