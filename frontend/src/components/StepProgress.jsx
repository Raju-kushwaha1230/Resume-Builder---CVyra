import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className='w-full bg-purple-50 h-1 overflow-hidden rounded-lg '>
        <div style={{ width:`${progress}%`}} className='h-1 bg-linear-to-r from-purple-500/85 to-purple-700 transition-all rounded'>
          
        </div>
    </div>
  )
}

export default StepProgress