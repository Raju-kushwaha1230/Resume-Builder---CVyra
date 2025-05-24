import React from 'react'
import { Link } from 'react-router-dom'
import UserCard from '../cards/UserCard'
import { useNavigate } from 'react-router-dom'
import m from '../../assets/m.png'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div>
         <div className='flex  w-full   sticky top-0 z-30  justify-around items-center space-x-4 h-19 bg-[#ffffff] shadow-2xs hover:shadow-lg'>
               <Link to={'/'}> <h1 className='text-2xl  font-semibold hover:text-cyan-500 hover:cursor-pointer transition-colors'>
                CVyra
                </h1></Link>

                <div className='flex items-center justify-between lg:w-[18%] sm:w-[40%]'>
                      <div>
                         <p className='text-lg lg:pr-3 sm:pr-10 text-gray-600 font-semibold hover:text-blue-400 cursor-pointer ' onClick={()=> navigate('/about')} >About</p>
                    </div>
                       <UserCard />
                </div>


            </div>
     </div>
  )
}

export default Navbar