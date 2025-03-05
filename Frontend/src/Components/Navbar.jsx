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
        <div className='flex justify-between items-center mx-16 mr-40  h-16 '>
            <img className='w-40' src={Logo} alt="Logo" />
            <div>
                <ul className="flex gap-10">
                    <div className='flex gap-8'>
                        {isOwnerRoute2 ?<NavLink to="/owner">Home</NavLink> : <NavLink to={myhomepath}>Home</NavLink>}
                        <CategoryDropdown />
                    </div>
                    <div className='flex gap-8 mx-6'>
                        {!isOwnerRoute && <NavLink to="/Cart">Cart</NavLink> }
                        <NavLink to={myAccountPath}>My Account</NavLink>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
