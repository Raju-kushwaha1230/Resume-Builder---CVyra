import React from 'react'
import RatingInput from '../../../components/ResumeSection/RatingInput'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const AdditionaFrom = ({ languages, interests, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
        <div>
            <h2 className=' text-2xl font-semibold p-2 '>Additional Information</h2>
            <div>
                <div className='border border-purple-200 m-2 rounded-lg'>
                    <h2 className='text-2xl font-semibold p-2 '>Languages</h2>
                    {languages && languages.map((lang, index) => {
                        return (<div key={index} className='grid grid-cols-1 md:grid-cols-2 p-1 border border-purple-200 m-2 rounded-lg   '>

                            <Input
                                label={"Name"}
                                placeholder={"Java, Python..etc."}
                                value={lang.name || ""}
                                onChange={({ target }) => updateArrayItem("languages", index, "name", target.value)}
                                type={"text"}
                            />
                            <div>
                                <label htmlFor="" className='text-xl font-semibold p-2' >Proficiency ({lang.progress / 20 || 0} / 5) </label>
                                <RatingInput
                                    value={lang.progress || 0}
                                    total={5}
                                    onChange={(newItem) => {
                                        updateArrayItem("languages", index, "progress", newItem)
                                    }}

                                />
                            </div>

                            {languages.length > 1 && (
                                <div className='flex justify-end w-full col-span-2 '>
                                    <button type='button' className='p-1  text-sm  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer transition-all  ' onClick={() => removeArrayItem("languages", index)}>
                                        <LuTrash2 />
                                    </button>
                                </div>
                            )}


                        </div>)
                    })}

                    <div>
                        <button type='button' className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2 transition-all font-semibold' onClick={() => addArrayItem("languages", { name: "", process: "" })}>
                            <LuPlus className='text-2xl font-semibold' /> Add Languages
                        </button>
                    </div>
                </div>

                <div className='border border-purple-200 m-2 rounded-lg'>
                    <h2 className=' text-2xl font-semibold p-2 '>Interests</h2>
                    <div>
                        {interests && interests?.map((interest, index) => {
                            return (
                                <div key={index} className='border border-purple-200  m-2 p-2 rounded-lg ' >
                                    <Input
                                        label={"Interest"}
                                        placeholder={"Reading..."}
                                        value={interest || ""}
                                        onChange={({ target }) => updateArrayItem("interests", index, null, target.value)}
                                        type={"text"}
                                        
                                    />
                                     {interests.length > 1 && (
                                <div className='flex justify-end w-full col-span-2 '>
                                    <button type='button' className='p-1  text-sm  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer transition-all  ' onClick={() => removeArrayItem("interests", index)}>
                                        <LuTrash2 />
                                    </button>
                                </div>
                            )}
                                </div>
                            )

                        })}
                        <div>
                        <button type='button' className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2 transition-all font-semibold' onClick={() => addArrayItem("interests", "" )}>
                            <LuPlus className='text-2xl font-semibold' /> Add Languages
                        </button>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdditionaFrom