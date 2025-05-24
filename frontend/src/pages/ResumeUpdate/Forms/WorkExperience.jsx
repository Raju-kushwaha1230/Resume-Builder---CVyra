import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
const WorkExperience = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
        <div>
            
            <h2 className='font-bold text-3xl bg-gradient-to-r from-blue-600 via-purple-500 to-blue-700/55 inline-block text-transparent bg-clip-text'>Work Experience</h2>

            
            <div>
                {workExperience && workExperience.map((experience, index) => {
                    return (<div key={index} className='grid grid-cols-1 md:grid-cols-2'>

                        <Input
                            label={"Company"}
                            placeholder={"Google..."}

                            value={experience.company}
                            onChange={({ target }) => updateArrayItem(index, "company", target.value)}
                            type={Text}

                        />
                        <Input
                            label={"Role"}
                            placeholder={"Senior  Developer"}
                            onChange={({ target }) => updateArrayItem(index, "role", target.value)}
                            value={experience.role}
                            type={Text}
                        />
                        <Input
                            label={"Start Date"}
                            placeholder={"2025 jan"}
                            onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
                            value={experience.startDate}
                            type={"month"}
                        />
                        <Input
                            label={"End Date"}
                            placeholder={"2025 jun"}
                            onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
                            value={experience.endDate}
                            type={"month"}
                        />

                        <div className='flex flex-col lg:col-span-2 '>
                            <label htmlFor="" className='font-semibold  p-2'>Description</label>
                            <textarea name="" id="" placeholder='What did you do in this role' className='border-gray-500 border focus:outline-1 outline-gray-400 rounded-lg p-2 w-[88%]' rows={3} value={experience.description} onChange={({ target }) => updateArrayItem(index, "description", target.value)}></textarea>
                        </div>

                        {workExperience.length > 1 && (<div className='m-3 w-full'>

                            <button type='button' className='p-2 text-2xl  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-red-700 ' onClick={() => { removeArrayItem(index) }}>
                                <LuTrash2 />
                            </button>

                        </div>
                        )}

                    </div>

                    )
                })}


                <button type='button' className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2' onClick={() => { addArrayItem({ company: "", role: "", startDate: "", endDate: "", description: "" }) }}>
                    <LuPlus /> Add Work Experience
                </button>
            </div>


        </div>
    )
}

export default WorkExperience