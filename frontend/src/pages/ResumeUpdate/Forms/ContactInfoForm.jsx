import React from 'react'
import Input from '../../../components/inputs/Input'
const ContactInfoForm = ({contactInfo, updateSection}) => {
  return (
    <div>

      <h2 className='text-2xl font-semibold'>Contact Infromation</h2>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
           <div className='lg:col-span-2 w-full '>
             <Input 
            label={"Address"}
            placeholder={"Hyderabad.."}
            onChange={({target})=>{updateSection("location",target.value )}}
            value={contactInfo.location || ""}
            />
           </div>
            <Input 
            label={"Email"}
            placeholder={"mighty@gmail.com"}
            onChange={({target})=>{updateSection("email",target.value )}}
            value={contactInfo.email || ""}
            />
            <Input 
            label={"Phone Number"}
            placeholder={"+91-987654321"}
            onChange={({target})=>{updateSection("phone",target.value )}}
            value={contactInfo.phone || ""}
            />
            <Input 
            label={"LinkedIn"}
            placeholder={"http://linked.com/raju-kushwaha"}
            onChange={({target})=>{updateSection("linkedin",target.value )}}
            value={contactInfo.linkedin || ""}
            />
            <Input 
            label={"GitHub"}
            placeholder={"http://github.com/raju-kushwaha"}
            onChange={({target})=>{updateSection("github",target.value )}}
            value={contactInfo.github || ""}
            />
           <div className=' lg:col-span-2 '>
             <Input 
            label={"Portfolio / Website"}
            placeholder={"http://website-url/raju-kushwaha"}
            onChange={({target})=>{updateSection("website",target.value )}}
            value={contactInfo.website || ""}
            />
           </div>
            
        </div>
      </div>
      

    </div>
  )
}

export default ContactInfoForm