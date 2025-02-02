import React, { useState } from 'react'

const Toggle = () => {
  const [active, setActive] = useState(true)

  return (
    <div className='flex items-center gap-2 mt-4'>
        <div className={` w-[38px] h-[20px] p-1 rounded-3xl flex items-center cursor-pointer ${active? 'justify-end bg-indigo-600' : 'justify-start bg-gray-400'}`} 
            onClick={() => setActive(!active)}>
            <div className='bg-white rounded-xl h-[15px] w-[15px]'></div>
        </div>
        <p className='font-gray-400 text-sm font-medium'>Remember me</p>
    </div>
  )
}

export default Toggle