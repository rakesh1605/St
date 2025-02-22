const mongoose=require("mongoose");

const genChapterSchema = new mongoose.Schema({
  courseId:{
    type:String,
    required:true
  },
  chapterId: {
    type: Number,
    required: true
  },
 
  content: {
    type: mongoose.Schema.Types.Mixed, // Allows storing JSON data
    required: true
  },
  
 
  videoId: {
    type: String
  }
}, { timestamps: true });

module.exports=mongoose.model("GenerateChapter",genChapterSchema);
