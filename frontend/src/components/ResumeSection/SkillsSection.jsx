import React from 'react'
import Progress from '../Progress'

const SkillInfo = ({ skills,progress,  accentColor, bgColor })=>{
    return (
        <div className='flex items-center justify-between '> 
            <p className={` text-[12px] font-semibold text-gray-900`}> {skills}</p>

            { progress && (
                <Progress
                    progress={(progress / 100) * 5}
                    color={accentColor}
                    bgColor={bgColor}
                />
            ) }

        </div>

    )

}


const SkillsSection = ({skills, accentColor, bgColor}) => {
  return (
    <div className='grid grid-cols-2  gap-x-5 gap-y-1 mb-5 '>
        {skills?.map((skill, index)=>(
            <SkillInfo 
                key={`skill_${index}`}
                skills={skill.name}
                progress={skill.progress}
                accentColor = {accentColor}
                bgColor={bgColor}
            />
        ))}
    </div>
  )
}

export default SkillsSection