import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

function Header() {
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
    <div className="flex flex-row">
      {/* Left section */}
      <div className=" grow  bg-[#5AA17F] bg-opacity-10 flex items-center ml-auto extrabold ">
        <a href="/" className="pt-3 pb-3 text-3xl bold ml-auto" >
          b`
        </a>
      </div>

      {/* Right section */}
      <div className="flex flex-grow bg-[#FF793B] bg-opacity-10  items-center ml-auto extrabold">
        <a href="/" className="text-3xl bold  " >
          fet
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
    </div>
  );
}

export default Header;
