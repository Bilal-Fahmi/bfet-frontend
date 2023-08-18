import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { apiInstance } from "../../axiosInstance/Instance"


function Profile() {
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const res = await apiInstance.get('/profile')
            console.log(res);
            if(!res) throw new Error('No user profile data')
            
        } catch (error) {
            console.log(error);
        }
}

const navigate = useNavigate()
const handlelogout=()=>{
    try {
        navigate('/login')
        localStorage.removeItem('token')
        
    } catch (error) {
        console.log(error);
    }
  
}

    return(
        <div>
            <h1 className="text-xl semibold mt-10 mb-3">My Account</h1>
            <div className="flex ">
        <h2 className="light">Welcome !</h2>
        <button className="underline light ml-2 text-sm " onClick={handlelogout}>logout</button>
            </div>
        </div>
    )
}

export default Profile