import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../../axiosInstance/Instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Slice/UserSlice";
import jwtDecode from "jwt-decode";

function Profile() {
  const dispatch = useDispatch();
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

  const navigate = useNavigate();
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
    <div>
      <h1 className="text-xl semibold mt-10 mb-3">My Account</h1>
      <div className="flex ">
        <h2 className="light">Welcome {userData?.name} !</h2>
        <button
          className="underline light ml-2 text-sm "
          onClick={handlelogout}
        >
          logout
              </button>
              <Link to="/form" className="ml-2 light">
          <button className="bg-black text-white px-4 py-2 rounded">
            Become an Expert
          </button>
        </Link>
              
      </div>
    </div>
  );
}

export default Profile;
