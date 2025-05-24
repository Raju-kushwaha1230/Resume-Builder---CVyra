import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'


const Login = ({ setcurrentPage }) => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror] = useState(null)

  const navigate = useNavigate()
  const { updateUser } = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      seterror("Please enter a valid email")
      return
    }
    if (!password) {
      seterror("Please enter a password")
      return
    }
    if (password.length < 6) {
      seterror("Password must be at least 6 characters")
      return
    }

    seterror("")

   
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      })


      const { token } = response.data;
      if (token) {

        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard")

      }

    } catch (error) {

      if (error.response && error.response.data.message) {
        seterror(error.response.data.message)
      } else {
        seterror("Something went wronge")
      }


    }
  }

  return (
    <div>
      <div className='min-w-2xl min-h-[50vh] '>
        <h1 className='text-3xl font-semibold text-center'>Login</h1>
        <p className='text-center text-sm'>Login to your account</p>

        <form onSubmit={handleLogin} className='flex flex-col space-y-4 mt-4'>
          {/* <label htmlFor="email" className='font-semibold px-3'>Email</label>
          <input className='p-2 outline-1 outline-gray-300 rounded-lg focus:outline-2 focus:outline-cyan-200' type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} name='email' placeholder='Ex.. mighty23@gmail.com' />
          <label htmlFor="password" className='font-semibold px-3'>Password</label>
          <input className='p-2 outline-1 outline-gray-300 rounded-lg focus:outline-2 focus:outline-cyan-200'  type="text" onChange={(e)=>{setpassword(e.target.value)}} value={password} name='password' placeholder='Ex.. mighty@098' /> */}

          <Input
            value={email}
            onChange={({ target }) => { setemail(target.value) }}
            label="Email Address"
            placeholder="mighty@example.com"
            type="text"

          />
          <Input
            value={password}
            onChange={({ target }) => { setpassword(target.value) }}
            label="Password"
            placeholder="mighty@098"
            type="password"

          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 hover:cursor-pointer transition-colors'>Login</button>
          <p className='text-sm text-center'>Don't have an account? <span onClick={() => { setcurrentPage("signup") }} className='text-blue-500 hover:cursor-pointer'>Signup</span></p>
          <p className='text-sm text-center'>Forgot Password? <span onClick={() => { setcurrentPage("forgot") }} className='text-blue-500 hover:cursor-pointer'>Reset</span></p>
          <p className='text-sm text-center'>By signing up, you agree to our <span className='text-blue-500 hover:cursor-pointer'>Terms of Service</span> and <span className='text-blue-500 hover:cursor-pointer'>Privacy Policy</span></p>


        </form>
      </div>
    </div>
  )
}

export default Login