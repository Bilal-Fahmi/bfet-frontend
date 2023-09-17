import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { apiInstance } from "../../../axiosInstance/Instance";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecert, setClientSecert] = useState("");
  useEffect(() => {
    fetchStripeKey();
    fetchpayemnetIntent();
  }, []);
  const fetchStripeKey = async () => {
    try {
      const res = await apiInstance.get("/stripe-key");
      if (res?.data.publishableKey) {
        // console.log(res?.data.publishableKey);
        setStripePromise(res.data.publishableKey);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchpayemnetIntent = async () => {
    try {
      const res = await apiInstance.get("/sec-key");
      console.log(res?.data.secKey);
      setClientSecert(res?.data.secKey);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {stripePromise &&
        clientSecert(
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm />
          </Elements>
        )}
    </div>
  );
}
