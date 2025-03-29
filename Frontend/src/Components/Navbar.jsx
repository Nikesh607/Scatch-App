import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'
import CategoryDropdown from './CategoryDropdown'

const Navbar = () => {
    const location = useLocation()
    const isOwnerRoute = location.pathname.startsWith('/owner')
    const isOwnerRoute2 = location.pathname.startsWith('/owner/addproduct')
    const isOwnerprofile = location.pathname.startsWith('/owner/MyAccount')
    const myAccountPath = isOwnerRoute ? '/owner/MyAccount' : '/MyAccount'
    const myhomepath = isOwnerprofile ? '/owner' : '/home'

    return (
        <div className='flex justify-between items-center px-16 pr-40 h-12 rounded-3xl shadow-[0_8px_10px_rgba(0,0,0,0.50)] bg-[#d9d9d9]'>
            <img className='w-40 rounded-3xl' src={Logo} alt="Logo" />
            <div>
                <ul className="flex gap-10">
                    <div className='flex gap-8'>
                        {isOwnerRoute2 ? <NavLink to="/owner">Home</NavLink> : <NavLink to={myhomepath}>Home</NavLink>}
                        <CategoryDropdown />
                    </div>
                    <div className='flex gap-8 mx-6'>
                        {!isOwnerRoute && <NavLink to="/Cart">Cart</NavLink>}
                        <NavLink to={myAccountPath}>My Account</NavLink>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
