const mongoose=require("mongoose");

const genCourseSchema = new mongoose.Schema({
  courseId:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  courseOutput: {
    type: mongoose.Schema.Types.Mixed, // Allows storing JSON data
    required: true
  },
  createdBy: {
    type: String,
    
  },
  userName: {
    type: String,
    
  },
  isVideo: {
type:String,
  },
  userProfileImage: {
    type: String
  },
  courseThumbnail:{
    type:String,
  }
}, { timestamps: true });

module.exports=mongoose.model("GenerateCourse",genCourseSchema);
