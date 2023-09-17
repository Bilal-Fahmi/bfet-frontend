import { Button } from "@nextui-org/react";
import jwtDecode from "jwt-decode";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function MindHeader() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const handleOnClick = () => {
    if (!token) {
      nav("/login");
    } else if (decodedToken) {
      if (decodedToken.role === "user") {
        nav("/profile");
      } else if (decodedToken.role === "expert") {
        nav("/expert-dashboard");
      }
    }
  };
  return (
    <div className="flex flex-row pt-3 pb-3">
      <a
        href="/mind/fitmind"
        className="ml-auto  text-3xl extrabold text-[#5AA17F]"
      >
        b`fet
      </a>
      <Button
        isIconOnly
        onClick={handleOnClick}
        variant="flat"
        className="mr-9 bg-transparent  text-2xl ml-auto "
      >
        <FaCircleUser />
      </Button>
    </div>
  );
}
