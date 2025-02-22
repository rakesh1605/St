import React from 'react'


const ConfirmationModal = () => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
      <div className='spinner'>

      </div>
        <p className="text-2xl font-semibold text-richblack-5">
         Ai loading data
        </p>
       
        
      </div>
    </div>
  )
}

export default ConfirmationModal
