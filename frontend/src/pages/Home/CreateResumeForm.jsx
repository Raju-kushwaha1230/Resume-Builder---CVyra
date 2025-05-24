import axios from 'axios'
import React, { useState } from 'react'
import { LuReceiptRussianRuble } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'

const CreateResumeForm = () => {
  const [title, settitle] = useState("")
  const [error, seterror] = useState(null)

  const navigate = useNavigate()

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      seterror("Please  Resume Title")
      return ;
    }

    seterror("")

    try {

      const response = await axiosInstance.post(API_PATH.RESUME.CREATE,{
        title,
      })
      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`);
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message)
      } else {
        seterror("Something went wrong!....")
      }
    }
  }
  return (
    <div className='min-h-[40vh] min-w-[40vw]  flex flex-col   items-center'>
      <h2 className='text-2xl font-semibold'>Create Resume Title</h2>
      <form onSubmit={handleCreateResume} className='flex flex-col gap-5 w-full'>
        <label htmlFor="title" className='font-semibold '>Title</label>
        <input type="text" label="Resume Title" value={title} onChange={(e) => { settitle(e.target.value) }} className='p-2 w-full outline outline-cyan-300 rounded-lg focus-within:outline-cyan-500' name='title' placeholder='Enter Resume Title' />

        {error && <p className='text-red-600 text-sm '>{error}</p>}
        <button type='submit' className='p-1 mt-5 bg-cyan-300 rounded-lg font-semibold hover:cursor-pointer'>Add Title</button>
      </form>

    </div>
  )
}

export default CreateResumeForm