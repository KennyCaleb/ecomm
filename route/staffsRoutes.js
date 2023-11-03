const express = require("express")
const router = express.Router()
const {registerStaff, loginStaff, getStaffs, getStaff, updateStaff, deleteStaff} = require("../controllers/staffsController")
const {authenticate} = require("../middlewares/auth")  

router.post("/", registerStaff)
router.post("/login", loginStaff);
router.get("/", authenticate,getStaffs);
router.get("/me", authenticate, getStaff);
router.put("/me", authenticate, updateStaff);
router.delete("/me", authenticate, deleteStaff);

module.exports = router