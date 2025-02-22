

const GenerateCourse=require('../models/GenerateCourse')
const User=require("../models/User");
exports.createGenCourse = async (req, res) => {

  try {
    console.log("data inside controller is",req.body);
    const { name, level, category, courseOutput,courseId } = req.body;

    // Validate required fields
    
    const userId=req.user.id;
    const UserDetails=await User.findById(userId);
    console.log("userdetails is",UserDetails);
    const userName=UserDetails.firstName;
    const createdBy=UserDetails.email
    if (!name || !level || !category || !courseOutput || !courseId ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newCourse = new GenerateCourse({
      courseId,
      name,
      level,
      category,
      courseOutput,
      userName,
      createdBy
     
       // Stored as JSON
      
      
    });

   const result= await newCourse.save();

    return res.status(200).json({
      success:true,
      message:"Course Created Successfully",
      data:result,
    });
  
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Failed to create the course",
        error:error.message,
      })
}
}
exports.getGenCourseDetails=async(req,res)=>{
  try {
    //get id
   
    const {id}=req.body;
    console.log("req body",req.body);
    //find course details
    console.log("course id",id)
    const courseDetails= await GenerateCourse.findById(id)
    
     if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with this ${id}`
      })
     }
     console.log("course details",courseDetails);
     return res.status(200).json({
      success:true,
      message:"Course details fetched successfully",
      data:courseDetails,
     })  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}
exports.getGenCourseDetailsbyemail=async(req,res)=>{
  try {
    //get id
    const {email}=req.body;
    //find course details
    //console.log("course id",id)
    const courseDetails= await GenerateCourse.find({
      createdBy:email
    })
    console.log("inside backend",courseDetails);
    
     if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with this ${email}`
      })
     }
     console.log("course details",courseDetails);
     return res.status(200).json({
      success:true,
      message:"Course details fetched successfully",
      data:courseDetails,
     })  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}