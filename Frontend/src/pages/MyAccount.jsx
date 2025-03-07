import React, { useState, useEffect } from 'react'
import axiosInstance from '../config/axios.config'
import { FiUser, FiMail, FiPhone, FiLogOut, FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const MyAccount = ({ isOwner }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const endpoint = isOwner ? '/owners/profile' : '/users/profile'
        const { data } = await axiosInstance.get(endpoint)

        setUser(data)

      } catch (error) {
        console.error('Profile fetch error:', error)
        if (!error.response || error.response.status !== 401) {
          setError('Failed to fetch profile data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/users/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data?.message || error.message);
      }
    };

    fetchOrders();

  }, [isOwner])

  const handleLogout = async () => {
    try {
      const endpoint = isOwner ? '/owners/logout' : '/users/logout'
      await axiosInstance.get(endpoint)
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <FiUser size={40} />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">
                {`${user?.fullname?.firstname || ''} ${user?.fullname?.lastname || ''}`}
              </h2>
              {isOwner && user?.gstin && (
                <p className="text-sm text-gray-600">GSTIN: {user.gstin}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiMail className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FiPhone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{user?.contact || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiEdit2 className="mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isOwner ? 'Products' : 'Recent Orders'}
          </h3>
          <div className="flex flex-wrap">
          {isOwner ? (
            user?.products?.length > 0 ? (
              <div className="space-y-4">
                {JSON.parse(user.products).map(product => (
                  <div key={product._id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <p className="font-medium">{product.name}</p>
                    <p className="font-medium">₹{product.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products listed</p>
            )
          ) : (orders.length > 0 ? (
            orders.map((order,index) => (
              <div key={order._id || `${order.productname}-${index}`} className="order-card w-16 max-h-60 flex flex-col justify-between rounded-lg" style={{ backgroundColor: order.bgcolor }}>
                <img className=" h-16 object-cover" src={order.image} alt={order.productname} />
              </div>
            ))
          ) : (
            <p>No orders placed yet.</p>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
