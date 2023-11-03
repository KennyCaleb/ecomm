const asyncHandler = require("express-async-handler")
const Customers = require("../model/customersModel")
const bcrypt = require("bcryptjs")
const {generateToken} = require("../utils/token")


// @deregister customer
const registerCustomer=asyncHandler(async(req, res)=>{

    const {fullName, email, phoneNumber,address, state, password} = req.body

    if(!fullName || !email || !phoneNumber || !address || !state || !password){
        return res.status(400).send({msg:"some fields missing"})
    }

    const isEmailExist = await Customers.findOne({email})

    if(isEmailExist){
        return res.status(400).send({ msg: "email already used" });
    }

    const regex = /^(080|070|090)[0-9]{6}([0-9]{2})?$/;
    if (!regex.test(phoneNumber)) {
      return res.status(400).send({ msg: "invalid phone number" });
    }

    const isPasswordStrong = password.length >= 5
    if(!isPasswordStrong){
        return res.status(400).send({ msg: "password too weak, min is 5 characters"});
    }

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    try{
        const createCustomer = await Customers.create({fullName, email, phoneNumber,address, state, password:hashedPassword})

        const customer = {
          fullName,
          email,
          phoneNumber,
          address,
          state,
          accessToken: generateToken(createCustomer._id).accessToken,
        };

        return res.status(200).send({ msg: "customer created", customer : customer });
    }
    catch(err){
        return res.status(400).send({ msg: "Internal Server Error :", err });
    }


})

// login customer
const loginCustomer = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
         return res.status(400).send({ msg: "some fields missing"});
    }
    
    const isEmailExist = await Customers.findOne({ email });    
        
    if (isEmailExist && (await bcrypt.compare(password, isEmailExist.password))){
        return res.status(200).send({ msg: "successfully logged in", accessToken:generateToken(isEmailExist._id).accessToken});
    }

    return res.status(403).send({ msg: "invalid credentials"});
});

// get customers
const getCustomers = asyncHandler(async (req, res) => {

    const role = req.user.role
    if (!role || role != "admin") {
      return res.status(400).send({ msg: "not authorised" });
    }

    const customers = await Customers.find().select("-password")
    if(!customers){
        return res.status(500).send({ msg: "internal server error, customers not deleivered"});
    }

    return res.status(200).send({ msg: "customers", customers});
});

// get customer
const getCustomer = asyncHandler(async (req, res) => {
    
    const getCustomer = await Customers.findById(req.user._id)
    res.send(getCustomer)

});

// update customer
const updateCustomer = asyncHandler(async (req, res) => {
    
    const updatedCustomer = await Customers.findOneAndUpdate({_id:req.user._id}, req.body, {new:true, runValidators:true})
    if(!updatedCustomer){
        return res.status(500).send({msg:"internal server error, cannot update customer"})
    }

    return res.status(200).send({msg:"customer updated", updatedCustomer})

});

// delete customer
const deleteCustomer = asyncHandler(async (req, res) => {
    const role = req.user.role
    if(!role || role!="admin"){
        return res.status(400).send({msg:"not authorised"})
    }

    const deletedUser = await Customers.findOneAndDelete(req.user._id)
    if(!deletedUser){
        return res.status(500).send({ msg: "internal server error, user not deleted"});
    }

    return res.status(200).send({ msg: "deleted", deletedUser });
});




module.exports = {registerCustomer, loginCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer}