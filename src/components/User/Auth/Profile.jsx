import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../../../axiosInstance/Instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Slice/UserSlice";
import jwtDecode from "jwt-decode";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { format, parseISO } from "date-fns";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState();
  const [profilePic, setProfilePic] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await apiInstance.get(`/profile/${decodedToken?._id}`);

      if (res.data.user) {
        setUserData(res.data.user);
      } else {
        throw new Error("No user profile data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const daysLeft = userData?.planDuration;

  useEffect(() => {
    toast((t) => (
      <span className="grid ">
        Your subscription ends in <b>{daysLeft} days</b>
        <Link to="/payment">
          <Button
            variant="flat"
            className="light bg-black text-white "
            onClick={() => toast.dismiss(t.id)}
          >
            Subscribe
          </Button>
        </Link>
      </span>
    ));
  }, [daysLeft]);

  const handlelogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const backdrops = ["opaque"];
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  // const formattedSlots = userData?.slots
  // ? format(parseISO(userData?.slots), "hh:mm a")
  // : "";

  // console.log(userData?.slots);
  const convertBase64 = (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    try {
      event.preventDefault();
      const base64 = await convertBase64(profilePic);
      const res = await apiInstance.post(`/uploadImage/${decodedToken?._id}`, { image: base64 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    console.log(url);
    setProfilePic(file)
    setUserData(prev => ({...prev, profile: url}))
}
  {
    return (
      <>
        <Modal
          backdrop={backdrop}
          isOpen={isOpen}
          onClose={onClose}
          className="light"
        >
          <form onSubmit={uploadImage}>
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
                      onChange={handleImageChange}
                      
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
        <div className="p-5 flex flex-row w-full relative justify-center">
          <h1 className="text-3xl extrabold absolute left-10">My Account.</h1>
          <Card className="w-[500px] h-[400px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-wrap gap-3">
                {backdrops.map((b) => (
                  <Button
                    key={b}
                    variant="flat"
                    isIconOnly
                    onPress={() => handleOpen(b)}
                    className="w-20 h-20"
                  >
                    {userData?.profile ? (
                      <Image
                        alt="user image"
                        src={ userData.profile}
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

              <div className="flex flex-row">
                <p className=" pt-8 semibold text-xl light capitalize">
                  {userData?.name}
                </p>

                <Button
                  onClick={handlelogout}
                  className="ml-64 light mt-6 bg-black text-white"
                >
                  Logout
                </Button>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <h1 className="underline semibold text-xl">Bookings</h1>
              {userData?.slots}
            </CardBody>
            <Divider />
            <CardFooter className="justify-center">
              <Link to="/form" className=" light  ">
                <Button
                  variant="flat"
                  className=" bg-black text-white px-4 py-2 rounded"
                >
                  Become an Expert
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
}
export default Profile;
