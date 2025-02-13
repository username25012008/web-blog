import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Link to={'/home'} className='flex justify-center items-center h-screen dark:bg-black'>
        <h1 className='md:text-8xl sm:text-4xl text-2xl font-bold dark:text-white'>404 error</h1>
    </Link>
  )
}

export default Error