import {React,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../config/axios.config'

const Productpage = () => {

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);

    const params = useParams()
    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const { data } = await axiosInstance.get(`/products/${params.product_id}`)
                setProduct(data)
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        fetchproduct()
    }, [params.product_id])

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };


    return (
        <div>
            <div className="bg-gray-100 min-h-screen">

                {/* Product Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Product Images */}
                        <div className="md:w-1/2">
                            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                                <img
                                    src={product.image}
                                    alt="Premium Backpack"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="bg-white p-2 rounded-md shadow-sm cursor-pointer">
                                        <img
                                            src={product.image}
                                            alt={`Thumbnail ${num}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.productname}</h1>
                            <p className="text-xl font-semibold text-gray-800 mb-4">₹ {product.price}</p>

                            <div className="text-gray-600 mb-6">
                                <p className="mb-3">
                                    The {product.productname} combines style and functionality with its durable construction and thoughtfully designed compartments. Perfect for daily commutes, weekend trips, or outdoor adventures, this versatile backpack offers comfort, convenience, and reliability for all your carrying needs.
                                </p>

                                <div className="mt-4">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Waterproof exterior fabric</li>
                                        <li>Ergonomic padded shoulder straps</li>
                                        <li>Laptop compartment (fits up to 15.6")</li>
                                        <li>Multiple interior pockets for organization</li>
                                        <li>Side water bottle pockets</li>
                                        <li>Front quick-access pocket with buckle closure</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="font-medium text-gray-800 mb-2">Available Colors:</p>
                                <div className="flex space-x-3">
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 bg-gradient-to-br from-blue-600 to-yellow-500"></div>
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 bg-gradient-to-br from-red-600 to-gray-900"></div>
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 bg-yellow-400"></div>
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 bg-green-600"></div>
                                </div>
                            </div>

                            {/* Add to Cart Section */}
                            <div className="flex items-center mt-6">
                                <div className="flex items-center border border-gray-300 rounded mr-4">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center bg-white text-gray-600"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-12 h-10 text-center border-x border-gray-300"
                                    />
                                    <button
                                        onClick={increaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center bg-white text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>

                                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Similar Products */}
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">You May Also Like</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {[
                                { name: "Green Bag", price: "₹ 1500" },
                                { name: "Red Bag", price: "₹ 2000" },
                                { name: "Yellow Bag", price: "₹ 1000" },
                                { name: "Cotton Bag", price: "₹ 1500" }
                            ].map((product, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <img
                                        src="/api/placeholder/180/180"
                                        alt={product.name}
                                        className="w-full h-40 object-contain mb-3"
                                    />
                                    <h3 className="text-gray-800 font-medium">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-semibold text-gray-800">{product.price}</p>
                                        <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productpage
