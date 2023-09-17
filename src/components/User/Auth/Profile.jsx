import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../../../axiosInstance/Instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Slice/UserSlice";
import jwtDecode from "jwt-decode";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image,Button} from "@nextui-org/react";


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

  const handlelogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
    };
   

  return (
    <div >
      <h1 className="text-xl semibold mt-10 mb-3">My Account</h1>
      {/* <div className="flex ">
        <h2 className="light flex-auto">Welcome {userData?.name}!</h2>
        <button
          className="underline light ml-2 text-sm "
          onClick={handlelogout}
        >
          logout
        </button>
        
              <Link to="/form" className=" light  ">
          <button  className=" bg-black text-white px-4 py-2 rounded">
            Become an Expert
          </button>
        </Link>
              
      </div> */}
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
            <Button onClick={handlelogout} className="ml-64 light bg-black text-white">Logout</Button>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <Link to="/form" className=" light  ">
          <button  className=" bg-black text-white px-4 py-2 rounded">
            Become an Expert
          </button>
        </Link>
      </CardBody>
      <Divider/>
      <CardFooter>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
      </CardFooter>
    </Card>
    </div>
  );
}

export default Profile;
