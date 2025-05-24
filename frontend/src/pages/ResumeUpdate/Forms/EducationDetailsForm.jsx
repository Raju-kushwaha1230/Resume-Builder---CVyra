import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
        <div>
            <h2 className=' text-2xl font-semibold p-2 '>Education Information</h2>
            <div>
                {educationInfo && educationInfo.map((education, index) => {
                    return (
                        <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-6'>
                            <div className='col-span-2 '>
                                <Input
                                    label={"Degree"}
                                    placeholder={"B.Tech"}
                                    value={education.degree || ""}
                                    onChange={({ target }) => { updateArrayItem(index, "degree", target.value) }}
                                    type="text"
                                />
                            </div>
                            <div className='col-span-2'>
                                <Input
                                    label={"Institution"}
                                    placeholder={"IIT..."}
                                    value={education.institution || ""}
                                    onChange={({ target }) => updateArrayItem(index, "institution", target.value)}
                                    type="text"
                                />
                            </div>

                            <Input
                                label={"Start Date"}
                                placeholder={""}
                                value={education.startDate || ""}
                                onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
                                type="month"
                            />
                            <Input
                                label={"End Date"}
                                placeholder={""}
                                value={education.endDate || ""}
                                onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
                                type="month"
                            />
                            { educationInfo.length > 1 && 
                           ( <div>
                                <button className='text-2xl p-2 ] bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-red-700 ' type='button' onClick={()=>removeArrayItem(index)}>
                                    <LuTrash2 />
                                </button>
                            </div>)
                            }
                        </div>
                    )
                })}
                
                <div>
                    <button type='button' className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2' onClick={()=> addArrayItem({degree:"",institution:"",startDate:"",endDate:""})}>
                        <LuPlus /> Add Education
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EducationDetailsForm