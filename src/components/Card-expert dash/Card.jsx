import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { apiInstance } from "../../axiosInstance/Instance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Slice/UserSlice";

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
  const handleOnSlots = () => {
    try {
      navigate("/expert-slots");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  const backdrops = ["opaque"];
  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground light" {...titleProps}>
            Change Profile image
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
           <Input type="file"/>
          </div>
        </div>
      )}
    </PopoverContent>
  )

  return (
    <Card className=" w-[500px] h-[400px]">
      <CardHeader className="flex gap-3">
     
        {backdrops.map((backdrop) => (
        <Popover
          key={backdrop}
          showArrow
          offset={10}
          placement="bottom"
          backdrop={backdrop}
        >
          <PopoverTrigger>
            <Button  isIconOnly className="capitalize h-16 w-16">
                <Image
                  
                  alt="user image"
                  
          // radius="sm"
          src="/public/pic/profile 2.jpg"
          // width={40}
        />
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
      ))}

        <div className="flex flex-col">
          <p className="text-md medium p-1 capitalize">{name}</p>
          <p
            className={`light rounded border text-black p-1  text-small  ${optionColor}`}
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
      <CardBody className="flex flex-row ">
        <Textarea
          label="Description"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your description"
          defaultValue={description}
          className="max-w-xs light "
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
      <CardFooter className="justify-between">
        <Link to="/createblog">
          <Button className="light" variant="flat">
            Create Blog
          </Button>
        </Link>
        <Button className="light " variant="flat" onClick={handleOnSlots}>
          Create Slots
        </Button>
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