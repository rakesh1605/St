const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,//doubt
  },
  lastName:{
    type:String,
    required:true,
    trim:true,//doubt
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
    
  },
  accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true,

  },
  additionalDetails:{
type:mongoose.Schema.Types.ObjectId,

ref:"Profile",
  }
  ,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  
  courseProgress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CourseProgress",
  },
  image:{
    type:String,
   
  },token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },


});
module.exports=mongoose.model("User",userSchema);