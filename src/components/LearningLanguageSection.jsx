import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../assets/Images/Plan_your_lessons.png"
import CTAButton from "../components/Button"
const LearningLanguageSection = () => {
  return (
    <div className='mb-32'>
      <div className='flex flex-col gap-5 mt-[130px] items-center'>
        <div className='text-4xl font-semibold text-center '>
          Your Swiss knife for
          <HighlightText text={"Learning any language"} />
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base mt-2 w-[70%]'>
          Using spin talking learning multiple languages easy with 20+ languages realistic voice-over,progress tracking,custom schedule and more,
        </div>
        <div className="flex flex-row items-center justify-center mt-5 gap-4">
  <img 
    src={know_your_progress} 
    alt="Know Your Progress" 
    className="object-contain w-[60%] max-w-[350px] h-auto -mr-32" 
  />
  <img 
    src={compare_with_others} 
    alt="Compare With Others" 
    className="object-contain w-[60%] max-w-[350px] h-auto" 
  />
  <img 
    src={plan_your_lessons} 
    alt="Plan Your Lessons" 
    className="object-contain w-[60%] max-w-[350px] h-auto -ml-36" 
  />
</div>
<div className='w-fit '>
  <CTAButton active={true} linkto={"/signup"}>
  <div>
    Learn More
  </div>
  </CTAButton>
</div>

        
      </div>
      
    </div>
  )
}

export default LearningLanguageSection
