import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const nav = useNavigate();
  const [value, setValue] = useState(0);
  useEffect(() => {
    pageRedirect();
  }, []);
  const pageRedirect = async () => {
    try {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 10));
      }, 300);

      setTimeout(() => {
        clearInterval(interval);
        nav("/profile");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center flex-col">
      <h1 className="extrabold text-3xl">Payment cancelled</h1>
      <div className="flex pl-10">
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
}
