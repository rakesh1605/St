// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
 
  getCourseDetails,
  showAllCourses,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails
 
  
} = require("../controllers/Course")

const {createGenCourse,getGenCourseDetails,getGenCourseDetailsbyemail}=require("../controllers/GenearateCourse")
const {createGenChapter,getGenChapDetails}=require("../controllers/GenChap")
// Categories Controllers Import
const {
  showallCategory,
  createCatagory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,updateSubSection,
  deleteSubSection
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

// const {
//   updateCourseProgress
// } = require("../controllers/courseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

const {updateCourseProgress}=require("../controllers/courseProgress")
// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/createGenCourse",auth,createGenCourse)
router.post("/getGenCourseDetails",auth,getGenCourseDetails)
router.post("/createGenChapter",auth,createGenChapter)
router.post("/")
router.post("/getGenChapter",auth,getGenChapDetails)
router.post("/getGenCourseEmail",auth,getGenCourseDetailsbyemail)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses

// Edit Course routes
router.post("/editCourse",auth,isInstructor,editCourse);
//delete course
router.post("/deleteCourse",auth,isInstructor,deleteCourse);
// Get all Courses Under a Specific Instructor
//get full course dtelais
router.get("/getFullCourseDetails",auth,getFullCourseDetails);
// Delete a Course
//gedt instructer course
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);

router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCatagory)
router.get("/showAllCategories", showallCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router