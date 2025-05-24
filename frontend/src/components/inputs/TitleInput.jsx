import React, { useState } from 'react'
import { LuCheck, LuPencil, LuTrendingUpDown } from 'react-icons/lu'
const TitleInput = ({title, setTitle}) => {
    const [showInput, setshowInput] = useState(false)
  return (
    <div className='flex flex- m-3 items-center  w-full'>
        {showInput ?
        (
            <>

        <input type="text" className='p-2 outline outline-violet-300 rounded-lg w-[50%]    ' value={title} onChange={({ target })=>{setTitle(target.value)}} placeholder='Resume Title' name="" id="" />
            <button className='p-2 bg-cyan-400 rounded-lg m-2 '>
                <LuCheck className='text-2xl' onClick={()=>{setshowInput((prevState)=> !prevState )}} />
            </button>

           </> )

         : (
            <>
                <h2 className='font-semibold text-xl '>{title}</h2>

                <button className='p-2 bg-cyan-300 m-2 hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-2 hover:outline-cyan-600 '>
                    <LuPencil  className='text-2xl'   onClick={()=>{setshowInput((prevState)=> !prevState )}} />
                </button>

            </>
         )}
    </div>
  )
}

export default TitleInput