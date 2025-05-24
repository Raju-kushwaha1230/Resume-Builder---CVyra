import React from 'react'
import Progress from '../Progress'
const LanguageInfo = ({ language ,progress, accentColor, bgColor }) =>{
    return (
        <div className='flex items-center justify-between '>
            <p className='text-sm font-medium  '> {language} </p>
            { progress > 0 && (
                <Progress
                progress = {(progress / 100) *5 }
                color = {accentColor}
                bgColor = {bgColor}

                 />
            )}
        </div>

    )
}


const LanguageSection = ({languages, accentColor, bgColor}) => {
  return (
    <div className='flex flex-col gap-2'>
        { languages &&  languages?.map(( language,index ) =>{
            
            return (
            
           <LanguageInfo
           key={`slanguage_${index}`}
           language={language.name}
           progress={language.progress}
           accentColor={accentColor}
           bgColor={bgColor}
           
           />
        )}) }
    </div>
  )
}

export default LanguageSection