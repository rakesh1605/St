import React from "react";
import { setCourseInput } from "../../../../slices/courseinputSlice";
import { useSelector,useDispatch } from "react-redux";
const SelectOption = () => {
  const dispatch=useDispatch();
  const { courseinput } = useSelector((state) => state.courseinput);
  const handleChange = (e) => {
   
     dispatch(
          setCourseInput({
            ...courseinput,
            [e.target.name]: e.target.value,
           
          })
        )
        console.log(e.target.name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h2 className="text-3xl font-bold mb-8 text-white">Select Course Options</h2>

      <div className="grid gap-6 w-full max-w-md">
        {/* Dropdown for Course Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-lg font-medium mb-2 text-gray-300"
          >
            Course Difficulty
          </label>
          <select
            name="level"
            value={courseinput.level}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-black rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advance">Advance</option>
          </select>
        </div>

        {/* Dropdown for Course Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-lg font-medium mb-2 text-gray-300"
          >
            Duration of Course
          </label>
          <select
            name="duration"
            
            value={courseinput.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-black rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent"
          >
            <option value="1hr">1 hour</option>
            <option value="2hrs">2 hours</option>
            <option value="morethan2hrs">More than 2 hours</option>
          </select>
        </div>

        {/* Dropdown for Adding Video */}
        <div>
          <label
            htmlFor="video"
            className="block text-lg font-medium mb-2 text-gray-300"
          >
            Add Video to Course
          </label>
          <select
            name="video"
            value={courseinput.video}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white text-black rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Input for Number of Chapters */}
        <div>
          <label
            htmlFor="chapters"
            className="block text-lg font-medium mb-2 text-gray-300"
          >
            Number of Chapters
          </label>
          <input
            type="number"
            name="chapters"
            value={courseinput.chapters}
            onChange={handleChange}
            placeholder="Enter number of chapters"
            className="w-full px-4 py-2 bg-white text-black rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-caribbeangreen-300 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
