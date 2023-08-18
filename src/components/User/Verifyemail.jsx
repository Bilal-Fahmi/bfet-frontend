import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiInstance } from "../../axiosInstance/Instance";

const VerificationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailToken = queryParams.get("emailToken");
  console.log(emailToken);
  useEffect(() => {
    patchData();
  }, []);

  const patchData = async () => {
    try {
      const response = await apiInstance.patch("/verify-link", { emailToken });
      if (!response) throw new Error("Email token not sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="extrabold">Email verified</h1>
    </div>
  );
};

export default VerificationPage;
