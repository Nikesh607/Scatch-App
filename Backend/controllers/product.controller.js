const productmodel =require("../models/product.model");




module.exports.getAllProducts = async (req, res) => {
    try{
        const products = await productmodel.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}