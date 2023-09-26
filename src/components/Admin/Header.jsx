import { FaCircleUser } from "react-icons/fa6";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Slice/UserSlice";

function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    nav("/admin");
  };

  // Conditionally render the user-logo part of the header
  const isUserHeaderVisible = location.pathname !== "/admin";

  return (
    <div className="flex flex-row">
      {/* Left section */}
      <div className=" grow  bg-[#5AA17F] bg-opacity-10 flex items-center ml-auto extrabold ">
        <h1 className="pt-3 pb-3 text-3xl bold ml-auto" to="/">
          b`
        </h1>
      </div>

      {/* Right section */}
      <div className="flex flex-grow bg-[#FF793B] bg-opacity-10  items-center ml-auto extrabold">
        <h1 className="text-3xl bold  " to="/">
          fet
        </h1>
        {isUserHeaderVisible && (
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="flat"
                className=" mr-8 text-2xl ml-auto bg-[#FF793B] bg-opacity-10 "
              >
                <FaCircleUser />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <Button
                  className=" semibold bg-black text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default Header;
