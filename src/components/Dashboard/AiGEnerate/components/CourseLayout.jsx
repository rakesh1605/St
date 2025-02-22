import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BookOpen,
  User,
  Layers,
  Clock,
  ListOrdered,
  PlayCircle,
  Edit,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  addGenChapterDetails,
  fetchGenCourseDetails,
} from "../../../../services/operations/courseDetailsAPI";
import { GenerateCourseContent } from "../configs/GenrateContent";
import Service from "../configs/Service";
import LoaderModal from "./Loadermodal";
import { NavLink, useNavigate } from "react-router-dom";
const CourseLayout = () => {
  const { token } = useSelector((state) => state.auth);
  const id = useParams();
  const [loading, setLoading] = useState(false);
  const [oaderModal, setLoaderModal] = useState(false);
  const [course, setCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [editChapter, setEditChapter] = useState(null); // Store the chapter being edited
  const navigate = useNavigate();
  useEffect(() => {
    getCourseDetails(id);
  }, [id]);

  const getCourseDetails = async (id) => {
    const result = await fetchGenCourseDetails(id.id, token);
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

  const openModal = (chapter) => {
    setEditChapter(chapter);
    setIsModalOpen(true); // Open modal when edit icon is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditChapter(null); // Reset the chapter being edited
  };

  const handleChapterUpdate = (updatedChapter) => {
    // Update the courseData with the new chapter data
    const updatedChapters = courseData.chapters.map((chapter) =>
      chapter.chapterName === updatedChapter.chapterName
        ? updatedChapter
        : chapter
    );
    setCourseData({ ...courseData, chapters: updatedChapters });
    closeModal(); // Close modal after update
  };
  const generatecontent = async () => {
    setLoading(true);
    setLoaderModal(true);
  
    const chapters = courseData.chapters;

    for (const [index, chapter] of chapters.entries()) {
      const PROMPT = `Provide a detailed explanation of the topic "${course.name}", focusing on the chapter "${chapter.chapterName}". Return the response strictly as a valid, minified JSON array of objects, each containing fields like title,explanation,keytakeways and code example with output on given chapter in detail . Ensure the JSON is parseable and free of special characters or line breaks.`;



        try {
            const result = await GenerateCourseContent.sendMessage(PROMPT);
            const responseText = await result.response?.text();

            const content = JSON.parse(responseText);

            console.log("content is",typeof content);

            const videoResponse = await Service.getVideos(courseData?.courseName + ":" + chapter.chapterName);
            const videoId = videoResponse.length > 0 ? videoResponse[0]?.id?.videoId : null;

            if (videoId) {
                console.log("YouTube Video ID:", videoId);
            } else {
                console.log("No videos found.");
            }

            await SavetoDb(content, videoId, index);
        } catch (error) {
            console.error("Error processing chapter:", error);
        }
    }

    setLoaderModal(false);
    setLoading(false);

    // Ensure all chapters are saved before navigating
    navigate(`/create-course/${course._id}/finish`);
};

const SavetoDb = async (content, videoId, index) => {
    const formData = new FormData();
    formData.append("courseId", course.courseId);
    formData.append("content", JSON.stringify(content));  // Convert JSON object to string
    formData.append("videoId", videoId || ""); // Handle null case
    formData.append("chapterId", index);

    try {
        const result = await addGenChapterDetails(formData, token);
        if (result) {
            console.log("Chapter created");
        } else {
            console.log("Error saving chapter");
        }
    } catch (error) {
        console.error("Error saving to DB:", error);
    }
};


  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" min-h-screen p-10 text-richblack-100">
      {/* Course Header */}
      <div className="bg-richblack-400 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-richblack-50">
              {courseData.courseName}
            </h1>
            <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          </div>
          <p className="text-gray-400">
            This course is designed for beginners to gain fundamental knowledge
            and skills.
          </p>
          <div className="flex items-center text-blue-700 font-semibold text-sm gap-2">
            <BookOpen className="w-5 h-5" /> {courseData.category}
          </div>
          <button className="bg-blue-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Start
          </button>
        </div>
        <div className="w-32 h-32 bg-richblack-300 rounded-sm flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-gray-400" />
        </div>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 bg-richblack-600 p-6 rounded-2xl shadow-lg">
        <DetailCard
          icon={<Layers />}
          label="Skill Level"
          value={course.level || "N/A"}
        />
        <DetailCard
          icon={<Clock />}
          label="Duration"
          value={courseData.duration || "N/A"}
        />
        <DetailCard
          icon={<ListOrdered />}
          label="No Of Chapters"
          value={courseData.noOfChapters || "N/A"}
        />
        <DetailCard icon={<PlayCircle />} label="Video Included?" value="Yes" />
      </div>

      {/* Course Chapters */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
        <div className="space-y-6">
          {courseData.chapters && courseData.chapters.length > 0 ? (
            courseData.chapters.map((chapter, index) => (
              <ChapterCard
                key={index}
                index={index + 1}
                chapter={chapter}
                onEdit={() => openModal(chapter)} // Pass edit handler to each chapter card
              />
            ))
          ) : (
            <div className="text-gray-400">No chapters available</div>
          )}
        </div>
      </div>

      {/* Modal for Editing Chapter */}
      {isModalOpen && editChapter && (
        <Modal onClose={closeModal}>
          <div className="w-11/12 max-w-[500px] p-6 rounded-lg shadow-lg bg-richblack-800 text-richblack-400">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Edit Chapter
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChapterUpdate(editChapter); // Update chapter on form submit
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-300">Chapter Name</label>
                <input
                  type="text"
                  value={editChapter.chapterName}
                  onChange={(e) =>
                    setEditChapter({
                      ...editChapter,
                      chapterName: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-richblack-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Description</label>
                <textarea
                  value={editChapter.about}
                  onChange={(e) =>
                    setEditChapter({ ...editChapter, about: e.target.value })
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-richblack-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div
        className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 w-72 mt-14 mx-auto "
        onClick={() => generatecontent()}
      >
        Generate content
      </div>
      {oaderModal && <LoaderModal />}
    </div>
  );
};

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0  flex justify-center items-center z-50  bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      ></button>
      {children}
    </div>
  </div>
);

const DetailCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-purple-400 w-8 h-8">{icon}</div>
    <h2 className="text-gray-300 text-sm mt-2 text-blue-500">{label}</h2>
    <p className="text-lg font-semibold text-richblack-400">{value}</p>
  </div>
);

const ChapterCard = ({ index, chapter, onEdit }) => (
  <div className="bg-richblack-600 p-6 rounded-lg shadow-md flex items-start gap-4 border-l-4 border-purple-500">
    <div className="text-blue-300 font-bold text-lg w-8 h-8 flex items-center justify-center bg-purple-900 rounded-full">
      {index}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-blue-700">
          {chapter.chapterName}
        </h3>
        <Edit
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white"
          onClick={onEdit}
        />
      </div>
      <p className="text-gray-300 mt-1">{chapter.about}</p>
      <p className="text-gray-400 text-sm mt-2 flex items-center gap-1">
        <Clock className="w-4 h-4 text-blue-400" /> {chapter.duration}
      </p>
    </div>
  </div>
);

export default CourseLayout;
