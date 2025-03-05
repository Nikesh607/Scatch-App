import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)

    const categories = [
        { name: 'Electronics', path: '/category/electronics' },
        { name: 'Clothing', path: '/category/clothing' },
        { name: 'Books', path: '/category/books' },
        { name: 'Home & Kitchen', path: '/category/home-kitchen' }
    ]

    return (
        <div className="relative">
            <button
                className="flex items-center gap-1 hover:text-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                Categories
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {categories.map((category) => (
                        <NavLink
                            key={category.path}
                            to={category.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 text-sm hover:bg-gray-100 ${
                                    isActive ? 'text-blue-600' : 'text-gray-700'
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryDropdown