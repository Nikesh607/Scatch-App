const userModel = require('../models/user.model');
const Product = require('../models/product.model')
const userServices = require('../services/user.services');
const {validationResult} = require('express-validator');
const blacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, contact} = req.body;
    const hashPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        contact
    });
    const token = user.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS connections
        sameSite: 'none', // Critical for cross-site cookies
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
    res.status(201).json({token, user}); 
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS connections
        sameSite: 'none', // Critical for cross-site cookies
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

    res.status(200).json({token, user});
}

module.exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Check if user exists and is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingItemIndex = user.cart.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if product exists
            user.cart[existingItemIndex].quantity += 1;
        } else {
            // Add new product to cart
            user.cart.push({ productId, quantity: 1 });
        }

        await user.save();
        // Populate cart items with product details
        await user.populate('cart.productId');
        // Return formatted cart items
        const cartItems = user.cart.map(item => ({
            _id: item.productId._id,
            productname: item.productId.productname,
            price: item.productId.price,
            discount: item.productId.discount,
            image: item.productId.image,
            quantity: item.quantity
        }));

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(400).json({ message: 'Failed to add to cart' });
    }
};

module.exports.getUserCart = async (req, res) => {
    try {
        // Check if user exists and is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await userModel
            .findById(req.user._id)
            .populate('cart.productId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = user.cart.map(item => ({
            _id: item.productId._id,
            productname: item.productId.productname,
            price: item.productId.price,
            discount: item.productId.discount,
            image: item.productId.image,
            quantity: item.quantity
        }));

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(400).json({ message: 'Failed to fetch cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params
        const user = await userModel.findById(req.user._id)
        
        user.cart = user.cart.filter(item => 
            item.productId.toString() !== productId
        )
        
        await user.save()
        res.status(200).json({ message: 'Item removed from cart' })
    } catch (error) {
        res.status(400).json({ message: 'Failed to remove item from cart' })
    }
}

exports.updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params
        const { quantity } = req.body
        
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' })
        }

        const user = await userModel.findById(req.user._id)
        const cartItem = user.cart.find(item => 
            item.productId.toString() === productId
        )
        
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        cartItem.quantity = quantity
        await user.save()
        res.status(200).json(user.cart)
    } catch (error) {
        res.status(400).json({ message: 'Failed to update quantity' })
    }
}

module.exports.placeOrder = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.cart.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Store only the product IDs in `orders`
        const productIds = user.cart.map(item => item.productId);

        // Push product IDs to orders
        user.orders.push(...productIds);

        // Clear cart after placing order
        user.cart = [];

        await user.save();

        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};

module.exports.getUserOrders = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.user._id)
            .populate("orders"); // Populate product details

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.orders); // Return full product details
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistToken.create({token});
    res.status(200).json({message: 'Logged out successfully'});
}




