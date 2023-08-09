import { Link,useNavigate } from "react-router-dom"
import {FaBars} from 'react-icons/fa'
import {FaCartShopping,FaCircleUser} from 'react-icons/fa6'




function Header(){
  const navigate = useNavigate() 
  
  const handleprofile=()=>{
    navigate('/profile')
  }

    return(    
      
<div className="flex flex-row">
 {/* Left section */}
<div className=" grow  bg-[#5AA17F] bg-opacity-10 flex items-center ml-auto extrabold " >
      <Link className="ml-6  text-2xl " ><FaBars/></Link>
    <Link className="pt-3 pb-3 text-3xl bold ml-auto" to='/' >b`</Link> 
     
     
  </div>

        {/* Right section */}
        <div className="flex flex-grow bg-[#FF793B] bg-opacity-10  items-center ml-auto extrabold">
        <Link className="text-3xl bold  " to='/'>fet</Link>
        <button onClick={handleprofile} className="mr-6  text-2xl ml-auto "><FaCircleUser/></button>
        <Link className="  mr-6 text-2xl    "><FaCartShopping/></Link>
       
      </div>

  </div>
     
    )
}

export default Header
