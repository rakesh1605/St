import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Copy, BookOpen, Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchGenCourseDetails } from "../../../../services/operations/courseDetailsAPI";

const CourseReady = () => {
  const courseUrl = "http://localhost:3006";
  const [copied, setCopied] = useState(false);
  const urlRef = useRef(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (id && token) {
      getCourseDetails(id);
    }
  }, [id, token]);

  const getCourseDetails = async (id) => {
    const result = await fetchGenCourseDetails(id, token);
    if (result) {
      setCourse(result);
    }
  };

  useEffect(() => {
    if (course) {
      try {
        const parsedCourseData = JSON.parse(course.courseOutput);
        setCourseData(parsedCourseData);
      } catch (error) {
        console.error("Error parsing course data", error);
      }
    }
  }, [course]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${courseUrl}/view/course/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <h2 className="text-2xl font-bold text-blue-300 text-center w-full">
        Your Course is Ready
      </h2>

      <div className="bg-richblack-400 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-3xl w-full">
        {/* Course Details */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-richblack-50">
              {courseData ? courseData.courseName : "Loading..."}
            </h1>
            <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          </div>
          <p className="text-gray-400">
            {courseData ? courseData.description : "Loading description..."}
          </p>
          <div className="flex items-center text-blue-700 font-semibold text-sm gap-2">
            <BookOpen className="w-5 h-5" />
            {courseData ? courseData.category : "Loading category..."}
          </div>
          <button className="bg-blue-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Start
          </button>
        </div>

        {/* Course Icon */}
        <div className="w-32 h-32 bg-richblack-300 rounded-sm flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-gray-400" />
        </div>
      </div>

      {/* Copy Course URL Section */}
      <div className="mt-6 w-full max-w-3xl">
        <p className="text-richblack-200 font-semibold">Course URL:</p>
        <div className="flex items-center gap-2 mt-2 bg-richblack-400 p-2 rounded-lg border border-gray-300">
          <input
            ref={urlRef}
            type="text"
            value={`${courseUrl}/view/course/${id}`}
            readOnly
            className="w-full bg-transparent text-richblack-100 outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-200 hover:bg-purple-700 text-white p-2 rounded-lg flex items-center gap-1"
          >
            <Copy size={16} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseReady;
