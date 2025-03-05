import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import ProductList from '../Components/Productlist';

const Owner_page = () => {
    const [isOwner, setisOwner] = useState(true)
    return (
        <div>
            <div className='flex gap-7 mx-16 mr-40 '>
                <div className="left-container my-6 w-1/5 min-h-[calc(100vh-120px)]">
                    <ul className='flex flex-col gap-2'>
                        <NavLink to="/owner" className={({ isActive }) =>
                            isActive ? 'hover:cursor-pointer font-bold px-2' : 'hover:cursor-pointer'
                        }>All Products</NavLink>
                        <NavLink to="/orders" className={({ isActive }) =>
                            isActive ? 'hover:cursor-pointer' : 'px-2 hover:cursor-pointer'
                        }>Orders</NavLink>
                        <NavLink to="/owner/addproduct" className={({ isActive }) =>
                            isActive ? 'hover:cursor-pointer' : 'px-2 w-[170px] hover:cursor-pointer'
                        }>Create New Products</NavLink>
                    </ul>
                </div>
                <ProductList isOwner={isOwner}/>
            </div>

        </div>
    )
}

export default Owner_page
