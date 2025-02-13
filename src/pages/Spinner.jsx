import React from 'react'
import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className='h-screen flex justify-center items-center text-5xl bg-[#f5f4fa]'>
        <ImSpinner9 className='animate-spin'/>
    </div>
  )
}

export default Spinner