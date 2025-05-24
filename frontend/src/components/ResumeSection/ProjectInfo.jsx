import React from 'react'
import { LuGithub , LuExternalLink } from 'react-icons/lu'
import ActionLink from '../ActionLink'

const ProjectInfo = ({title, description, githubLink, liveDemoUrl, bgColor, isPreview}) => {
  return (
    <div className='mt-3'>

           
              <h3 className= {` ${isPreview ? "text-sm" : "text-base"} font-semibold text-gray-900 `}>{ title} </h3>
           
           
            <p>{description} </p>
            <div className='flex items-center gap-3 mt-2'>
                
                {githubLink && <ActionLink icon={<LuGithub />} link = {githubLink} bgColor={bgColor} />}
                {liveDemoUrl && <ActionLink icon={<LuExternalLink />}  link={liveDemoUrl} bgColor={bgColor} />  }

            </div>
    </div>
  )
}

export default ProjectInfo