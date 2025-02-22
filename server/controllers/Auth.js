//signup
//login
//sendOTP
//changepassword
const User=require("../models/User");
const OTP=require("../models/OTP");
const otpgenerator=require("otp-generator");
const bcrypt = require("bcryptjs");
const mailSender = require("../utils/mailSender");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
const { passwordUpdated } = require("../mailTemplates/passwordUpdate");


exports.sendOTP=async (req,res) =>{
  try {
    const {email}=req.body;
    // console.log("email is",email)
    //chech user exist or not
    console.log("Request body is",req.body);
    const checkUserexist=await User.findOne({email});
    //if user exist then return response
    if(checkUserexist){
      return res.status(401).json({
        success:false,
        message:"User already exist"
      })
    }
    //generate otp
    var otp=otpgenerator.generate(6,{
      upperCaseAlphabets:false,
      lowerCaseAlphabets:false,
      specialChars:false,
    });
    console.log("OTP GENARATED",otp);
    //check unique otp or not
    const result=await OTP.findOne({otp: otp});
    while(result){
      otp=otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
      });
      result=await OTP.findOne({otp: otp});
    }
    const otpPayload={email,otp};
    //create entry in Db
    console.log("otp in db after it",otpPayload)
    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);
    res.status(200).json({
      success:true,
      message:'OTP sent successfully',
      otp,

    })

    
  } catch (error) {
    console.log("inside otp server",error);
    return res.status(500).json({
      success:false,
      message:"Something wnt wrong in otp generation"
    })
    
  }
 
}
//signup
exports.signUp=async (req,res)=>{
  try {
     //data fetch from request body
    const {firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp
    }=req.body;
    //validate it 
    if(!firstName || !lastName || !email || !password || !confirmPassword){
      return res.status(403).json({
        success:false,
        message:"All fields are required"
      })
    }
    //password match confirm password
    if(password!== confirmPassword){
      return res.status(400).json({
        success:false,
        message:"password not matched"
      })
    }
    
    //check user exist or not
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        success:false,
        message:'User already exist',
      });
    }
    //find most rescent otp stored for the user
    //learn
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    console.log(recentOtp);
  
  
    //validate otp
    if(recentOtp.length==0){
      return res.status(400).json({
        success:false,
        message:"OTP NOT found"
      })
    }else if(otp!==recentOtp[0].otp){
      //Invalid otp
      console.log(otp);
      console.log(recentOtp[0].otp)
      return res.status(400).json({
        success:false,
        message:"Invalid otp",
      });
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    //entry create in db
    const profileDetails=await Profile.create({
      gender:null,
      dateOfBirth:null,
      about:null,
      contactNumber:null,
    });
    const user= await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password:hashedPassword,
      accountType,
      additionalDetails:profileDetails._id,
      image:`https://ui-avatars.com/api/?name=${firstName}${lastName}&background=random&color=ff0000`,
    })
    //return res
    console.log(user);
    return res.status(200).json({
      success:true,
      message:"User successfully registered",
      user,
    })
    
  } catch (error) {
    console.log("Error while creating user or signup",error);
    return res.status(200).json({
      success:false,
      message:"Something went wrong and user not signup",
     
    })
    
  }

 
  

}
//login 
exports.login=async (req,res) =>{
  try {
    //get data from request body
    const {email,password}=req.body;
     //data validation
    if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"All field are reqired ,please try again later"
      });
    }
       
    //user check
    const user= await User.findOne({email}).populate("additionalDetails");
    if(!user){
      return res.status(401).json({
        success:false,
        message:"user already registered"
      })
    }
    //generate token,after password matching
    if(await bcrypt.compare(password,user.password)){
      const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType,

      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",  // Set expiration time to 30 days
      });
      
      user.token=token;
      user.password=undefined;
       //create cookie and send response
    const options={
      expires: new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true,
    }
    res.cookie("token",token,options).status(200).json({
      success:true,
      token,
      user,
      message:"user logged in successfully"
    })
    }
    else{
      return res.status(200).json({
        success:false,
        message:'password is incorrect'
      })
    }
   


    
  } catch (error) {
    console.log("Error in logged in",error);
    return res.status(500).json({
      success:false,
      message:'Login failure,please try again later'
    });
  }
}
exports.changePassword=async(req,res)=>{
 
 
  
  try {
		 
		const userDetails = await User.findById(req.user.id);
    //get data from req body
     //get oldPassword,newPassword,confirmNewPassword
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

    //Validation
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
		
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}


		if (newPassword !== confirmNewPassword) {
		
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

    //Hashing and updating    
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

	
    //Send mail
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}

 
}
