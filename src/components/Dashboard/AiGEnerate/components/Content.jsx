import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import { fetchGenCourseDetails, fetchGenChapeDetails } from "../../../../services/operations/courseDetailsAPI";
import { IoIosArrowBack } from "react-icons/io"
const CourseReady = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [courseData, setCourseData] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [course, setCourse] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [chapterVideoUrl, setChapterVideoUrl] = useState(null);
  const [output, setOutput] = useState("");
const navigate=useNavigate();
  useEffect(() => {
    if (id && token) {
      getCourseDetails(id);
    }
  }, [id, token]);
  const videoOptions = {
    height: "360",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const onVideoReady = (event) => {
    // Access to player instance
    event.target.pauseVideo();
  };

  const getCourseDetails = async (id) => {
    try {
      const result = await fetchGenCourseDetails(id, token);
      if (result) {
        setCourse(result);
        const parsedData = JSON.parse(result.courseOutput);
        setCourseData(parsedData);
        if (parsedData.chapters.length > 0) {
          const firstChapter = parsedData.chapters[0];
          setSelectedChapter(firstChapter);
          generateChapterContent(0, result.courseId);
        }
      }
    } catch (error) {
      console.error("Error fetching course details", error);
    }
  };

  const handleChapterSelect = (chapter, index) => {
    setSelectedChapter(chapter);
    if (course) {
      generateChapterContent(index, course.courseId);
    }
  };

  const generateChapterContent = async (chapterId, courseId) => {
    try {
      const result = await fetchGenChapeDetails(chapterId, courseId, token);
      if (result) {
        let parsedData;

        if (typeof result.content === "string" && isValidJSON(result.content)) {
          parsedData = JSON.parse(result.content);
        } else {
          parsedData = result.content;
        }

        setChapterContent(parsedData);
        setChapterVideoUrl(result.videoId);
      }
    } catch (error) {
      console.error("Error fetching chapter content", error);
    }
  };

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(()=>{
console.log("chapter url",chapterVideoUrl)
  },[chapterVideoUrl])
  const runCode = (code) => {
    try {
      let outputLog = "";
      const customConsole = {
        log: (...args) => {
          outputLog += args.join(" ") + "\n";
        },
      };
      const wrappedFunction = new Function("console", code);
      wrappedFunction(customConsole);
      setOutput(outputLog);
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] text-richblack-400">
      {/* Sidebar */}
      <div className="w-[320px] flex flex-col border-r border-richblack-700 bg-richblack-800">
        <div className="p-4">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
        </div>
  
        <div className="flex-1 overflow-y-auto px-4">
          {courseData?.chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`p-4 mb-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
                selectedChapter?.chapterName === chapter.chapterName
                  ? 'bg-blue-600 scale-105 shadow-md'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleChapterSelect(chapter, index)}
            >
              <p className="font-semibold">
                {index + 1}. {chapter.chapterName}
              </p>
              <p className="text-sm text-gray-400">{chapter.duration}</p>
            </div>
          ))}
        </div>
  
        
      </div>
  
      {/* Chapter Content */}
      <div className="flex-1 overflow-y-auto bg-richblack-900">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          {selectedChapter ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">{selectedChapter.chapterName}</h1>
              {chapterVideoUrl && (
                <div className="mb-6">
                  <YouTube
                    videoId={chapterVideoUrl} // YouTube video ID
                    opts={videoOptions}
                    onReady={onVideoReady}
                  />
                </div>
              )}
              {Array.isArray(chapterContent) && chapterContent.length > 0 ? (
                <div className="space-y-8">
                  {chapterContent.map((chapter, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-lg shadow">
                      <h2 className="text-2xl font-semibold mb-4 text-white">{chapter.title}</h2>
                      <p className="text-gray-300 mb-4">{chapter.explanation}</p>
  
                      {chapter.code_example && (
                        <div className="bg-black text-green-400 p-4 rounded-lg mb-4">
                          <pre className="whitespace-pre-wrap">
                            <code>{chapter.code_example}</code>
                          </pre>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => runCode(chapter.code_example)}
                          >
                            Run Code
                          </button>
                          <div className="bg-gray-800 text-yellow-400 p-2 mt-2 rounded">
                            <strong>Output:</strong>
                            <pre>{output}</pre>
                          </div>
                        </div>
                      )}
  
                      {chapter.keytakeways && (
                        <ul className="list-disc list-inside text-gray-300">
                          {chapter.keytakeways.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Loading content...</p>
              )}
            </div>
          ) : (
            <p className="text-gray-400">Select a chapter to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
  
  }

export default CourseReady;