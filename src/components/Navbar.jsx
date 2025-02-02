import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import assets from "../assets/assets.js"

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
 
  const getActiveLocation = () => {
      if(location.pathname === '/dashboard') {
        return {name:'Dashboard', icon: assets.FaHome};
      }
      if(location.pathname === '/transaction') {
        return {name:'Transaction', icon: assets.FaCreditCard};
      }
      if(location.pathname === '/budget') {
        return {name:'Budget', icon: assets.FaWallet};
      }
      if(location.pathname === '/chatbot') {
        return {name:'Finbot', icon: assets.RiRobot2Fill};
      }
  }

  const { name, icon: IconComponent } = getActiveLocation() || {};

  return (
    <div className='shadow h-[60px] flex items-center justify-between px-8 bg-white'>
      <div className='flex items-center gap-2 text-gray-800'>
        <IconComponent className="text-[20px]" />
        <p className='font-semibold text-[16px]'>{name}</p>
      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='rounded-full border border-gray-800 p-1'>
          <assets.BsPersonFill className='text-[20px] text-gray-800 ' />
        </div>
        <p className='text-[14px] font-semibold'>Ayman Haseeb</p>
      </div>
    </div>
  )
}

export default Navbar