import React, { useState, useEffect, useMemo } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia"
import { FiPlus } from "react-icons/fi"
import axiosInstance from '../config/axios.config'
import { useCart } from '../context/CartContext'

const sortFunctions = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'name': (a, b) => a.productname.localeCompare(b.productname)
}

const ProductList = ({ sortBy, newcollection }) => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [adding, setAdding] = useState(null)
  const [error, setError] = useState(null);

  const handleAddToCart = async (product) => {
    try {
      setError(null);
      setAdding(product._id);
      await addToCart(product);
      alert('Product added to cart');
    } catch (error) {
      setError(error.message || 'Failed to add to cart');
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get('/products')
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  const sortedProducts = useMemo(() => {
    if (!sortBy) return products
    return [...products].sort(sortFunctions[sortBy])
  }, [products, sortBy])


  const displayedProducts = useMemo(() => {
    return newcollection ? [...sortedProducts].reverse() : sortedProducts
  }, [sortedProducts, newcollection])

  return (

    <div className="right-container my-6 w-full flex gap-12 flex-wrap min-h-[calc(100vh-120px)]">
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error === 'Authentication required' ? 'Please log in to add items to your cart.' : error}
        </div>
      )}
      {displayedProducts.map((product) => (
        <div key={product._id} className="card w-[15%] max-h-60 flex flex-col justify-between hover:scale-105">
          <img className="w-full min-h-[175px] object-cover rounded-[30px]" src={product.image} alt={product.productname} />
          <div className="info h-full rounded-[10px]" style={{ backgroundColor: product.bgcolor }}>
            <p className='text-lg text-center' style={{ color: product.textcolor }}>{product.productname}</p>
            <div className='flex justify-between items-center p-1 rounded-full' style={{ backgroundColor: product.panelcolor }}>
              <div className="flex flex-col items-center">
                <p className='flex items-center' style={{ color: product.textcolor }}>
                  <LiaRupeeSignSolid />
                  {product.price - product.discount}
                </p>
                <p className='flex items-center line-through text-[12px]'>
                  <LiaRupeeSignSolid />
                  {product.price}
                </p>
              </div>
              <p className='text-[12px]'>-{Math.round((product.discount / product.price) * 100)}%</p>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={adding === product._id}
                className="hover:scale-110 transition-transform disabled:opacity-50 relative"
              >
                {adding === product._id ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full"></div>
                  </div>
                ) : (
                  <FiPlus className='w-8 h-8 bg-white rounded-full p-1' />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList
