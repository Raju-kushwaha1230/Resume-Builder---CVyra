import React from 'react'

const RatingInput = ({ value = 0, total = 5, onChange = () => { },
    color = "#9125E6",
    bgColor = "#E9D4FF"
}) => {

    const displayValue = Math.round(( value / 100 ) * total)

    const handleClick = (index)=>{
        const newValue = Math.round(((index+ 1)/ total ) * 100 )
        onChange(newValue)
    }

    return (
        <div className='flex gap-3 cursor-pointer p-2 '>
            {[...Array(total)].map((_, index)=>{
                const isActive  = index < displayValue;

                return (
                    <div className='w-6 h-6 rounded transition-all ' key={index} onClick={()=> handleClick(index)}  style={{ backgroundColor: isActive ? color : bgColor }} >

                    </div>
                )
            })}
        </div>
    )
}

export default RatingInput