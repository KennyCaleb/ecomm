const asyncHandler = require("express-async-handler");
const Carts = require("../model/cartsModel");


const addToCart = asyncHandler(async(req, res)=>{
    const {productId, qty} = req.body
    const userId = req.user._id

    console.log(userId)
    console.log(productId)

    if(!userId || !productId || !qty){
        return res.status(400).send({msg:"some fields missing"})
    }

    const addedToCart = await Carts.create({userId, productId, qty})
    if(!addedToCart){
        return res.status(500).send({ msg: "Internal Server Error : product not added to cart" });
    }

    res.status(200).json({ msg: "product added to cart", addedToCart });

})

const getCarts = asyncHandler(async (req, res) => {

    const userId = req.user._id
    const userCart = await Carts.find({userId:userId})

    if(!userCart){
        return res.status(500).send({ msg: "Internal Server Error : cannot get cart" });
    }

    res.status(200).json({ msg: "user cart", cart:userCart });
});

const updateCartProduct = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const productId = req.params.id
    const {qty} = req.body

    if(qty<1){
        return res.status(400).send({ msg: "Invalid cart item qty" });
    }

    const updatedCartItem = await Carts.findOneAndUpdate({userId:userId, productId:productId}, {qty:qty}, {new:true, runValidators:true})

     if(!updatedCartItem){
        return res.status(500).send({ msg: "Internal Server Error : cart item not updated" });
    }

    res.status(200).json({ msg: "cart item updated", updatedCartItem:updatedCartItem });
});

const deleteCartProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id
    const userId = req.user._id

    const removedCartItem = await Carts.findOneAndDelete({userId, productId})
    if(!removedCartItem){
        return res.status(500).send({ msg: "Internal Server Error : item not removed from cart" });
    }

    res.status(200).json({ msg: "item removed from cart", removedCartItem });
});


module.exports = { addToCart, getCarts, updateCartProduct, deleteCartProduct };