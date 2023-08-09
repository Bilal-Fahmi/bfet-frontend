import { Link,useNavigate } from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
import React, { useState } from "react"


function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmpwd, setConfirmpwd] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup',{name,email,password:pwd,confirmpassword:confirmpwd})
      if (response.data.success) {
        toast.success(response.data.success)
        const sent = {name,email}
        navigate('/verify-email', {state:sent})
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  


  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl extrabold text-black">Sign up</h1>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            placeholder="password"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            value={confirmpwd}
            onChange={(e) => setConfirmpwd(e.target.value)}
            type="password"
            placeholder="confirm password"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>
        <button
        
          type="submit"
          className="w-72 py-2 px-4  bg-black text-white bold rounded hover:bg-gray-800 focus:outline-none"
        >
          Create
        </button>
      </form>
      <div className="ml-4">
        <Link to="/login" className="underline mr-1 light">Already have an account?</Link>
      </div>
    </div>
  )
}

export default Signup