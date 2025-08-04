const { default: mongoose } = require("mongoose");
const {instance}=require("../config/Razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mailTemplates/courseEnrollmentEmail");
const {paymentSuccessEmail} =require("../mailTemplates/paymentSuccessEmail");
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");
//capture the payment
exports.capturePayment=async(req,res)=>{
  console.log("inside capture",req.body);
  const courses=req.body;
  const userId=req.user.id;
  console.log("course",courses)

  if(courses.length===0){
    return res.json({
      success:false, 
      message:"Please provide Course Id"
    });
  }
  
  let totalAmount=0;
  
  for (const course_id of Object.values(courses)) {
    const courseIdsArray = course_id.split(','); // Split if it's a comma-separated string
  
    for (const id of courseIdsArray) {
      let course;
      try {
        console.log('Course ID:', id);
        course = await Course.findById(id.trim());
  
        if (!course) {
          return res.status(404).json({
            success: false,
            message: `Could not find course with id: ${id}`,
          });
        }
  
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
          return res.status(200).json({
            success: false,
            message: `Student is already enrolled in course with id: ${id}`,
          });
        }
  
        totalAmount += course.price;
      } catch (error) {
        console.error(`Error finding course with id ${id}:`, error);
        return res.status(500).json({
          success: false,
          message: `Error processing course with id: ${id}`,
          error: error.message,
        });
      }
    }
  }
  
  
  //Creating options to create order
  const options={
    amount:totalAmount*100,
    currency:"INR",
    receipt:Math.random(Date.now()).toString(),
  }


  try{
    const paymentResponse = await instance.orders.create(options);
    return res.json({
      success:true,
      data:paymentResponse
    })
  }
  catch(error){
    console.error("Razorpay Error:", error);
    if (error.response) console.error("Razorpay Response:", error.response.data);
    return res.status(500).json({
      success:false,
      message:"Could not Intitate Order"
    })
  }
}


//verify signature
exports.verifySignature=async(req,res)=>{
  const razorpay_order_id=req.body?.razorpay_order_id;
  const razorpay_payment_id=req.body?.razorpay_payment_id;
  const razorpay_signature=req.body?.razorpay_signature;
  const courses=req.body?.courses;
  const userId=req.user.id;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
    return res.status(404).json({
      success:false,
      message:"Payment failed",
    })
  }

  let body=razorpay_order_id + "|" + razorpay_payment_id;
  console.log("Razorpay Secret:", process.env.Razorpay_SECRET);
 const expectedSignature=crypto.createHmac("sha256",process.env.Razorpay_SECRET).update(body.toString()).digest("hex");
  if(expectedSignature===razorpay_signature){
    //enroll the student

    await enrollStudents(courses,userId,res);
    //return response
    return res.status(200).json({
      success:true,
      message:"Payment Verified",
    })
  }  

  return res.status(200).json({
    success:false,
    message:"Payment Failed"
  })
}

const enrollStudents=async(courses,userId,res)=>{

  //first append user id in all courses
  //then append course id in user's courses
  if(!courses || !userId){
    return res.status(400).json({
      success:false,
      message:"Please Provide data for Courses"
    })
  }

  for(const courseId of Object.values(courses)){
        try{
             const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{
      $push:{
        studentsEnrolled:userId
      }
    },{
      new:true
    });

    if(!enrolledCourse){
      return res.status(500).json({
        success:false,
        message:"Course Not Found"
      })
    }


    const courseProgress=await CourseProgress.create({
      courseID:courseId,
      userId:userId,
      completedVideos:[],
    })



    // find the student and add the course to their list of courses
  const enrolledStudent=await User.findByIdAndUpdate(userId,{
    $push:{
      courses:courseId,
      courseProgress:courseProgress._id,      
    }
  },{new:true});

  //Send mail to the  student

  const emailResponse=await mailSender(
    enrolledStudent.email,
    `Successfully enrolled into ${enrolledCourse.courseName}`,
    courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
  );

  console.log("Email Sent Successfully",emailResponse.response);


        }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }

  }

}

//for sending the mail
exports.sendPaymentSuccessEmail=async(req,res)=>{
  const {orderId,paymentId,amount}=req.body;
  const userId=req.user.id;
  console.log("inside su ccess email",userId)

  if(!orderId || !paymentId || !amount || !userId){
    return res.status(400).json({
      success:false,
      message:"Please provide all the fields"
    })
  } //find student data with the userId
    
  try{
    const enrolledStudent=await User.findById(userId);
    console.log(enrolledStudent);
    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId)

    )
  }

  catch(error){
    console.log("error in sending mail",error);
    return res.status(500).json({
      success:false,
      message:"Could not send email"
    })
  }

}
