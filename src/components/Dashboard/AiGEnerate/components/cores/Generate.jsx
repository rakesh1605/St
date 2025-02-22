import React, { useEffect, useState } from 'react'
import { HiLightBulb } from 'react-icons/hi'
import { HiClipboardDocumentCheck, HiMiniSquares2X2 } from 'react-icons/hi2'
import { v4 as uuidv4 } from 'uuid';
import SelectCategory from '../SelectCategory';
import TopicDesc from '../TopicDesc';
import SelectOption from '../SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateCourseLayout_AI } from '../../configs/AiModel';
import Loadermodal from '../Loadermodal'
import { addGenCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { setLayOut } from '../../../../../slices/layoutslice';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCourseInput } from '../../../../../slices/courseinputSlice';


const Generate = () => {
  const {courseinput}=useSelector((state)=>state.courseinput);
  const {token}=useSelector((state)=>state.auth);
  
  const {layout}=useSelector((state)=>state.layout)
  const[loading,setLoading]=useState(false);
  const[loaderModal,setLoaderModal]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      description: "Select a category for your course.",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      description: "Define the topic and description.",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Finalize",
      description: "Review and finalize your course.",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < StepperOptions.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  useEffect(() => {
    console.log("course input",courseinput);
  }, [courseinput]);
  
  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
const handleStatus=()=>{

  if(courseinput.length===0){
    return true;

  }
  if(activeIndex==0 && (courseinput?.category?.length===0|| courseinput?.category===undefined)){
    return true;
  }
  if(activeIndex===1 && (courseinput?.topic?.length===0|| courseinput?.topic===undefined)){
    return true;
  }
  if(activeIndex===1 && (courseinput?.description?.length===0|| courseinput?.description===undefined)){
    return true;
  }
  else if(activeIndex===2&&(courseinput?.duration===undefined||courseinput?.difficulty===undefined||courseinput?.video===undefined|| courseinput?.chapters===undefined)){
   return true;
  }
  return false;


}
const GenerateCourseLayout = async () => {
  setLoading(true);
  setLoaderModal(true); // Show modal immediately

  const BASIC_PROMPT = 'Generate a course tutorial with the following details in JSON format. Ensure that each chapter name is distinct and covers different aspects of the topic without repetition. The course should include: Course Name, Description, Chapters (with unique Chapter Names, About section, and Duration). The details are:';
  const USER_INPUT_PROMPT = `Category: ${courseinput.category}, Topic: ${courseinput.topic}, Level: ${courseinput.difficulty}, Duration: ${courseinput.duration},  No Of Chapters: ${courseinput.chapters}, in JSON format Each chapter should have a unique and meaningful name that reflects its distinct focus within the ${courseinput.topic} topic. Avoid generic repetition and ensure variety in chapter coverage. in JSON format`;
  const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
  console.log(FINAL_PROMPT);
   
  try {
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    const responseText = result.response?.text();
    const responseData = JSON.parse(responseText);
    console.log("generated course layout is",responseData);
    setLoading(false);
    setLoaderModal(false);
    SaveToDb(responseData);
  } catch (error) {
    console.error('Error generating course layout:', error);
  } 
};
const SaveToDb=async(data)=>{
  const formData = new FormData();
  const responseJson = JSON.stringify(data);
  var id=uuidv4();
  formData.append("courseId",id);
  formData.append("name", courseinput?.topic || "Untitled Course");
  formData.append("category", courseinput?.category || "");
  formData.append("level", courseinput?.level || "");
formData.append("courseOutput",responseJson);
 
  

 const result = await addGenCourseDetails(formData, token)
    console.log("Course data details",result);
    if (result) {
      console.log("result is",result);
      dispatch(setLayOut(result));
      console.log("layout is",layout)
      dispatch(setCourseInput(null));
      navigate(`/courselayout/${result._id}`);
    }
}

// Rendering part:


  return (
    <div className="min-h-screen bg-richblack-900 text-white flex flex-col items-center">
      {/* Title */}
      <h2 className="text-4xl text-caribbeangreen-300 font-bold mt-8">Create Course</h2>

      {/* Stepper */}
      <div className="relative flex items-center w-full max-w-4xl mt-12">
        {StepperOptions.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center w-1/3 relative">
            {/* Icon */}
            <div
              className={`rounded-full w-16 h-16 flex items-center justify-center transition-all duration-500 ${
                activeIndex >= index ? "bg-caribbeangreen-300" : "bg-richblack-50"
              }`}
            >
              <p className={`text-3xl transition-colors duration-500 ${activeIndex >= index ? "text-white" : "text-richblack-800"}`}>
                {item.icon}
              </p>
            </div>

            {/* Line */}
            {index < StepperOptions.length - 1 && (
              <div
                className={`absolute top-8 left-[50%] w-full h-[2px] bg-richblack-200 transition-all duration-500 ${
                  activeIndex > index ? "bg-caribbeangreen-300 scale-x-100" : "scale-x-0"
                } origin-left`}
              ></div>
            )}

            {/* Name */}
            <h2 className="text-lg font-medium mt-4">{item.name}</h2>

            {/* Description */}
            
          </div>
        ))}
      </div>
      {/* component */}
      {activeIndex===0?<SelectCategory/> :null}
      {activeIndex===1?<TopicDesc/> :null}
         {activeIndex===2?<SelectOption/>:null}
      {/* Buttons */}
      <div className="flex justify-between w-full max-w-4xl mt-12 ">
        {/* Previous Button */}
        <button
          disabled={activeIndex === 0}
          onClick={handlePrevious}
          className={`text-[13px] px-6 py-3 rounded-md font-bold transition-all duration-500 ${
            activeIndex === 0
              ? "bg-richblack-700 text-richblack-500 cursor-not-allowed"
              : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700"
          }`}
        >
          Previous
        </button>

        {/* Next Button */}
       {activeIndex<2 &&  <button
          onClick={handleNext}
         
          disabled={ handleStatus()}
          className={`text-[13px] px-6 py-3 rounded-md font-bold transition-all duration-500 ${
            activeIndex === StepperOptions.length - 1
              ? "bg-yellow-100 text-gray-500 cursor-not-allowed"
              : "bg-yellow-50 text-black hover:bg-yellow-100"
          }`}
        >
          Next
        </button>}
       {
        activeIndex===2&&<button
       
         
        className={`text-[13px] px-6 py-3 rounded-md font-bold transition-all duration-500 ${
          activeIndex === StepperOptions.length - 1
            ? "bg-yellow-100 text-gray-500 "
            : "bg-yellow-50 text-black hover:bg-yellow-100"
        }`}
        onClick={()=> GenerateCourseLayout()}
       
      >
        GenerateCourse
      </button>
       } 
       {loaderModal && <Loadermodal />}
      </div>
     
    </div>
  );
};

export default Generate;

