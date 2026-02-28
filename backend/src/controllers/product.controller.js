const Product = require("../models/Product");

// GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

exports.updateStock = async (req,res) =>{
    try{
        const{stock} =req.body
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {stock},
            {new: true}
        )
        res.json(product)
    }catch{error}{
        res.status(500).json({ message: "Error al actualizar el inventario"})
    }
}