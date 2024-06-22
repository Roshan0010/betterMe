import React from 'react'

const TransformViewCard = () => {
  return (
    <div className='w-full h-[15rem]  flex  gap-4  rounded-xl'>
    <div className='bg-blue-400 w-[30%] h-full rounded-xl '>
    </div>
    <div className='w-full h-full flex bg-[#0C2D48] rounded-xl flex-col items-center '>
      <div
        className='w-[100%] h-full  text-whitef bg-[#0C2D48] text-2xl p-2 outline-none flex'
      ></div>
      {/* <button className='bg-[#135DA0] rounded-xl text-xl text-white w-[99.5%] h-[20%]'>
        Submit
      </button> */}
    </div>
  </div>
  )
}

export default TransformViewCard