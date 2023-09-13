import { FaCircleUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function MindHeader() {
    return (
        <div className='flex flex-row'>
            <h1 className="ml-auto pt-3 pb-3 text-3xl extrabold text-[#5AA17F]">b`fet</h1>
            <Link to="/profile"  className="mr-9 pt-4 text-2xl ml-auto "><FaCircleUser/></Link>
        </div>
    )
}