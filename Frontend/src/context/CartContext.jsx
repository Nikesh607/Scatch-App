import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../config/axios.config';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Helper function to get the token from localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    // Helper function to check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now(); // Check if token is expired
        } catch (e) {
            return true; // Assume token is invalid if decoding fails
        }
    };

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const token = getToken();
            if (!token || isTokenExpired(token)) {
                setCartItems([]);
                navigate('/login');
                return;
            }

            const { data } = await axiosInstance.get('/users/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(data || []);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
            }
            console.error('Failed to fetch cart:', error);
            setError('Failed to fetch cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (product) => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            console.log(token)
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
                throw new Error('Authentication required');
            }

            const response = await axiosInstance.post(
                '/users/cart',
                { productId: product._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setCartItems(response.data);
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add to cart';
            setError(errorMessage);
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
                throw new Error('Authentication required');
            }

            await axiosInstance.delete(`/users/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update cart items after removal
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to remove item from cart';
            setError(errorMessage);
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Clear the entire cart
    const clearCart = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
                throw new Error('Authentication required');
            }

            await axiosInstance.delete('/users/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update cart items after clearing
            setCartItems([]);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to clear cart';
            setError(errorMessage);
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Update item quantity in cart
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative quantities

        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
                throw new Error('Authentication required');
            }

            const response = await axiosInstance.put(
                `/users/cart/${productId}`,
                { quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item._id === productId ? { ...item, quantity: newQuantity } : item
                    )
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update quantity';
            setError(errorMessage);
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Remove expired token
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch cart items on mount
    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
            fetchCartItems();
        } else {
            setLoading(false);
        }
    }, [navigate]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                loading,
                error,
                fetchCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);