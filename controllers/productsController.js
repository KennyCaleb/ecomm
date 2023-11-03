const asyncHandler = require("express-async-handler");
const Products = require("../model/productsModel");


const addProduct = asyncHandler(async (req, res) => {

    if(req.user.role != "admin"){
        return res.status(403).send({ msg: "not authorized" });
    }

    const {productTitle, price, category, shippingFee, images} = req.body

    if (!productTitle || !price || !category || !shippingFee || !images || images.length<1) {
      return res.status(400).send({ msg: "some fields missing" });
    }


    if(price < 0){
        return res.status(400).send({ msg: "invalid product price" });
    }

    const addProduct = await Products.create({productTitle, price, category, shippingFee, images})
    if(!addProduct){
        return res.status(500).send({ msg: "Internal Server Error : cannot add product" });
    }

    res.status(200).json({ msg: "product added", product:addProduct });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()

    if(!products){
        return res.status(500).send({ msg: "Internal Server Error : cannot fetch products"});
    }

    res.status(200).json({msg:"all products", products})
});

const getProduct = asyncHandler(async (req, res) => {
    const {id} = req.params
    const product = await Products.findById(id)
    if(!product){
        return res.status(500).send({ msg: "Internal Server Error : cannot fetch product"});
    }

    res.status(200).json({ msg: `product - ${product._id}`, product });
});

const updateProduct = asyncHandler(async (req, res) => {
    if (req.user.role != "admin") {
      return res.status(403).send({ msg: "not authorized" });
    }

    const {id} = req.params

    const updatedProduct = await Products.findOneAndUpdate({_id:id}, req.body, {new:true, runValidators:true})

    if(!updatedProduct){
        return res.status(500).send({ msg: "Internal Server Error : product not updated"});
    }

    res.status(200).json({ msg: "product updated", updatedProduct });
    
});

const deleteProduct = asyncHandler(async (req, res) => {
     if (req.user.role != "admin") {
      return res.status(403).send({ msg: "not authorized" });
    }

    const {id} = req.params

    const deletedProduct = await Products.findOneAndDelete({_id:id})

    if(!deletedProduct){
        return res.status(500).send({ msg: "Internal Server Error : product not deleted"});
    }

    res.status(200).json({ msg: "product deleted", deletedProduct: deletedProduct });
});

module.exports = {addProduct, getProducts, getProduct, updateProduct, deleteProduct}