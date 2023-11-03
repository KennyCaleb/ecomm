const express = require("express")
const router = express.Router()
const {registerCustomer, loginCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer} = require("../controllers/customersController")
const {authenticate} = require("../middlewares/auth")  

router.post("/", registerCustomer)
router.post("/login", loginCustomer);
router.get("/", authenticate,getCustomers);
router.get("/me", authenticate, getCustomer);
router.put("/me", authenticate, updateCustomer);
router.delete("/me", authenticate, deleteCustomer);

module.exports = router