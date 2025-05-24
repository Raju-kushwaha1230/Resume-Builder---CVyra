import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactInfo = ({ icon, iconBg, vlaue }) => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center gap-2  ' >

            <div  className=' w-[30px] h-[30px] flex items-center justify-center rounded-full  ' style={{ backgroundColor: iconBg }}>
                {icon}

            </div>
            <p  className='flex-1 text-[12px]  font-medium break-all '>{vlaue}</p>


        </div>
    )
}

export default ContactInfo