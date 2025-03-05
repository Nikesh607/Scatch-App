const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ownerSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenght:[3, 'firstname must be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlenght:[3, 'lastname must be atleast 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    gstin:{
        type:String,
    }
});
ownerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

ownerSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

ownerSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


module.exports = mongoose.model('owner', ownerSchema);