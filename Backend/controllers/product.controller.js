const productmodel =require("../models/product.model");




module.exports.getAllProducts = async (req, res) => {
    try{
        const products = await productmodel.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports.getProduct = async (req, res) => {
    const {product_id} = req.params
    try{
        const product = await productmodel.findById(product_id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}