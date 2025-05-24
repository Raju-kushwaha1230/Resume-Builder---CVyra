import React, { useState } from 'react'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
const Input = ({ value,
    onChange,
    label,
    placeholder,
    type }) => {

    const [showPassword, setshowPassword] = useState(false)
    const handleShowPassword = () => {
        setshowPassword(!showPassword)
    }

    return (


        <div>

            <label htmlFor={label} className='font-semibold px-3'>{label}</label>
            <div className='relative'>
                <input className='p-2 outline-1 w-[80%] outline-gray-300 rounded-lg focus:outline-2 focus:outline-cyan-200' type={showPassword ? "text" : type} value={value} onChange={onChange} name={label} placeholder={placeholder} />
                {type === "password" && (
                    <span onClick={handleShowPassword} className='absolute  top-3 text-gray-500 hover:cursor-pointer ml-4'>
                        {showPassword ? <FaRegEyeSlash size={22} className='' /> : <FaRegEye  size={22} className=''/>}
                    </span>
                )}

            </div>


        </div>
    )
}

export default Input