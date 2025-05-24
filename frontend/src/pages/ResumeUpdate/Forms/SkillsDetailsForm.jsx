import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
import RatingInput from '../../../components/ResumeSection/RatingInput'
const SkillsDetailsForm = ({skills, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div>
        <h2 className='text-2xl font-semibold p-2'>Skills </h2>
        <div>
            {skills && skills.map((skill,index)=>{
                return ( <div className='grid grid-cols-1 md:grid-cols-2 items-center p-2 border border-purple-400 m-2 rounded-lg '>
                    <Input
                label={"Name"}
                placeholder={"Reactjs"}
                value={skill.name}
                onChange={({target})=>{updateArrayItem(index,"name", target.value)}}
                type={"text"}
                 />
               <div>
                <label htmlFor="" className='text-xl font-semibold p-2' >Proficiency ({skill.progress / 20 || 0} / 5) </label>
                 <RatingInput
                value={skill.progress || 0}
                total={5}
                onChange={(newItem)=>{
                    updateArrayItem(index, "progress", newItem)
                }}
                
                
                />
               </div>

                { skills.length > 1 && <div className='p-2'>
                    <button type='button' className='p-2 text-xl  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-red-700 ' onClick={()=>{ removeArrayItem(index)}}> 
                        <LuTrash2 />
                    </button>
                </div> }
                </div>
                    

                )
                
            })}

            <div>
                <button className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2'  type='button' onClick={()=>{addArrayItem({ name:"", progress:""})}}>
                    <LuPlus /> Add Skills
                </button>
            </div>
        </div>
    </div>
  )
}

export default SkillsDetailsForm