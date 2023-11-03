const express = require("express")
const router = express.Router()
const {authenticate} = require("../middlewares/auth") 
const {addProduct, getProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/productsController")

router.post("/", authenticate, addProduct)
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router