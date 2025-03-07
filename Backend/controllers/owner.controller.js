const ownerModel = require('../models/owner.model');
const ownerServices = require('../services/owner.services');
const { validationResult } = require('express-validator');
const blacklistToken = require('../models/blacklistToken.model');



module.exports.createOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const owners = await ownerModel.find()
    if (owners.length > 0) {
        res.status(400).json({ message: 'Unautherized' });
    }
    const { fullname, email, password, gstin } = req.body;
    const hashPassword = await ownerModel.hashPassword(password);
    const owner = await ownerServices.createOwner({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        gstin
    });
    res.status(201).json({ owner });
}

module.exports.loginOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const owner = await ownerModel.findOne({ email }).select('+password');

    if (!owner) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await owner.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = owner.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS connections
        sameSite: 'none', // Critical for cross-site cookies
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

    res.status(200).json({ token, owner });
}

module.exports.getOwnerProfile = async (req, res) => {
    res.status(200).json(req.owner);
}

module.exports.logoutOwner = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}
