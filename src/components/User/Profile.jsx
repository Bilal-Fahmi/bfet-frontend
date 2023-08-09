import { Link,useNavigate } from "react-router-dom"


function Profile(){

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
            <h1>Profile </h1>
        <button onClick={handlelogout}>logout</button>
        </div>
    )
}

export default Profile