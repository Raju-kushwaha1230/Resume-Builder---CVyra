import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
const ProjectDetailsForm = ({projects, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div>
        <h2 className='text-2xl font-semibold p-2'>Projects</h2>
        <div>
            {projects && projects.map((project, index)=>{
                return ( <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                   <div className='col-span-2 w-full'>
                     <Input 
                    label={"Title"}
                    placeholder={"Github Clone"}
                    value={project.title || ""}
                    onChange={({target})=> updateArrayItem(index,"title", target.value)}
                    type={"text"}
                    
                    />
                   </div>

                    <Input 
                    label={"GitHub"}
                    placeholder={"http://github.com/persona"}
                    value={project.github || ""}
                    onChange={({target})=> updateArrayItem(index,"github", target.value)}
                    type={"text"}
                    
                    />
                    <Input 
                    label={"LiveDemo"}
                    placeholder={"http:persona.com"}
                    value={project.liveDemo || ""}
                    onChange={({target})=> updateArrayItem(index,"liveDemo", target.value)}
                    type={"text"}
                    
                    />
                    <div className='flex flex-col col-span-2 '>
                        <label htmlFor="" className='font-semibold p-1'>Description</label>
                        <textarea name="" id="" className='p-2 outline outline-gray-500 rounded-lg focus-within:outline-gray-300' rows={3} placeholder='Write About Your Project' value={project.description} onChange={({target})=>updateArrayItem(index,"description", target.value)}></textarea>
                    </div>

                    { projects.length>1 && (
                        <div>
                            <button type='button'  className='p-2 m-2 text-2xl  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-red-700  '  onClick={()=> removeArrayItem(index)}>
                                <LuTrash2 />
                            </button>
                        </div>

                    )

                    }
                </div> )
            })}

            <div>
                <button  className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2' type='button' onClick={()=> addArrayItem({title:"", github:"", liveDemo:"", description:""})}   >
                    <LuPlus /> Add Projects
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProjectDetailsForm