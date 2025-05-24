import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'
const CertificationDetailsForm = ({ certification, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold p-2 '>Certifications</h2>
      <div>
        {certification && certification.map((item, index) => {
          return (
            <div key={index} className='grid  grid-cols-1 md:grid-cols-2 p-3 gap-4'>

              <div className='col-span-2'>
                <Input
                label={"Title"}
                placeholder={"frontend Development..."}
                value={item.title}
                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                type={"text"}
              />
              </div>
              <Input
                label={"Issuer"}
                placeholder={"codeWithHarry"}
                value={item.issuer}
                onChange={({ target }) => updateArrayItem(index, "issuer", target.value)}
                type={"text"}
              />
              <Input
                label={"Year"}
                placeholder={"codeWithHarry"}
                value={item.year}
                onChange={({ target }) => updateArrayItem(index, "year", target.value)}
                type={"year"}
              />
              {certification.length > 1 && (
                <div>
                  <button type='button'  className='p-2 m-2 text-2xl  bg-red-500   hover:bg-red-600 rounded-lg hover:cursor-pointer transition-all  ' onClick={()=>{removeArrayItem(index)}}>
                    <LuTrash2 className='  ' />
                  </button>
                </div>

              )}
            </div>
          )


        })}
        <div>
          <button type='button' className='flex items-center gap-1 p-2 bg-green-400  hover:bg-green-500 rounded-lg hover:cursor-pointer m-2 transition-all font-semibold' onClick={()=>{ addArrayItem({title:"", issuer:"", year:""})}}>
            <LuPlus className='text-2xl font-semibold' />Add Certificate
          </button>
        </div>
      </div>
    </div>
  )
}

export default CertificationDetailsForm