const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const App = express();
const cors = require('cors');
const path = require('path');
const connecttoDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const ownerRouter = require('./routes/owner.routes');
const productRouter = require('./routes/product.routes');
const cookieParser = require('cookie-parser');

connecttoDB();

App.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,               // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
App.use(express.json());
App.use(express.urlencoded({extended: true}));
App.use(cookieParser());


App.use('/uploads', express.static(path.join(__dirname, 'uploads')));

App.get('/', (req, res) =>{
    res.send('Hello World');
})

App.use('/users', userRouter);
App.use('/owners', ownerRouter);
App.use('/products', productRouter);

module.exports = App;