const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'), 
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
], userController.loginUser);

router.post('/cart',authMiddleware.authUser, userController.addToCart);
router.get('/cart',authMiddleware.authUser, userController.getUserCart);
router.delete('/cart/:productId', authMiddleware.authUser, userController.removeFromCart)
router.put('/cart/:productId', authMiddleware.authUser, userController.updateCartQuantity)
router.post('/place-order', authMiddleware.authUser, userController.placeOrder);
router.get('/orders', authMiddleware.authUser, userController.getUserOrders);


router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout',authMiddleware.authUser, userController.logoutUser);


module.exports = router;