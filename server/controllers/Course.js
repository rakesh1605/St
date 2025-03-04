//create course
//fetch
const Course=require("../models/Course");
const Tag=require("../models/Category");
const User=require("../models/User");
const Section=require("../models/Section")
const SubSection=require("../models/SubSection")
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const Category = require("../models/Category");
const CourseProgress=require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
//create course handler function
exports.createCourse=async (req,res)=>{
  try {
    //fetch data
    const {courseName,courseDescription,whatYouWillLearn,price,category,tag,status}=req.body;
    //get thumbnail
    const thumbnail=req.files.thumbnail;
    console.log("IMAGE IS",req.body);
    //validtion
    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category ||!tag ||!status){
      return res.status(400).json({
        success:false,
        message:'All fields are required'
      });
    }
    //check for instructor
    const userId=req.user.id;
    const instructerDetails=await User.findById(userId);
    console.log("instructor Details",instructerDetails);
    if(!instructerDetails){
      return res.status(404).json({
        success:false,
        message:'Instructor Details not found',
      });
    }
    //check given tag is valid or not //doubt why findbyid
    const categoryDetails=await Category.findById(category);
    if(!categoryDetails){
      return res.status(404).json({
        success:false,
        message:'Category Details not found',
      });

    }

    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    //create an entry for new course
    const newCourse=await Course.create({
      courseName,
      courseDescription,
      instructor: instructerDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail:thumbnailImage.secure_url,
      tag,
      status
    })
    //add the course to the instructer schema here we consider user as a instructer not as a student 
    await User.findByIdAndUpdate({
      _id: instructerDetails._id
    },{
      $push:{
        courses: newCourse._id,
      }
    },
  {new: true},);
  //update the tag schema //home work
  await Category.findByIdAndUpdate({
    _id: categoryDetails._id
  },{
    $push:{
      course: newCourse._id
    }
  },{new: true});
  //return response
  return res.status(200).json({
    success:true,
    message:"Course Created Successfully",
    data:newCourse,
  });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to create the course",
      error:error.message,
    })
    
  }
};
//getallCoursess
exports.showAllCourses=async (req,res)=>{
  try {
    const allCourses=await Course.find({},{
      courseName:true,
      price:true,
      thumbnail:true,
      instructor:true,
      ratingAndReviews:true,
      studentsEnrolled:true,
    }).populate("instructor").exec();
    return res.status(200).json({
      success:true,
      message:"Data for all courses fetched successfully",
      data:allCourses,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"cant fetch courses",
      error:error.message,
    })
    
  }
}
//get course details
exports.getCourseDetails=async(req,res)=>{
  try {
    //get id
    const {courseId}=req.body;
    //find course details
    let courseDetails= await Course.find({
      _id:courseId
    }).populate(
      {
        path:"instructor",
        populate:{
          path:"additionalDetails",
        }
      }
    )
    .populate("category")
    // .populate('ratingAndReviews')
     .populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
     })  .exec();
    //  console.log(courseDetails[0].courseContent);
     //validation
     if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with this ${courseId}`
      })
     }
     let totalDurationInSeconds = 0
    courseDetails[0].courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    // courseDetails[totalDuration] = totalDuration;
    // console.log(typeof(courseDetails))
  
  //  courseDetails = Object.assign(courseDetailsResponse)
  //  console.log("Hello",courseDetails.totalDuration)

   // console.log(courseDetails.totalDuration);
     return res.status(200).json({
      success:true,
      message:"Course details fetched successfully",
      data:
        {courseDetails, 
        totalDuration}
     })  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
    })
    
  }
}
exports.editCourse = async (req, res) => {
  try {
    const courseId= req.body.courseId;
    console.log("COURSE ID:",courseId);
    
    const updates = req.body;
    console.log("updates:",updates);

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
exports.getFullCourseDetails = async (req, res) => {
  try {
  
    const {courseId}=req.query;
    console.log("COURSE ID ON BACKEND:\n",courseId);
    const userId = req.user.id
    console.log("user id", req.user.id)
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,

    })
  }
}
