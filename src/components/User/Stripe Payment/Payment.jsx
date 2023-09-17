import { useEffect, useState } from "react";
import { apiInstance } from "../../../axiosInstance/Instance";
import jwtDecode from "jwt-decode";

export default function Payment() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    fetchCheckoutSession();
    // fetchpayemnetIntent();
  }, []);

  const fetchCheckoutSession = async () => {
    try {
      const res = await apiInstance.post(
        `/subscription-checkout-session/${decodedToken?._id}`
      );
      window.location = res.data.session.url;
      //   if (res.data?.session.url) {
      //     window.location = session.url;
      //   }
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div>Pls wait</div>
    )
}
