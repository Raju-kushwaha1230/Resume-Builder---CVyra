import React, { captureOwnerStack, useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LuArrowLeft, LuArrowRight, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash2 } from 'react-icons/lu'
import toast from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TitleInput from '../../components/inputs/TitleInput'
import { useReactToPrint } from 'react-to-print'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import StepProgress from '../../components/StepProgress'
import ProfileInfoForm from './Forms/ProfileInfoForm'
import ContactInfoForm from './Forms/ContactInfoForm'
import WorkExperience from './Forms/WorkExperience'
import EducationDetailsForm from './Forms/EducationDetailsForm'
import SkillsDetailsForm from './Forms/SkillsDetailsForm'
import ProjectDetailsForm from './Forms/ProjectDetailsForm'
import CertificationDetailsForm from './Forms/CertificationDetailsForm'
import AdditionaFrom from './Forms/AdditionaFrom'
import RenderResume from '../../components/ResumeTemplates/RenderResume'
import { blobUrlToFile, captureElementAsImage, dataURLtoFile, fixTailwindColor } from '../../utils/helper'
import ThemeSelector from './ThemeSelector'
import Modal from '../../components/Modal'
import { resumeTemplates } from '../../utils/data'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditResume = () => {
    const MySwal = withReactContent(Swal)
    const { resumeId } = useParams()
    const navigate = useNavigate()

    const resumeRef = useRef();
    const resumeDownloadRef = useRef()

    const [baseWidth, setbaseWidth] = useState(800)
    const [openThemeSelector, setopenThemeSelector] = useState(false)
    const [openPreviewModal, setopenPreviewModal] = useState(false)
    const [currentPage, setcurrentPage] = useState("profile-info");
    const [progress, setprogress] = useState(0)
    const [resumeData, setresumeData] = useState({
        title: "",
        thumbnailLink: "",
        profileInfo: {
            profileImg: null,
            profilePreviewUrl: "",
            fullName: "",
            destination: "",
            summary: ""
        },
        contactInfo: {
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            github: "",
            website: ""
        },
        workExperience: [
            {
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",

            }
        ],
        education: [
            {
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",

            }
        ],
        skills: [
            {
                name: "",
                progress: 0,

            }
        ],
        projects: [
            {
                title: "",
                description: "",
                github: "",
                liveDemo: "",

            }
        ],
        certification: [
            {
                title: "",
                issuer: "",
                year: "",

            }
        ],
        languages: [
            {
                name: "",
                progress: 0,

            }
        ],
        interests: [
            ""
        ],
    })

    const [errorMsg, seterrorMsg] = useState("")
    const [isLoading, setisLoading] = useState(false)

    const validateAndNext = () => {
        const errors = []

        switch (currentPage) {
            case "profile-info":
                const { fullName, destination, summary } = resumeData.profileInfo;
                if (!fullName.trim()) errors.push("FUll Name is required");
                if (!destination.trim()) errors.push("Designation is required");
                if (!summary.trim()) errors.push("Summary is required");
                break;
            case "contact-info":
                const { email, phone } = resumeData.contactInfo;
                if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
                    errors.push("Email not valid")
                }
                if (!phone.trim()) {
                    errors.push("Phone number required")
                }
                break;
            case "work-experience":
                resumeData.workExperience.forEach(
                    ({ company, role, startDate, endDate }, index) => {
                        // if (!company.trim()) {
                        //     errors.push(`Company is required in experience ${index + 1}`)
                        // }
                        // if (!role.trim()) {
                        //     errors.push(`Role is required in experience ${index + 1}`)
                        // }
                        // if (!startDate || !endDate) {
                        //     errors.push(`Start Date and End Date is required in experience ${index + 1}`)
                        // }
                    }
                )
                break;
            case "education-info":
                resumeData.education.forEach(({ degree, institution, startDate, endDate }, index) => {
                    if (!degree.trim()) {
                        errors.push(`Degree is required in experience ${index + 1}`)
                    }
                    if (!institution.trim()) {
                        errors.push(`Institution is required in experience ${index + 1}`)
                    }
                    if (!startDate || !endDate) {
                        errors.push(`Start Date and End Date is required in experience ${index + 1}`)
                    }
                }
                )
                break;
            case "skills-info":
                resumeData.skills.forEach(({ name, progress }, index) => {
                    if (!name.trim()) {
                        errors.push(`Skill name is required ${index + 1}`)
                    }
                    if (progress < 1 || progress > 100) {
                        errors.push(`Skill progress must be between 1 and 100 in skills ${index + 1}`)
                    }
                })
                break;

            case "projects-info":
                resumeData.projects.forEach(({ title, description }, index) => {
                    if (!title.trim()) {
                        errors.push(`Title  is required in projects ${index + 1}`)
                    }
                    if (!description.trim()) {
                        errors.push(`Description  is required in projects  ${index + 1}`)
                    }

                })
                break;

            case "certification-info":
                resumeData.certification.forEach(({ title, issuer }, index) => {
                    if (!title.trim()) {
                        errors.push(`Title  is required in certification ${index + 1}`)
                    }
                    if (!issuer.trim()) {
                        errors.push(`Issuer  is required in certification ${index + 1}`)
                    }

                })
                break;
            case "additional-info":
                if (resumeData.languages.length === 0 || !resumeData.languages[0].name?.trim()) {
                    errors.push("Al least one langauge is required")
                }
                if (resumeData.interests.length === 0 || !resumeData.interests[0]?.trim()) {
                    errors.push("Al least one interest is required")
                }
                break;

            default:
                break;



        }
        if (errors.length > 0) {
            seterrorMsg(errors.join(", "));
            return
        }

        seterrorMsg("")
        goToNextStep()
    }
    const goToNextStep = () => {
        const pages = [
            "profile-info",
            "contact-info",
            "work-experience",
            "education-info",
            "skills-info",
            "projects-info",
            "certification-info",
            "additional-info",
        ]

        if (currentPage === "additional-info") setopenPreviewModal(true);

        const currentIndex = pages.indexOf(currentPage)
        if (currentIndex !== -1 && currentIndex < pages.length - 1) {
            const nextIndex = currentIndex + 1;
            setcurrentPage(pages[nextIndex])

            const percent = Math.round((nextIndex / (pages.length - 1)) * 100)
            setprogress(percent)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }



    }
    const goBack = () => {
        const pages = [
            "profile-info",
            "contact-info",
            "work-experience",
            "education-info",
            "skills-info",
            "projects-info",
            "certification-info",
            "additional-info",
        ]
        if (currentPage === "profile-info") navigate("/dashboard");
        const currentIndex = pages.indexOf(currentPage)

        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setcurrentPage(pages[prevIndex])

            const percent = Math.round((prevIndex / (pages.length - 1)) * 100)
            setprogress(percent)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }




    }
    const renderFrom = () => {
        switch (currentPage) {
            case "profile-info":
                return (
                    <ProfileInfoForm
                        profileData={resumeData?.profileInfo}
                        updateSection={(key, value) => {
                            updateSection("profileInfo", key, value);
                        }}
                        onNext={validateAndNext}

                    />
                )
            case "contact-info":
                return (
                    <ContactInfoForm
                        contactInfo={resumeData?.contactInfo}
                        updateSection={(key, value) => {
                            updateSection("contactInfo", key, value);
                        }}
                    />
                )
            case "work-experience":
                return (
                    <WorkExperience
                        workExperience={resumeData?.workExperience}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem("workExperience", index, key, value)
                        }}
                        addArrayItem={(newItem) => { addArrayItem("workExperience", newItem) }}
                        removeArrayItem={(index) => {
                            removeArrayItem("workExperience", index)
                        }}

                    />
                )
            case "education-info":
                return (
                    <EducationDetailsForm
                        educationInfo={resumeData?.education}

                        updateArrayItem={(index, key, value) => {
                            updateArrayItem("education", index, key, value)
                        }}
                        addArrayItem={(newItem) => {
                            addArrayItem("education", newItem)
                        }}
                        removeArrayItem={(index) => {
                            removeArrayItem("education", index)
                        }}
                    />
                )
            case "skills-info":
                return (
                    <SkillsDetailsForm
                        skills={resumeData?.skills}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem("skills", index, key, value)
                        }}
                        addArrayItem={(newItem) => {
                            addArrayItem("skills", newItem)
                        }}
                        removeArrayItem={(index) => {
                            removeArrayItem("skills", index)
                        }}
                    />
                )

            case "projects-info":
                return (
                    <ProjectDetailsForm
                        projects={resumeData?.projects}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem("projects", index, key, value)
                        }}
                        addArrayItem={(newItem) => {
                            addArrayItem("projects", newItem)
                        }}
                        removeArrayItem={(index) => {
                            removeArrayItem("projects", index)
                        }}
                    />
                )

            case "certification-info":
                return (
                    <CertificationDetailsForm
                        certification={resumeData?.certification}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem("certification", index, key, value)
                        }}
                        addArrayItem={(newItem) => {
                            addArrayItem("certification", newItem)
                        }}
                        removeArrayItem={(index) => {
                            removeArrayItem("certification", index)
                        }}
                    />
                )
            case "additional-info":
                return (
                    <AdditionaFrom
                        languages={resumeData?.languages}
                        interests={resumeData?.interests}
                        updateArrayItem={(section, index, key, value) => {
                            updateArrayItem(section, index, key, value)
                        }}
                        addArrayItem={(section, newItem) => {
                            addArrayItem(section, newItem)
                        }}
                        removeArrayItem={(section, index) => {
                            removeArrayItem(section, index)
                        }}
                    />
                )


            default:
                return null
        }
    }
    const updateSection = (section, key, value) => {
        setresumeData((prev) => {
            //     ...prev,
            //     [section]: {
            //         ...prev[section],
            //         [key]: value
            //     },

            // })
            const sectionData = prev[section] || {};

            return {
                ...prev,
                [section]: {
                    ...sectionData,
                    [key]: value,
                },
            };

        }
        )
    }

    const addArrayItem = (section, newItem) => {
        setresumeData((prev) => ({
            ...prev,
            [section]: [...prev[section], newItem],
        }))
    }

    const updateArrayItem = (section, index, key, value) => {
        setresumeData((prev) => {
            const updatedArray = [...prev[section]]

            if (key === null) {
                updatedArray[index] = value;


            }
            else {
                updatedArray[index] = {
                    ...updatedArray[index],
                    [key]: value

                }
            }
            return {
                ...prev,
                [section]: updatedArray,
            }

        })
    }
    const removeArrayItem = (section, index) => {
        setresumeData((prev) => {
            const updatedArray = [...prev[section]]
            updatedArray.splice(index, 1)
            return {
                ...prev,
                [section]: updatedArray,
            }
        })
    }

    const fetchResumeDetailsById = async () => {
        try {
            const response = await axiosInstance.get(API_PATH.RESUME.GET_BY_ID(resumeId))
             
            if (response.data && response.data.profileInfo) {
                const resumeInfo = response.data;
                setresumeData((prevState) => ({
                    ...prevState,
                    title: resumeInfo?.title || "Untitled",
                    template: resumeInfo?.template || prevState?.template,
                    profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
                    contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
                    workExperience: resumeInfo?.workExperience || prevState?.workExperience,
                    education: resumeInfo?.education || prevState?.education,
                    skills: resumeInfo?.skills || prevState?.skills,
                    projects: resumeInfo?.projects || prevState?.projects,
                    certification: resumeInfo?.certification || prevState?.certification,
                    languages: resumeInfo?.languages || prevState?.languages,
                    interests: resumeInfo?.interests || prevState?.interests

                }))
            }
        } catch (error) {
            console.log("eeror fetching resume", error);
        }
    }
    const uploadResumeImages = async () => {
        try {
            setisLoading(true)

            fixTailwindColor(resumeRef.current);

            const imageDataUrl = await captureElementAsImage(resumeRef.current)

            const thumbnailFIle = dataURLtoFile(imageDataUrl, `resume-${resumeId}.png`)
            
            const profileImageUrl = resumeData?.profileInfo?.profilePreviewUrl;
            let profileImageFIle = resumeData?.profileInfo?.profileImg;
            // let cloudinaryProfileUrl = resumeData?.profileInfo?.profilePreviewUrl || "";
            if (profileImageUrl?.startsWith("blob:")) {
                profileImageFIle = await blobUrlToFile(profileImageUrl, `profile-${resumeId}.png`);
                
                URL.revokeObjectURL(profileImageUrl);

            }
            const formData = new FormData()

            

            // if (profileImageFIle instanceof File) {
            //     const cloudFormData = new FormData();
            //     cloudFormData.append("file", profileImageFIle);
            //     cloudFormData.append("upload_preset", "unsigned_preset"); // 🔁 Replace with your actual preset
            //      const cloudinaryRes = await axios.post(
            //     "https://api.cloudinary.com/v1_1/unsigned_preset/image/upload", // 🔁 Replace with your cloud name
            //     cloudFormData
            //     );
            //     cloudinaryProfileUrl = cloudinaryRes.data.secure_url;

            // }


            if (thumbnailFIle) formData.append("thumbnail", thumbnailFIle)
            if (profileImageFIle) {
                formData.append("profileImage", profileImageFIle);
            }

            const uploadResponse = await axiosInstance.put(API_PATH.RESUME.UPLOAD_IMAGE(resumeId), formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
        
            // Update local state with new URLs
            setresumeData((prev) => ({
                ...prev,
                thumbnailLink: thumbnailLink || prev.thumbnailLink,
                profileInfo: {
                    ...prev.profileInfo,
                    profilePreviewUrl: profilePreviewUrl || prev.profileInfo.profilePreviewUrl,
                    // profileImg: null, // Clear the uploaded file
                },
            }));

            await updateResumeDetails(thumbnailLink, profilePreviewUrl )
 
            toast.success("Resume Updated successfully")
            navigate("/dashboard")

        } catch (error) {
            console.error("error uploading images", error)
            toast.error("Failed to upload image")
        } finally {
            setisLoading(false)
        }
    }
    const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
        try {
            setisLoading(true)
            const updatedResumeData = {
                ...resumeData,
                thumbnailLink: thumbnailLink || resumeData.thumbnailLink || "",
                profileInfo: {
                    ...resumeData.profileInfo,
                    profilePreviewUrl: profilePreviewUrl || resumeData.profileInfo.profilePreviewUrl || ""
                },
                templates: {
                    theme: resumeData?.templates?.theme || "default",
                    colorPalette: resumeData?.templates?.colorPalette || []
                }
            };

            await axiosInstance.put(API_PATH.RESUME.UPDATE(resumeId), updatedResumeData)

            // const response = await axiosInstance.put(API_PATH.RESUME.UPDATE(resumeId), {
            //     ...resumeData,
            //     thumbnailLink: thumbnailLink || "",
            //     profileInfo: {
            //         ...resumeData.profileInfo,
            //         profilePreviewUrl: profilePreviewUrl || ""
            //     },
            //     theme: resumeData?.template?.theme || "default",
            //     colorPalette: resumeData?.template?.colorPalette || []



            // })
        } catch (error) {
            console.error("Error capturing image", error);
        } finally {
            setisLoading(false)
        }
    }

    const habdleDeleteConfirm = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this resume!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            handleDeleteResume();
        }
    }
    const handleDeleteResume = async () => {
        try {
            setisLoading(true)

            const response = await axiosInstance.delete(API_PATH.RESUME.DELETE(resumeId))
            toast.success("Resume Deleted Successfully")
            navigate('/dashboard')
        } catch (error) {
            console.error("Error Capturing images", error);
        } finally {
            setisLoading(false)
        }
    }

    const reactToPrintFn = useReactToPrint({
        contentRef: resumeDownloadRef,
        documentTitle: resumeData?.title || "Resume",
        pageStyle: `
    @page {
      size: A4;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      print-color-adjust: exact;
    }
    @media print {
      .resume-preview {
        overflow: hidden !important;
        height: auto !important;
        max-height: none !important;
      }
    }
  `,

    })


    const updateBaseWidth = () => {
        if (resumeRef.current) {
            setbaseWidth(resumeRef.current.offsetWidth)
        }
    }


    useEffect(() => {
        updateBaseWidth()
        window.addEventListener("resize", updateBaseWidth)
       

        if (resumeId) {
            fetchResumeDetailsById()
        }
        return () => {
            window.removeEventListener("resize", updateBaseWidth)
        }

    }, [])



    return (
        <DashboardLayout>
            <div className='container mx-auto  '>
                <div className='flex items-center min-h-10 justify-between gap-5 bg-white rounded-lg border border-violet-300 px-4 m-3  '>
                    <TitleInput
                        title={resumeData.title}
                        setTitle={(value) => {
                            setresumeData((prevState) => ({
                                ...prevState,
                                title: value,
                            }))
                        }}
                    />
                    <div className='flex w-full items-center gap-3  '>
                        <button className='flex items-center gap-1 p-2 bg-cyan-300  hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500 ' onClick={() => { setopenThemeSelector(true) }}>
                            <LuPalette />
                            <span className=' hidden md:block '>Change Theme</span>
                        </button>
                        <button onClick={() => habdleDeleteConfirm()} className='flex items-center gap-1 p-2 bg-cyan-300  hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500 '>
                            <LuTrash2 />
                            <span className=' hidden md:block'>Delete</span>
                        </button>
                        <button onClick={() => setopenPreviewModal(true)} className='flex items-center gap-1 p-2 bg-cyan-300  hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500 '>
                            <LuDownload />
                            <span className=' hidden md:block'>Preview & Download</span>
                        </button>
                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2   '>
                    <div className='p-2 bg-white  overflow-hidden border min-h-screen   border-violet-300  rounded-lg m-2 '>
                        <StepProgress progress={progress} />
                        {renderFrom()}

                        {errorMsg && (
                            <div className='flex bg-yellow-300 p-2 text-yellow-900 items-center gap-3 rounded-lg'>
                                <LuCircleAlert className='' /> {errorMsg}
                            </div>

                        )}
                        <div className='flex items-center gap-3 p-2  md:justify-items-start lg:justify-end'>
                            <button onClick={goBack} disabled={isLoading} className='flex items-center gap-1 p-2 bg-cyan-300  bg-linear-to-l from-blue-300/50 to-cyan-600 hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500 '>
                                <LuArrowLeft /> Back
                            </button>
                            <button onClick={uploadResumeImages} disabled={isLoading} className='flex items-center gap-1 p-2 bg-cyan-300  hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500 '>
                                <LuSave />
                                {isLoading ? "Uploading..." : "Save & Exit"}
                            </button>
                            <button onClick={validateAndNext} disabled={isLoading} className='flex items-center gap-1 p-2 bg-cyan-300 bg-linear-to-r from-blue-300/55 to-cyan-600 hover:bg-cyan-400 rounded-lg hover:cursor-pointer hover:outline-1 hover:outline-cyan-500  '>
                                {currentPage === "additionalInfo" && (
                                    <LuDownload />
                                )}
                                {currentPage === "additionalInfo" ? "Preview & Downlaod" : "Next"}
                                {currentPage !== "additionalInfo" && (
                                    <LuArrowRight />
                                )}
                            </button>
                        </div>

                    </div>


                    <div ref={resumeRef} className='min-h-[100vh]  '>

                        <RenderResume
                            templateId={resumeData?.template?.theme || ""}
                            resumeData={resumeData}
                            colorPalette={resumeData?.template?.colorPalette || ""}
                            containerWidth={baseWidth}
                        />


                    </div>
                </div>



            </div>
            <Modal

                isOpen={openThemeSelector}
                onClose={() => setopenThemeSelector(false)}
                title={"Change Theme"}
            >
                <div className='w-[90vw] h-[80vh] '>
                    <ThemeSelector
                        selectedTheme={resumeData?.template}
                        setSelectedTheme={(value) => {
                            setresumeData((prevState) => ({
                                ...prevState,
                                template: value || prevState.template,

                            }))
                        }}
                        resumeData={null}
                        onClose={() => setopenThemeSelector(false)}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={openPreviewModal}
                onClose={() => setopenPreviewModal(false)}
                title={resumeData.title}
                showActionBtn
                actionBtnText={"Download"}
                actionBtnIcon={<LuDownload />}
                onActionClick={() => reactToPrintFn()}

            >
                <div ref={resumeDownloadRef} role='document' aria-label='Resume Preview' className="resume-preview w-[794px] max-w-full h-[90vh] bg-white mx-auto overflow-auto print:overflow-hidden"
                >
                    <RenderResume
                        templateId={resumeData?.template?.theme || ""}
                        resumeData={resumeData}
                        colorPalette={resumeData?.template?.colorPalette || []}

                    />
                </div>

            </Modal>



        </DashboardLayout>
    )
}

export default EditResume
