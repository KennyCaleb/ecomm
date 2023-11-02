const express = require("express")
const router = express.Router()
const {registerCustomer, loginCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer} = require("../controllers/customersController")
  
router.post("/", registerCustomer)
router.post("/login", loginCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router