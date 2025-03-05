const ownerModel = require('../models/owner.model');


module.exports.createOwner = async ({firstname,lastname,email,password,gstin}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const owner = await ownerModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        gstin
    });
    return owner;
}