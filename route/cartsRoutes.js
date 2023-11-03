const express = require("express")
const router = express.Router()
const {authenticate} = require("../middlewares/auth") 
const {addToCart, getCarts, updateCartProduct, deleteCartProduct} = require("../controllers/cartsController")

router.post("/", authenticate, addToCart)
router.get("/me", authenticate, getCarts);
router.put("/:id", authenticate, updateCartProduct);
router.delete("/:id", authenticate, deleteCartProduct);

module.exports = router