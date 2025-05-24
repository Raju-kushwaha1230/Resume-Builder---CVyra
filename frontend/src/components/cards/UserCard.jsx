import React from 'react'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const UserCard = () => {
    const {user , clearUser} = useContext( UserContext )
  const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.clear()
        clearUser()
        navigate("/")
    }

  return (
    user && (
    <div className='flex gap-1 w-full  items-center'>
        <div className='lg:w-1/3 '>
            <img className='h-14 w-14 rounded-full object-cover '      src={user.profileImageUrl}  />
        </div>
        <div className='flex flex-col w-1/2 '> 
        <div className='text-xl min-w-[20%] min-w-40  flex item-center justify-center font-semibold font-sans  text-blue-600 hover:cursor-pointer hover:text-blue-800'>
            @{user.name || ""} 
            
        </div>
        <div onClick={handleLogout} className='text-red-600 font-semibold text-lg hover:underline hover:cursor-pointer'>
            Logout
        </div>
        </div>
        
    </div>
    )
    
  )
}

export default UserCard
