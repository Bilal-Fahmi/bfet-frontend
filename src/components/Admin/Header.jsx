import { Link,useNavigate } from "react-router-dom"
import {FaBars} from 'react-icons/fa'
import {FaCircleUser} from 'react-icons/fa6'




function Header(){
  const navigate = useNavigate() 
  
//   const handleprofile=()=>{
//     navigate('/profile')
//   }

    return(    
      
<div className="flex flex-row">
 {/* Left section */}
<div className=" grow  bg-[#5AA17F] bg-opacity-10 flex items-center ml-auto extrabold " >
    <h1 className="pt-3 pb-3 text-3xl bold ml-auto" to='/' >b`</h1> 
     
     
  </div>

        {/* Right section */}
        <div className="flex flex-grow bg-[#FF793B] bg-opacity-10  items-center ml-auto extrabold">
        <h1 className="text-3xl bold  " to='/'>fet</h1>
        <button  className="mr-9  text-2xl ml-auto "><FaCircleUser/></button>
      
       
      </div>

  </div>
     
    )
}

export default Header
