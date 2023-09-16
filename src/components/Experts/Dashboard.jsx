import { useEffect, useState } from "react";
import Card from "../Card-expert dash/Card";
import { useDispatch, useSelector } from "react-redux";
import { apiInstance } from "../../axiosInstance/Instance";
import jwtDecode from "jwt-decode";


export default function ExpertDash() {
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
      const res = await apiInstance.get(`/profile/${decodedToken._id}`);
      if (res.data.user) {
        setUserData(res.data.user);
      } else {
        throw new Error("No user profile data");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
console.log(userData);
  return (
    <div>
      <Card
        name={userData?.name}
        option={userData?.selectedOption}
        description={userData?.description}
      />
      
    </div>
  );
}
