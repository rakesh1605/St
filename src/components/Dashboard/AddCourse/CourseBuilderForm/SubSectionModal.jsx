import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'react-router-dom';
import { createSubSection, updateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { RxCross2 } from 'react-icons/rx';
import IconBtn from '../../../common/IconButton';
import Upload from '../CourseInformation/Upload'

const SubSectionModal = ({modalData,
  setModalData,
  add,
  view,
  edit,
 }
) => {
  const{
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues
  }=useForm();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const {course}= useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  console.log("data is",modalData);
  useEffect(()=>{
    if(view || edit){
      setValue("lectureTitle",modalData.title);
      setValue("lectureDesc",modalData.description)
      setValue("lectureVideo",modalData.videoUrl)
    }
  },[])
  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle!==modalData.title || currentValues.lectureDesc!==modalData.description || currentValues.lectureVideo!==modalData.videoUrl){
       return true;
    }
    else{
      return false;
    }
  }
  const handleEditSubSection= async()=>{
        const currentValues=getValues();
        const formData=new FormData();
        console.log("MOdal data",modalData);
        formData.append("sectionId",modalData.sectionId)
        formData.append("subsectionId",modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
          formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
          formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true);
        const result=await updateSubSection(formData,token);
        console.log("result inside subsection modal",result);
        console.log("Modal data",modalData);
        if(result){
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? result : section
          )
          console.log("updated course is",updatedCourseContent);
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          
          dispatch(setCourse(updatedCourse))
          
        }
        setModalData(null);
        setLoading(false);
  }
  const onSubmit =async(data)=>{
    if(view) return;
    if(edit){
      if(!isFormUpdated){
        toast.error("No changes made to the form")

      }
      else{
        handleEditSubSection();
      }
    }else{
      const formData=new FormData();
      formData.append("sectionId",modalData);
      formData.append("title",data.lectureTitle);
      formData.append("video",data.lectureVideo)
      formData.append("description",data.lectureDesc)
      setLoading(true);
      const result= await createSubSection(formData,token);
      console.log("Subsection details",result);
      console.log("course content",course.courseContent);
      if(result){
        console.log("modal data section id",modalData)
       
          // Check if this is the section to be updated
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        
           // Return other sections unchanged
       
        
        
        
        console.log("updated course",updatedCourseContent);
      }
      setModalData(null);
      setLoading(false);

    }
   
  }
  return (
   
    
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      {/* Modal Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
        <p className="text-xl font-semibold text-richblack-5">
          {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
        </p>
        <button onClick={() => (!loading ? setModalData(null) : {})}>
          <RxCross2 className="text-2xl text-richblack-5" />
        </button>
      </div>
      {/* Modal Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 px-8 py-10"
      >
        {/* Lecture Video Upload */}
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        />
        {/* Lecture Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
          </label>
          <input
            disabled={view || loading}
            id="lectureTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true })}
            className="form-style w-full"
          />
          {errors.lectureTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture title is required
            </span>
          )}
        </div>
        {/* Lecture Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
            Lecture Description{" "}
            {!view && <sup className="text-pink-200">*</sup>}
          </label>
          <textarea
            disabled={view || loading}
            id="lectureDesc"
            placeholder="Enter Lecture Description"
            {...register("lectureDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.lectureDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture Description is required
            </span>
          )}
        </div>
        {!view && (
          <div className="flex justify-end">
            <IconBtn
              type="submit"
              customClasses="bg-yellow-100 px-4 py-2 rounded-md text-black font-semibold"
              disabled={loading}
              text={loading ? "Loading.." : add ? "Save" : "Save Changes"}
            />
          </div>
        )}
      </form>
    </div>
  </div>
  )
}

export default SubSectionModal
