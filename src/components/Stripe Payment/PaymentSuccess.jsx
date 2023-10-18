import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { apiInstance } from "../../axiosInstance/Instance";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function PaymentSuccess() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken._id;
  const nav = useNavigate();

  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    fetchData();
  }, [user_id]);
  const fetchData = async () => {
    const res = await apiInstance.get(`/checkout-sessionId/${user_id}`);
    if (res.data.session_id.checkoutSessionId) {
      setSessionId(res.data.session_id.checkoutSessionId);
    }
  };
  const data = {
    sessionId: sessionId,
    user_id: user_id,
  };
  const handlePaymentSuccess = async () => {
    const res = await apiInstance.post("/payment-success", data);
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.success);
      nav("/profile");
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <h1 className="extrabold text-3xl pb-2">Payment success</h1>

      <Button
        variant="flat"
        className=" semibold bg-black text-white text-md"
        onClick={handlePaymentSuccess}
      >
        Return to Profile
      </Button>
    </div>
  );
}
