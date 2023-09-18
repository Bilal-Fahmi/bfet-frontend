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
} from "@nextui-org/react";
import { toast } from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState();
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
  if (daysLeft) {
    console.log(daysLeft);
  }

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

  {
    return (
      <div  >
        <h1 className="text-xl semibold mt-10 mb-3">My Account.</h1>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/public/pic/profile.jpg"
              width={40}
            />
            <div className="flex flex-row">
              <p className="text-md light capitalize">{userData?.name}</p>

              <Button
                onClick={handlelogout}
                className="ml-64 light bg-black text-white"
              >
                Logout
              </Button>
              {/* <p className="text-small text-default-500">nextui.org</p> */}
            </div>
          </CardHeader>
          <Divider />
          <CardBody></CardBody>
          <Divider />
          <CardFooter>
            <Link to="/form" className=" light  ">
              <button className=" bg-black text-white px-4 py-2 rounded">
                Become an Expert
              </button>
            </Link>
          </CardFooter>
        </Card>
        <BarChart
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
        </BarChart>
      </div>
    );
  }
}
export default Profile;
