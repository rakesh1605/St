import React from 'react'
import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../assets/Images/TimelineImage.png"
const timeline=[
  {
    Logo: Logo1,
    heading: "Leadership",
    Description:"Fully committed to the society"
  },
  {
    Logo: Logo1,
    heading: "Leadership",
    Description:"Fully committed to the society"
  }, {
    Logo: Logo2,
    heading: "Leadership",
    Description:"Fully committed to the society"
  }, {
    Logo: Logo3,
    heading: "Leadership",
    Description:"Fully committed to the society"
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description:"Fully committed to the society"
  }

]
const Timelinesection = () => {
  return (
    <div>
      <div className='flex flex-row gap-15 items-center'>
        <div className='w-[45%] flex flex-col gap-5'>  
          {
            timeline.map((element, index) => {
              return (
                <div className="flex flex-row gap-6" key={index}>
                  <div className="flex flex-col items-center">
                    {/* Logo */}
                    <div className="w-[50px] h-[50px] bg-white flex items-center justify-center">
                      <img src={element.Logo} alt="Logo" />
                    </div>
                    {/* Border below the logo */}
                    {index !== timeline.length - 1 && (
                      <div className="h-14 border-dotted border-l border-richblack-100"></div>
                    )}
                  </div>
            
                  <div>
                    {/* Heading and Description */}
                    <h2 className="font-semibold text-[10px]">{element.heading}</h2>
                    <p className="text-base">{element.Description}</p>
                  </div>
                </div>
              );
            })
            
          }

        </div>
        <div className='relative shadow-blue-200'>
          <img src={TimelineImage} alt="" className='shadow-white objext-cober h-fit' />
          <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase px-8 py-7 pb-4 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex flex-row items- items-center gap-5 px-7 border-r border-caribbeangreen-200'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-200 text-sm'>Years of experience</p>

            </div>
            <div className='flex gap-5 items-center px-7'>
              <p className='text-3xl font-bold '>250</p>
              <p className='text-caribbeangreen-200 text-sm'>Type of course</p>

            </div>

          </div>

        </div>

      </div>
      
    </div>
   )
}

export default Timelinesection
