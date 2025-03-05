const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const ownerController = require('../controllers/owner.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer');
const uploadController = require('../controllers/upload.controller');


const env = process.env.NODE_ENV || 'development';
console.log(`Environment: ${env}`);

console.log(`Current Environment in owner.routes.js: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development') {
    router.post('/create', [
        body('fullname.firstname').isLength({min: 3}).withMessage('First name must be atleast 3 characters long'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    ], ownerController.createOwner);
}

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
], ownerController.loginOwner);

router.get('/profile',authMiddleware.authOwner, ownerController.getOwnerProfile);

router.get('/logout',authMiddleware.authOwner, ownerController.logoutOwner);

router.post('/createproduct', upload.single('image'), uploadController.uploadFile);


module.exports = router;