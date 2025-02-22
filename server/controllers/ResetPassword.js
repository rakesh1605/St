const User=require("../models/User");
const mailSender=require("../utils/mailSender")
const bcrypt = require("bcryptjs");
const crypto=require("crypto");
//reset password token => link generate + mail send
exports.resetPasswordToken =async (req,res)=>{
  
 try {
  //get email from req body
  const email=req.body.email;
  //check user for this email,email validation
  const user=await User.findOne({email: email});
  if(!user){
    return res.json({
      message:'Your email is not registreed with us'
    });
  }
  //generate token
  const token= crypto.randomUUID();
  //UPDATE USER BY ADDINg token and exexpiration time
  const updatedDetails=await User.findOneAndUpdate(
    {email: email},
    { 
      token: token,
      resestPasswordexpires: Date.now()+ 5*60*100,
    },
    {new:true}
  );
  
  //linkgenerate of frontend
  const url= `http://localhost:3006/update-password/${token}`
  //send mail containing url
  await mailSender(email,"password reset Link",`password reset link ${url}`);
  //return response
  return res.json({
    success:true,
    message:"check your mail we have sent the mail",
  })
  
  
 } catch (error) {
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"somethong went wrong while sending pwd mail",
  })
  
 }
}
//reset password newpassword from ui and update in db
exports.resetPassword= async (req,res)=>{
    try {
      //data fetch
      const {password,confirmPassword,token}=req.body;
      //validation
      if(password!==confirmPassword){
        return res.json({
          success:false,
          message:'password not matching'
        });
      }
      //get user details from db using token
      const userDetails=await User.findOne({token: token});
      //if no entry-invalid token
      if(!userDetails){
        return res.json({
          success:false,
          message:'Token is inavlid',
        })
      }
      //token time check
      if(userDetails.resestPasswordexpires<Date.now()){
        return res.json({
          success:false,
          message:'Token is expired,regenerate'
        })
      }
      //hash the password
      const hashedPassword=await bcrypt.hash(password,10);
      //password update
      await User.findOneAndUpdate(
        {token: token},
        {password: hashedPassword},
        {new: true},
      );
        

      
      //return response
      return res.status(200).json({
        success:true,
        message:"password reset successfully"
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:'Something went wrong while reseting password',
      })
      
    }
}