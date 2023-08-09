import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:8000/login', { email, password })
      if (response) {
        toast.success(response.data.success)
        const { token } = response.data
        localStorage.setItem('token', token)

        navigate('/profile')
      } else {
        toast.error(response.data.error)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl extrabold text-black">Login</h1>
      <form className="w-72 p-4 rounded" onSubmit={handleSubmit}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="w-72 px-3 py-2 rounded border light border-gray-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-72 py-2 px-4  bg-black text-white bold rounded hover:bg-gray-800 focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <div className="ml-4">
        <Link className="underline mr-1 light">Forgot password?</Link>
        <a>/</a>
        <Link to="/signup" className="underline ml-1 light">Create an account</Link>
      </div>
    </div>
  )
}

export default Login