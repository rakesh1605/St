import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourseInput } from "../../../../slices/courseinputSlice"; // Adjust the path if needed

const TopicDesc = () => {
  const dispatch = useDispatch();
  const { courseinput } = useSelector((state) => state.courseinput);

  const handleOnChange = (e) => {
    dispatch(
      setCourseInput({
        ...courseinput,
        [e.target.name]: e.target.value,
      })
    )
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-8">Topic Description</h2>

      {/* Input Field */}
      <div className="w-full max-w-md mb-6 ">
        <label
          htmlFor="topic"
          className="block text-lg font-medium mb-2 text-gray-300"
        >
          Which topic do you want to cover?
        </label>
        <input
          type="text"
          id="topic"
          placeholder="Enter your topic here..."
          value={courseinput?.topic || ""}
          name="topic"
          onChange={handleOnChange}
          className="w-full px-4 py-2 bg-gray-800 rounded-md text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent  text-richblack-700"
          defaultValue={courseinput.topic || ""} 
        />
      </div>

      {/* Text Area */}
      <div className="w-full max-w-md">
        <label
          htmlFor="courseDescription"
          className="block text-lg font-medium mb-2 text-gray-300"
        >
          Tell more about your course
        </label>
        <textarea
          id="courseDescription"
          placeholder="Provide a detailed description of your course..."
          rows={5}
          value={courseinput?.description || ""}
          onChange={handleOnChange}
          name="description"
          className="w-full px-4 py-2 bg-gray-800 rounded-md text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent resize-none  text-richblack-700"
          defaultValue={courseinput.description || ""}
        ></textarea>
      </div>
    </div>
  );
};

export default TopicDesc;
