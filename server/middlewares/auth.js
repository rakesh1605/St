const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");
const { request } = require("express");
exports.auth=async(req,res,next)=>{
  
  try {
    //extract token
    const token = 
  req.cookies.token || 
  req.body.token || 
  req.headers["authorization"]?.replace("Bearer ", "");
    //if token missing then return response
    
   
   console.log("jwt secret is",process.env.JWT_SECRET)
   console.log("inside auth middleware and token is",token);

    if(!token){
      return res.status(401).json({
        success:false,
        message:'Token is missing',
      })
    }
    //verify the token
    try {
      const decode=await jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      req.user=decode;

      
    } catch (error) {
      
    return res.status(401).json({
      success:false,
      message:"token is invalid",
       error: error,
    }

    )
      
    }
    next();
    
  } catch (error) {
    return res.status(401).json({
      success:false,
      message:'Some thing went wrong while validation the token',
       request: `Token is${req.headers}`
    })
    
  }
}




//student
exports.isStudent =async (req,res,next) =>{
  try {
    if(req.user.accountType!=="Student"){

      return res.status(401).json({
        success:false,
        message:'this isa protected route for Student only'
      })
    }
    next();
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User role not verified,something went wrong"
    })
    
  }
}
//instructer
exports.isInstructor =async (req,res,next) =>{
  try {
    if(req.user.accountType!=="Instructor"){

      return res.status(401).json({
        success:false,
        message:'this isa protected route for instructor only'
      })
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User role not verified,something went wrong"
    })
    
  }
}
//admin
exports.isAdmin =async (req,res,next) =>{
  try {
    console.log("inside isAdmin middleware")
    if(req.user.accountType!=="Admin"){

      return res.status(401).json({
        success:false,
        message:'this isa protected route for Admin only'
      })
    }
    next();
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User role not verified,something went wrong"
    })
    
  }
}