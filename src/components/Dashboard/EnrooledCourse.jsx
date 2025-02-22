import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import  {fetchGenCourseDetailsbyemail} from '../../services/operations/courseDetailsAPI';
const EnrooledCourse = () => {
  const courseUrl = "http://localhost:3006"
  const {token}=useSelector((state)=>state.auth);
  const data=useSelector((state)=>state.viewCourse)
  const [enrolledCourses,setEnrolledCourses]=useState(null);
  const [gencourses,setGenCourses]=useState(null);
 const {user}=useSelector((state)=>state.profile);
  const navigate=useNavigate()
  const getEnrolledCourses=async()=>{
    try {
      const response=await getUserEnrolledCourses(token);
      // console.log("response of enrolled course",response);
      setEnrolledCourses(response);
      
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses")
      
    }
  }
  const getEnrolledCoursesbyemail=async()=>{
    try {
      console.log('inside email gen',user,token);
      

      const response=await fetchGenCourseDetailsbyemail(user.email,token);
      console.log("response of generate course",response);
      setGenCourses(response);
  
    } catch (error) {
      console.log("Unable to fetch generate Courses")
      
    }
  }
  useEffect(()=>{
    console.log("gen course",gencourses)
  },[gencourses])
  
  
  console.log("view",data);
  useEffect(()=>{
    getEnrolledCourses();
    
  },[])
  useEffect(()=>{
    getEnrolledCoursesbyemail();
  },[])
  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                  console.log(course);
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
       <div className="text-3xl text-richblack-50">Generated Courses</div>
       {gencourses && gencourses.length > 0 ? (
  <div className="my-8 text-richblack-5">
    <div className="flex rounded-t-lg bg-richblack-500 ">
      <p className="w-[45%] px-5 py-3">Course Name</p>
      <p className="w-1/4 px-2 py-3">Level</p>
      <p className="flex-1 px-2 py-3">Category</p>
    </div>
    {gencourses.map((gencourse, i, arr) => (
      <div
        className={`flex items-center border border-richblack-700 ${
          i === arr.length - 1 ? 'rounded-b-lg' : 'rounded-none cursor-pointer'
        }`}
        key={i}
        onClick={() => {
          navigate(
            `/view/course/${gencourse._id}`
          )
        }
        
      }
      >
        <div className="w-[45%] px-5 py-3">{gencourse.name}</div>
        <div className="w-1/4 px-2 py-3">{gencourse.level}</div>
        <div className="flex-1 px-2 py-3">{gencourse.category}</div>
      </div>
    ))}
  </div>
) : (
  <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
    No generated courses available.
  </p>
)}

       

    </>
  )
}

export default EnrooledCourse
