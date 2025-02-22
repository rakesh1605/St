const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection = require("../models/SubSection");
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			data:updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};
//update section
exports.updateSection = async(req,res)=>{
  try{
    //data input
    const {sectionName,sectionId,courseId}=req.body;
    //data validation
    if(!sectionName || !sectionId){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      })
    }
    const section=await Section.findByIdAndUpdate(sectionId,{
      sectionName:sectionName,
    },{new:true});

    //make course to send
    const course= await Course.findById(courseId).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();
    //update data
    
    //return response
    return res.status(200).json({
      success:true,
      message:section,
      data:course,
    });

  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Unable to update section , please try again",
      error:err.mesage,
    })
  }
}
//delete section
exports.deleteSection = async (req, res) => {
  try {
    // Extract IDs from request body
    const { sectionId, courseId } = req.body;

    // Validate inputs
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Course ID are required",
      });
    }

    // Remove section ID from course's content array
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    console.log("Section ID to delete:", sectionId);

    // Find and delete the section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Delete all subsections linked to the section
    await SubSection.deleteMany({ _id: { $in: deletedSection.subSection } });

    // Fetch updated course data
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log("Updated course:", course);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (err) {
    console.error("Error deleting section:", err);

    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Unable to remove section, please try again",
      error: err.message, // Fixed typo
    });
  }
};
