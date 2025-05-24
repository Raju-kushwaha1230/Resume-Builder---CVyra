import React from 'react'
import { FaTimes } from 'react-icons/fa';
const Modal = ({children,isOpen, onClose, title, hideHeader, showActionBtn, actionBtnIcon=null, actionBtnText, onActionClick}) => {
 
        if(!isOpen) return null;
    return (
        
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-30'>
        <div className={`relative flex flex-col bg-white min-h-40 min-w-32 shadow-lg rounded-lg overflow-hidden`}>
            <div className='flex justify-between p-2   '>

            
            {!hideHeader && (
                <div className=' flex items-center justify-between w-[90%] mt-4  '> 
                    <h3 className=' font-medium text-xl  '>{title}</h3>

                    {showActionBtn && (
                        <div className=' mt-10 '>
                              <button className=' bg-cyan-300 flex   items-center justify-center ml-10 rounded-lg  p-1   ' onClick={onActionClick}>{actionBtnIcon} {actionBtnText}</button>
                        </div>
                      
                    )}
                </div>
            )}
            <button className='bg-transparent text-2xl text-gray-500 flex justify-end p-1 pr-4 items-center hover:text-gray-700 hover:cursor-pointer transition-colors mt-5 ' onClick={onClose}> <FaTimes /> </button>
            </div>
            <div className='flex-1 overflow-y-auto p-4 custom-scrollbar '>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal