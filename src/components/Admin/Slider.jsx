import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'

// const Slider = () => {
   
//     const [showSidebar, setShowSidebar] = useState(false)

//     return (
//         <>
//             {showSidebar ? (
//     <button
//       className="flex text-4xl text-white items-center cursor-pointer fixed left-10 top-2 z-50"
//       onClick={() => setShowSidebar(!showSidebar)}
//     >
//       x
//     </button>
//   ) : (
//     <svg
//       onClick={() => setShowSidebar(!showSidebar)}
//       className="fixed  z-30 flex items-center cursor-pointer left-10 top-5"
//       fill="#000000"
//       viewBox="0 0 100 90"
//       width="25"
//       height="25"
//     >
//       <rect width="100" height="10"></rect>
//       <rect y="30" width="100" height="10"></rect>
//       <rect y="60" width="100" height="10"></rect>
//     </svg>
//   )}
        
//             <div className={`flex flex-col top-0 left-0 w-[22vw] bg-black  p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300  ${ showSidebar ? "translate-x-0 " : "translate-y-full"} `}>
//                 <Link to='/admin/users' className="mt-16 text-3xl semibold text-white">Users</Link>
//                 <Link className="mt-4 text-3xl semibold text-white">Experts</Link>
//                 <Link  className="mt-4 text-3xl semibold text-white" >Slots</Link>
//                 {/* <Link className="mt-4 text-3xl light text-white">User</Link> */}
//         </div>
            
//             </>
//     )
// }
const links = [
    { name: "Home", to: "/dashboard", id: 1 },
    { name: "Users", to: "/users", id: 2 },
    { name: "Experts", to: "/experts", id: 3 },
    { name: "Slots", to: "/slots", id: 4 }, 
]
const Slider = () => {
    
    return (
        <motion.aside>
        <div className="container">
        
        </div>
        </motion.aside>
    )
}

export default Slider