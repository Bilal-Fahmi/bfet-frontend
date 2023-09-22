import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../../../axiosInstance/Instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Slice/UserSlice";
import jwtDecode from "jwt-decode";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
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

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState();
  const [profilePic, setProfilePic] = useState("");
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

  const data = [
    { category: "not recommended", sleep: 6, water: 4, calories: 2000 },
    { category: "recommended", sleep: 7, water: 8, calories: 2500 },
    { category: "best", sleep: 8, water: 10, calories: 2800 },
  ];

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

  {
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
                        src={`${import.meta.env.VITE_REACT_APP_bdId}/uploads/${
                          userData?.profile
                        }`}
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
                {/* <p className="text-small text-default-500">nextui.org</p> */}
              </div>
            </CardHeader>
            <Divider />
            <CardBody></CardBody>
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
          {/* <BarChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sleep" fill="#8884d8" name="Sleep" />
          <Bar dataKey="water" fill="#82ca9d" name="Water" />
          <Bar dataKey="calories" fill="#ffc658" name="Calories" />
        </BarChart> */}
        </div>
      </>
    );
  }
}
export default Profile;
