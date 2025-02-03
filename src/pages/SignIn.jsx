import React from 'react'
import assets from "../assets/assets.js" 
import { Link } from 'react-router-dom';
import Toggle from '../components/Toggle.jsx';

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  } 

  return (
    <div className='w-screen h-screen bg-lightGray overflow-y-hidden overflow-x-hidden'>
        <div className='pt-6 pb-2 pl-8 flex items-center gap-1'>
          <img src={assets.BlackNoBgLogo} className='w-6' alt="" />
          <p className='font-semibold tracking-widest uppercase'>Finovate</p>
        </div>

        {/* Form Section */}
        <div className='absolute mt-24 left-32'>
          <p className='text-4xl font-semibold'>Welcome Back</p>
          <p className='font-medium text-gray-600 text-sm mt-4'>Enter your email and password to log in.</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email Address' required className='mt-6 block placeholder:text-gray-600 placeholder:text-sm outline-none border border-gray-300 rounded-md py-2 px-3 w-[350px]' />
            <input type="password" placeholder='Password' required className='mt-5 block placeholder:text-gray-600 placeholder:text-sm outline-none border border-gray-300 rounded-md py-2 px-3 w-[350px]' />

            <Link
              to="/"
              className="mt-5 text-center block smooth-transition rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign In
            </Link>
            <Toggle />
          </form>

          <div className='flex items-center gap-2 mt-5'>
            <div className='w-[100px] h-[2px] bg-gray-300 flex-1 mt-1 rounded-md'></div>
            <p className='text-gray-500'>or</p>
            <div className='w-[100px] h-[2px] bg-gray-300 flex-1 mt-1 rounded-md'></div>
          </div>

          <button className='flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-md py-2.5 px-3.5 mt-5 smooth-transition hover:bg-[#f0f4f8]'>
            <img src={assets.googleLogo} className='w-[20px]' alt="" />
            <p className='font-semibold text-sm'>Sign in with Google</p>
          </button>

          <Link
            to="/signup"
            className="mt-5 text-center block smooth-transition rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span className='font-light'>Don't have an account?</span> Sign Up
          </Link>

          <div className='flex items-center justify-center gap-3 mt-[104px]'>
            <Link to="/signin" className='h-[5px] bg-indigo-600 w-[150px] rounded-xl'></Link>
            <Link to="/signup" className='h-[5px] bg-gray-300 w-[150px] rounded-xl'></Link>
          </div>
        </div>

        <div className='relative top-0 right-0'>
          <div className=' absolute w-[900px] h-[900px] top-[-100px] right-[-50px] bg-transparent rounded-full border-2 border-gray-300 flex items-center justify-center'>
            <div className=' w-[750px] h-[750px]  bg-transparent rounded-full border-2 border-indigo-200'></div>
          </div>
          <div className='bg-white absolute rounded-xl right-[-300px] top-[70px]'>
            <img src={assets.signinImg} className='z-10 w-[1000px] rounded-xl' alt="" />
          </div>
        </div>
    </div>
  )
}

export default SignIn