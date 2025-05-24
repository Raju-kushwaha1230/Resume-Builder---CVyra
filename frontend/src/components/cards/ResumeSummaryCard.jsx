import React from 'react'

const ResumeSummaryCard = ({
    imgUrl,
    title,
    lastUpdated,
    onSelect,
}) => {


    return (
        <div className='flex xl:flex-col hover:cursor-pointer hover:shadow-lg transition-all ease-in-out sm:justify-between   p-2  rounded-lg   border border-gray-400 lg:w-1/4  sm:w-3/5 h-[50vh]'>

            <div className= ' h-[85%] bg-cyan-50  '  onClick={onSelect}>
                {imgUrl ? (
                    <img src={imgUrl} className=' h-67.5 w-100  object-contain '  alt="imag" />
                ) : (
                    <div></div>
                )}
            </div>
            <div className=' h-[15%]  p-2 flex flex-col items-center '>
                <h4 className=' font-semibold'>{title}</h4>
                <p className='text-sm text-gray-600'>
                    Last Updated: {lastUpdated}
                </p>
            </div>
        </div>
    )
}

export default ResumeSummaryCard