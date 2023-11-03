const asyncHandler = require("express-async-handler");
const Staffs = require("../model/staffsModel");
const Customers = require("../model/customersModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const registerStaff=asyncHandler(async(req, res)=>{

    const {fullName, email, phoneNumber,address, state, role,  password} = req.body

    if(!fullName || !email || !phoneNumber || !address || !state || !role || !password){
        return res.status(400).send({msg:"some fields missing"})
    }

    const isEmailExist = await Staffs.findOne({email})

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
        const createCustomer = await Staffs.create({fullName, email, phoneNumber,address, state, role, password:hashedPassword})

        const customer = {
          fullName,
          email,
          phoneNumber,
          address,
          role,
          state,
          accessToken: generateToken(createCustomer._id).accessToken,
        };

        return res.status(200).send({ msg: "customer created", customer : customer });
    }
    catch(err){
        return res.status(400).send({ msg: "Internal Server Error :", err });
    }
})

const loginStaff=async(req, res)=>{
     const {email, password} = req.body

    if(!email || !password) {
         return res.status(400).send({ msg: "some fields missing"});
    }
    
    const isEmailExist = await Staffs.findOne({ email });    
        
    if (isEmailExist && (await bcrypt.compare(password, isEmailExist.password))){
        return res.status(200).send({ msg: "successfully logged in", accessToken:generateToken(isEmailExist._id).accessToken});
    }

    return res.status(403).send({ msg: "invalid credentials"});
}

const getStaffs = asyncHandler(async (req, res) => {});

const getStaff = asyncHandler(async (req, res) => {});

const updateStaff = asyncHandler(async (req, res) => {});

const deleteStaff = asyncHandler(async (req, res) => {});

module.exports = {registerStaff, loginStaff, getStaffs, getStaff, updateStaff, deleteStaff}