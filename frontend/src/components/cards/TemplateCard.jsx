import React from 'react'

const TemplateCard = ({thumnailImg, isSelected, onSelect}) => {
  return (
    <div className={` h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer ${isSelected ? " border-purple-500  border-2 " : ""}
      `} onClick={onSelect} >
        {thumnailImg ? (
            <img src={thumnailImg} alt="" className='w-[100%] rounded mb-10 ' />

        ) : (
            <div></div>
        )}
    </div>
  )
}

export default TemplateCard