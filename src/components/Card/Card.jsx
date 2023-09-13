import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Textarea,
  Button,
} from "@nextui-org/react";
import { apiInstance } from "../../axiosInstance/Instance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CardUi({ name, option, description }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const optionColor =
    option === "Mind"
      ? "bg-[#5AA17F] bg-opacity-20"
      : "bg-[#FF793B] bg-opacity-20";

  // const handleonClick = async () => {
  //   try {
  //     const res = await apiInstance.post("/update-descripiton",{description:description});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="mt-10 w-[500px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={50}
          radius="sm"
          src="/public/pic/profile 2.jpg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md medium p-1 capitalize">{name}</p>
          <p
            className={`light rounded border text-black p-1  text-small text-default-500 ${optionColor}`}
          >
            {option}
          </p>
        </div>
        <Button
          onClick={handleLogout}
          className="ml-64 light bg-black text-white"
        >
          Logout
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row">
        <Textarea
          label="Description"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your description"
          defaultValue={description}
          className="max-w-xs light"
        />
        <Button
          // onClick={handleonClick}
          className="mt-10 ml-10 light"
          color="success"
          variant="flat"
        >
          Update
        </Button>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link to="/createblog">
          <Button className="light" variant="flat">
            Create Blog
          </Button>
        </Link>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
      </CardFooter>
    </Card>
  );
}
