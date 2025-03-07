import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axios.config'

const Createowner = () => {
    const navigate = useNavigate()

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [CreatedUserEmail, setCreatedUserEmail] = useState("")
    const [CreatedUserPassword, setCreatedUserPassword] = useState("")
    const [Contact, setContact] = useState("")
    const [gstin, setGstin] = useState("")

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
                contact: Contact,
                gstin: gstin,
            }

            const { data } = await axiosInstance.post('/owners/create', registerData, {
                withCredentials: true  // Add this to ensure cookies are handled
            })

            console.log('Registration successful:', data)

            // Clear form
            setFirstName("")
            setLastName("")
            setCreatedUserEmail("")
            setCreatedUserPassword("")
            setContact("")
            setGstin("")

            // Redirect to home page
            navigate('/', { replace: true })

        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || 'Registration failed')
            // Add error handling UI here if needed
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
                        <div>
                            <input required
                                value={gstin}
                                onChange={(e) => {
                                    setGstin(e.target.value)
                                }}
                                className='w-[350px] px-4 py-3 rounded-md'
                                type="text"
                                name='gstin'
                                placeholder='gstin' />
                        </div>
                        <div className='my-2 '>
                            <input className='text-white bg-[#0184fe] px-6 py-2 rounded-full text-lg'
                                type="submit"
                                value="Create Owner Account" />
                        </div>
                    </div>
                </form>
            </div>


            <div className="flex justify-center items-center text-white ">
                <div className='flex justify-center items-center h-[3.25rem] rounded-full p-4 text-lg bg-[#0184fe]'>
                    or
                </div>
            </div>

        </div>
    )
}

export default Createowner
