import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { apiInstance } from "../../axiosInstance/Instance";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function PaymentSuccess() {
    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token)
    const user_id = decodedToken._id
    const nav = useNavigate()
    

  const [sessionId, setSessionId] = useState("");
    useEffect(() => {
        fetchData()
    }, [user_id]);
    const fetchData = async () => {
        const res = await apiInstance.get(`/checkout-sessionId/${user_id}`)
        if (res.data.session_id.checkoutSessionId) {
            setSessionId(res.data.session_id.checkoutSessionId)
        }

    }
    const data = {
        sessionId: sessionId,
        user_id : user_id
    }
    const handlePaymentSuccess = async () => {
        const res = await apiInstance.post('/payment-success', data)
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.success)
            nav("/profile")
        }
    }
    // const [userId, setUserId] = useState("")
    // const [sessionId,setSessionId]=useState("")
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             setUserId(user.id)
    //             const useRef = firebase.database().ref("users/" + user.uid)
    //             useRef.on('value', (snapshot) => {
    //                 const userVal = snapshot.val()
    //                 if (userVal) {
    //                     setSessionId(user.subscription.sesssion || "")
    //                 }
    //             })
    //         }
    //     })
    // })
    
    return <div>Success
      <Button variant="flat" onClick={handlePaymentSuccess}></Button>
  </div>;
}
