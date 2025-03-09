import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axios.config'

const Login_signup = () => {
  const navigate = useNavigate()

  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [CreatedUserEmail, setCreatedUserEmail] = useState("")
  const [CreatedUserPassword, setCreatedUserPassword] = useState("")
  const [Contact, setContact] = useState("")


  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send data directly instead of using state
      const registerData = {
        fullname: {
          firstname: FirstName,
          lastname: LastName
        },
        email: CreatedUserEmail,
        password: CreatedUserPassword,
        contact: Contact
      }

      const response = await axiosInstance.post('/users/register', registerData,{
        withCredentials: true  // Add this to ensure cookies are handled
      })
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      console.log('Registration successful:', user)

      // Clear form
      setFirstName("")
      setLastName("")
      setCreatedUserEmail("")
      setCreatedUserPassword("")
      setContact("")

      // Redirect to home page
      navigate('/', { replace: true })

    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || 'Registration failed')
      // Add error handling UI here if needed
    }
}

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const loginData = {
        email: Email,
        password: Password
      }

      if (Email === "owner@owner.com") {
        try {
          const { data } = await axiosInstance.post('/owners/login', loginData,{
            withCredentials: true
          })
          console.log('Owner login successful:', data)
          setEmail("")
          setPassword("")
          navigate('/owner', { replace: true })
          return
        } catch (ownerError) {
          setLoginError('Owner login failed. Please check your credentials.')
          return
        }
      }

      const response = await axiosInstance.post('/users/login', loginData, {
        withCredentials: true
      })
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      console.log('User login successful:', user)

      setEmail("")
      setPassword("")
      navigate('/', { replace: true })

    } catch (error) {
      console.error('Login error:', error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='container mx-auto max-w-[80%] flex justify-evenly p-9 '>
      <div className="left w-[40%] min-h-[calc(100vh-72px)] bg-[#d6dbe1] flex flex-col gap-8 justify-center items-start px-14 pb-5">
        <div className='flex flex-col gap-2 justify-center items-start'>
          <div className='flex text-4xl font-[450] gap-1 items-end tracking-tighter'>
            <p>welcome to</p>
            <p className='text-[#0184fe] text-4xl font-medium'>Scatch</p>
          </div>
          <p className='text-2xl font-medium'>Create your account</p>
        </div>
        <form onSubmit={handleCreateSubmit}>
          <div className="forms flex flex-col gap-4 ">
            <div className='flex gap-4'>
              <input required
                value={FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                className='w-1/2 px-4 py-3 rounded-md'
                type="text"
                name='FirstName'
                placeholder='First Name' />
              <input required
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                className='w-1/2 px-4 py-3 rounded-md'
                type="text"
                name='LastName'
                placeholder='Last Name' />
            </div>
            <div>
              <input required
                value={CreatedUserEmail}
                onChange={(e) => {
                  setCreatedUserEmail(e.target.value)
                }}
                className='w-[350px] px-4 py-3 rounded-md'
                type="text"
                name='Email'
                placeholder='Email' />
            </div>
            <div>
              <input required
                value={CreatedUserPassword}
                onChange={(e) => {
                  setCreatedUserPassword(e.target.value)
                }}
                className='w-[350px] px-4 py-3 rounded-md'
                type="password"
                name='Password'
                placeholder='Password' />
            </div>
            <div>
              <input required
                value={Contact}
                onChange={(e) => {
                  setContact(e.target.value)
                }}
                className='w-[350px] px-4 py-3 rounded-md'
                type="tel"
                name='Contact'
                placeholder='Contact' />
            </div>
            <div className='my-2 '>
              <input className='text-white bg-[#0184fe] px-6 py-2 rounded-full text-lg'
                type="submit"
                value="Create My Account" />
            </div>
          </div>
        </form>
      </div>


      <div className="flex justify-center items-center text-white ">
        <div className='flex justify-center items-center h-[3.25rem] rounded-full p-4 text-lg bg-[#0184fe]'>
          or
        </div>
      </div>


      <div className="right w-[40%] min-h-[100vh-36px] flex flex-col gap-8 justify-center items-start px-14 pb-5">
        <p className='text-2xl font-medium'>Create your account</p>
        <form onSubmit={handleLoginSubmit}>
          <div className="forms flex flex-col gap-4 ">
            <div>
              <input required
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='w-[350px] px-4 py-3 rounded-md bg-[#eeeeef]'
                type="text"
                name='Email'
                placeholder='Email' />
            </div>
            <div>
              <input required
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className='w-[350px] px-4 py-3 rounded-md bg-[#eeeeef]'
                type="password"
                name='Password'
                placeholder='Password' />
            </div>
            <div className='my-2 '>
              <input required
                className='text-white bg-[#0184fe] px-6 py-2 rounded-full text-lg'
                type="submit"
                value="Login" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login_signup
