const GenerateChapter=require("../models/GerateChapter")
exports.createGenChapter = async (req, res) => {

  try {
    
    const { courseId, content, videoId, chapterId } = req.body;

    // Validate required fields
    
   
   
    if ( !courseId || !content || !chapterId) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
     console.log("courseId",courseId);
    const newCourse = new GenerateChapter({
      courseId,
      content,
      chapterId,
      videoId
      
     
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
exports.getGenChapDetails=async(req,res)=>{
  try {
    //get id
   
    const {id}=req.body;
    const {courseid}=req.body;
    console.log("req body",req.body);
    //find course details
    console.log("course id",id.id)
    const chapterDetails = await GenerateChapter.findOne({
      chapterId: id,
      courseId: courseid,
    });
    
    
     if(!chapterDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the chpter with this ${id}`
      })
     }
     console.log("course details",chapterDetails);
     return res.status(200).json({
      success:true,
      message:"Chapter details fetched successfully",
      data:chapterDetails,
     })  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}