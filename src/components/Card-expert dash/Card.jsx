import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Textarea,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { apiInstance } from "../../axiosInstance/Instance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Slice/UserSlice";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

export default function CardUi({ name, option, description, profile }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [profilePic, setProfilePic] = useState("");
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
  const handleFileChange = (e) => {
    console.log("file:::", e.target.files[0]);
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      console.log("clickedd");
      const formData = new FormData();
      formData.append("profilePic", profilePic);
      e.preventDefault();
      const res = await apiInstance.post(
        `/profilePic/${decodedToken?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
    setProfilePic("");
  };

  const backdrops = ["opaque"];
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        className="light"
      >
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Profile Picture
              </ModalHeader>
              <ModalBody>
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <Input
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleFileChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-black text-white" type="submit">
                  Upload
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </form>
      </Modal>
      <Card className=" w-[500px] h-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-3">
              {backdrops.map((b) => (
                <Button
                  key={b}
                  variant="flat"
                  isIconOnly
                  onPress={() => handleOpen(b)}
                  className="w-20 h-20"
                >
                  {profile ? (
                    <Image
                      alt="user image"
                      // src={`${
                      //   import.meta.env.VITE_REACT_APP_bdId
                      // }/uploads/${profile}`}
                      src={import.meta.env.VITE_REACT_APP_bdId + `/uploads/${profile}`}

                    />
                  ) : (
                    <Image
                      alt="default user image"
                      src="/public/pic/profilePicDefault.jpg"
                    />
                  )}
                </Button>
              ))}
            </div>
            <p className="text-md medium p-1 capitalize">{name}</p>
            <p
              className={`light rounded border text-black p-1 pl-5  text-small  ${optionColor}`}
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
        </CardFooter>
      </Card>
    </>
  );
}
