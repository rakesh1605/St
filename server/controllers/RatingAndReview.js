const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const { default: mongoose } = require("mongoose");
const User=require('../models/User');
//create rating
exports.createRating=async (req,res)=>{
  try {
     //get userid
  const userId=req.user.id;
  //fetch
  const {rating,review,courseId}=req.body;
  //validation check user is enrolled or not
  const courseDetails=await Course.findOne({
    _id:courseId,
    studentsEnrolled: {$elemMatch: {$eq: userId}},

  });
  if(!courseDetails){
    return res.status(404).json({
      success:false,
      message:"Student is not enrolled in thid course"
    })
  }
  //check user already reviwed the course
  const alreadyReviewed=await RatingAndReview.findOne({
    user:userId,
    course:courseId,
  });
  if(alreadyReviewed){
    return res.status(403).json({
      success:false,
      message:"student already reviwed this course",
    })
  }
  //create rating andreview
  const ratingReview=await RatingAndReview.create({
    rating, review,
    course:courseId,
    user:userId,
  });
  //update the course with this rating review
 const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},{
    $push:{
      ratingAndReviews: ratingReview,
    }
  },{new:true});
  console.log(updatedCourseDetails);
  //return response
  return res.status(200).json({
    success:true,
    message:"Rating review crated successfully",
    ratingReview
  })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
 
 
}
// get avg rating
exports.getAverageRating=async (req,res)=>{
  try {
    //get course id
    const courseId=req.body.courseId;
    //calculate avg rating
    const result=await RatingAndReview.aggregate([
      {
        $match:{
          course: new mongoose.Types.ObjectId(courseId),
        }
      },
      {
        $group:{
          _id:null,
          averageRating: {$avg :"$rating"},
        }
      }
    ])
    if(result.length>0){
      return res.status(200).json({
        success:true,
        averageRating: result[0].averageRating,
      })
    }
    //if no result
    return res.status(200).json({
      success:true,
      message:"average rating is zero, no ratings till now",
      averageRating:0,
    })
    //return response
    
  } catch (error) {
    console.log(error);
    return res.status(500).jspn({
      success:false,
      message:"Error in geting avg rating"
    })
    
  }
}
//get all rating
exports.getAllRating=async (req,res)=>{
  try {
    const allReviews=await RatingAndReview.find({}).sort({rating:"desc"}).populate({
      path:"user",
      select:"firstName lastName email image"
    })
    .populate({
      path:"course",
      select:"courseName",
    }).exec();
    console.log("all reviwes",allReviews);
    return res.status(200).json({
      success:true,
      message:"All rating review fetched successfully",
      allReviews
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Eror in gettin al ratingreview details"
    })
    
  }
}