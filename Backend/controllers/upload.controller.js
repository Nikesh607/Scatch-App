const productModel = require("../models/product.model");

module.exports.uploadFile = async (req, res) =>{
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }
    
    const {name,price,discount,bgcolor,panelcolor,textcolor,} = req.body;
    const imageUrl = req.file.path;

    try {
        const products = await productModel.create({
            productname : name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: imageUrl,
        })
        res.status(200).json({products});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
