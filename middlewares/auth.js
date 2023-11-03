const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const Staffs = require("../model/staffsModel");
const Customers = require("../model/customersModel")

const authenticate = async(req, res, next)=>{
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
          //get token
          token = req.headers.authorization.split(" ")[1];
          
          // verify token
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

          // create custome user property in req obj
          let user = await Customers.findById(decoded.id).select("-password")
          if(!user){
            user = await Staffs.findById(decoded.id).select("-password");
          }
          if(!user){
            return res.status.send({msg:"user does not exist"})
          }
          
          req.user = user

          next()
        }
        catch(err){
            return res.status(403).send({ msg: "not authorised" });
        }
    }
    
    if(!token){
      return res.status(403).send({ msg: "not authorised, no token" });
    }

}


module.exports = {authenticate}