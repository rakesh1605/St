const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
 courseName:{
  type:String,
  required:true,

 },
 courseDescription:{
  type:String,
  required:true,
 },
 instructor:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
 },
 whatYouWillLearn:{
  type:String,
 },
 courseContent:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }
 ],
 ratingAndReviews:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
  }
 ],
 price:{
  type:Number,
 },
 thumbnail:{
  type:String,
 },
 category:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Category"
 },
 tag: {
  type: [], // Array of strings
  required: true, // Optional: Ensures the field is required
},
 studentsEnrolled:[{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"User",
 }],
 instructions:{
  type:[String],
 },
 status:{
  type: String,
  enum: ["Draft","Published"],
 },
 createdAt:{
  type:Date,
  default:Date.now(),
  required:true,
},


 

});
module.exports=mongoose.model("Course",courseSchema);