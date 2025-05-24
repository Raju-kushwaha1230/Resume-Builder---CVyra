import React, { useEffect, useState } from 'react'
import UserCard from '../../components/cards/UserCard'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { LuCirclePlus } from 'react-icons/lu'
import ResumeSummaryCard from '../../components/cards/ResumeSummaryCard'
import CreateResumeForm from './CreateResumeForm'
import Modal from '../../components/Modal'

import moment from 'moment'
const Dashboard = () => {

  const navigate = useNavigate()
  const [allResume, setallResume] = useState(null)
  const [openCreateModal, setopenCreateModal] = useState(false)

  const fetchAllResume = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.RESUME.GET_ALL);
      setallResume(response.data)


    } catch (error) {
      console.log("Error fetching error", error);
    }
  }

  useEffect(() => {
    fetchAllResume()

  }, [])


  return (
    <DashboardLayout>
      <div className=' xl:flex w-full     '>
        <div className='  lg:w-1/2  xl:w-1/6 h-[50vh]  border sm:justify-center sm:mx-auto    sm:w-3/4 md:w-2/3   border-gray-300 hover:shadow-sm hover:shadow-blue-300  rounded-lg my-10  flex flex-col justify-center items-center transition-all duration-300 ease-in-out cursor-pointer  ' onClick={() => { setopenCreateModal(true) }}>
          <div className='h-15 w-15  rounded-lg   bg-gray-200 flex  justify-center items-center'>
            <LuCirclePlus className='text-5xl text-blue-600 hover:text-blue-800 transition-all ' />
          </div>
          <h3 className='font-semibold text-xl'>Add New Resume</h3>
        </div>
      
        <div className='xl:flex xl:w-[70%]  xl:flex-wrap  sm:mx-auto   gap-10  sm:flex-row my-10 '>

          {allResume?.map((resume) =>
          (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume.title}
              lastUpdated={
                resume?.updatedAt ?
                  moment(resume.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}

            />
          ))}
        </div>
      </div>

      <Modal 
      isOpen={openCreateModal}
      onClose= {()=>{
        setopenCreateModal(false)
      }}
      hideHeader
      >
        <div>
          <CreateResumeForm/>
        </div>
        
        </Modal>
    </DashboardLayout>
  )
}

export default Dashboard