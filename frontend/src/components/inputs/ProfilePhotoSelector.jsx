import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {

    const inputRef = useRef(null)
    const [PreviewUrl, setPreviewUrl] = useState("")

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file)
            const preview = URL.createObjectURL(file)

            if (setPreview) {
                setPreview(preview)
            }
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
        if (setPreview) {
            setPreview(null)
        }

    }
    const onChooseFile = () => {
        inputRef.current.click()
    }
    return (
        <div className='flex justify-center'>
            <input type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} className='hidden' />

            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full  cursor-pointer '>
                    <LuUser className='text-7xl ml-4  text-purple-500 ' />
                    <button type='button' onClick={onChooseFile} className='bg-purple-300  h-7 w-10 flex justify-center items-center relative top-6 left-4 rounded-2xl '>
                        <LuUpload className='' />
                    </button>
                </div>
            ) : (
                <div className='relative bg-purple-100 rounded-full'>
                    <img src={preview || PreviewUrl} alt='Profile Photo' className='w-20 h-20 rounded-full object-cover' />
                    <button type='button' onClick={handleRemoveImage} className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursur-pointer '>
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector