const usermodel = require('../models/user.model');
const ownerModel = require('../models/owner.model');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await blacklistToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);
        req.user = user;
        req.token = token;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

}

module.exports.authOwner = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await blacklistToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const owner = await ownerModel.findById(decoded._id);
        req.owner = owner;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

