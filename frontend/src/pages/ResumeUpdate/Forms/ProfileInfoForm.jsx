import React from 'react'
import ProfilePhotoSelector from "../../../components/inputs/ProfilePhotoSelector"
import Input from '../../../components/inputs/Input'
const ProfileInfoForm = ({profileData, updateSection, onNext}) => {
  return (
    <div className='w-full'>
        <h2 className='font-semibold text-2xl p-2'>Personal Information</h2>
        <div className=' w-full'>
            <ProfilePhotoSelector
            image={profileData?.profileImageUrl || profileData?.profilePreviewUrl  }
            setImage={(value)=>{
                updateSection("profileImageUrl", value)
            }}
            preview={profileData?.profilePreviewUrl}
            setPreview={(value)=>{updateSection("profilePreviewUrl", value)}}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 pt-5 w-full '>   
                <Input 
                value={profileData.fullName || ""}
                onChange={({target})=> updateSection("fullName" , target.value) }
                label={"Full Name"}
                placeholder={"Raju"}
                type={Text}

                />
                <Input
                 value={profileData.destination || ""}
                onChange={({target})=> updateSection("destination" , target.value) }
                label={"Designation"}
                placeholder={"Full Stack Developer"}
                type={Text}
                />
                <div className=' w-full flex flex-col '>
                    <label htmlFor="summary" className='font-semibold text-l '>Summary</label>
                    <textarea className='outline outline-gray-400  m-2  lg:w-[43vw] p-2 md:w-[100%] rounded-lg   ' name="summary" id="" placeholder='Short Introduction' rows={4} value={profileData.summary || ""} onChange={({target})=> updateSection('summary',target.value)}></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfoForm