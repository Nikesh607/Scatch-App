import React from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useCart } from '../context/CartContext'
import axiosInstance from '../config/axios.config'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart,clearCart } = useCart()

  const totalMRP = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount * item.quantity, 0)
  const platformFee = 20
  const totalAmount = totalMRP - totalDiscount + platformFee

  const handlePlaceOrder = async () => {
    try {
        await axiosInstance.post('/users/place-order');
        clearCart()

        alert('Order placed successfully!');
        // You can refresh the page or update UI state here
    } catch (error) {
        console.error('Error placing order:', error);
        alert(error.response?.data?.message || 'Failed to place order');
    }
};


  return (
    <div className='my-8 mx-14 flex gap-4'>
      <div className="w-3/4 my-2 flex flex-col gap-4">
        {cartItems.length > 0 ? (cartItems.map((item) => (
          <div key={item._id} className="card w-full flex justify-between bg-white rounded-lg p-4 shadow-md">
            <div className="flex gap-4">
              <img className='w-32 h-32 object-cover rounded-md'
                src={`${import.meta.env.VITE_API_BASE_URL}${item.image}`}
                alt={item.productname}
              />
              <div className="flex flex-col justify-between">
                <p className='text-xl font-medium'>{item.productname}</p>
                <div className="counter flex gap-2 items-center">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    <FiMinus className='w-6 h-6 bg-gray-100 rounded-full p-1' />
                  </button>
                  <span className='px-2'>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <FiPlus className='w-6 h-6 bg-gray-100 rounded-full p-1' />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700">
                Remove
              </button>
              <div className="flex items-center gap-1">
                <LiaRupeeSignSolid />
                <span>{(item.price - item.discount) * item.quantity}</span>
              </div>
            </div>
          </div>
        ))) : <p className='text-xl text-center ml-80 font-medium'>No items in cart</p>}
      </div>
      {cartItems.length > 0 && <div className="info w-full flex flex-col gap-3">
        <div className='w-1/4'>
          <p className='text-2xl font-medium'>Price Breakdown</p>
          <div className='pl-5 pt-5 mb-4 font-medium flex flex-col gap-2'>
            <div className="flex justify-between items-center">
              <p>Total MRP</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <p>{totalMRP}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Discount on MRP</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <p>{totalDiscount}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Platform Fee</p>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <p>{platformFee}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Shipping Fee</p>
              <p>Fee</p>
            </div>
          </div>
        </div>

        <div className="line h-1 bg-gray-400 "></div>

        <div className='w-1/4 flex justify-between items-center font-medium'>
          <p>Total Amount</p>
          <div className="flex items-center">
            <LiaRupeeSignSolid />
            <p>{totalAmount}</p>
          </div>
        </div>
        <button onClick={handlePlaceOrder} className='bg-black text-white py-2 rounded-lg w-2/12 mt-2'>Place Order</button>
      </div>}
    </div>
  )
}

export default Cart
