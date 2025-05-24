import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'

const DashboardLayout = ({activeMenu , children}) => {
    const { user } = useContext(UserContext)

  return (
    <div className='bg-gray-50'>
       <div className=' sticky top-0 bottom-0  '>
         <Navbar activeMenu = {activeMenu} />
       </div>
        {user && <div>{children}</div> }
    </div>
  )
}

export default DashboardLayout