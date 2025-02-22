import React from 'react'
import instructer from "../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "../components/Button"
const Instuctersection = () => {
  return (
    <div className='mt-16'>
    <div className='flex flex-row gap-20 items-center mt-14'>
      <div className='w-[50%]'>
        <img src={instructer} alt="instucter" className='shadow-white' />
      </div>
      <div className='w-[50%] flex flex-col gap-10'>
        <div className='text-4xl font-semibold w-[50%]'>
          Become an 
          <HighlightText text={"Instructor"}/>
        </div>
        <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit quidem quis perspiciatis. Fugiat voluptatibus unde doloremque libero hic tenetur numquam?
        </p>
        <div className='w-fit'>
        <CTAButton active={true} linkto={"/signup"}>
        <div className='flex flex-row gap-2'>
          Start Learning today
          <FaArrowRight/>
        </div>
        </CTAButton>

        </div>
        

      </div>
      
    </div>
    </div>
  )
}

export default Instuctersection
