const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getAllDetails", auth,getAllDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);

module.exports = router