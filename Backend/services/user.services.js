const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname,lastname,email,password,contact}) => {
    if (!firstname || !email || !password || !contact) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        contact
    });
    return user; 
}