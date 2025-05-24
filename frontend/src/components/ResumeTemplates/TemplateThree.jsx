import React, { useEffect, useRef, useState } from 'react'
import { LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser } from 'react-icons/lu'
import { RiLinkedinLine } from 'react-icons/ri'
import ContactInfo from '../ResumeSection/ContactInfo'
import EducationInfo from '../ResumeSection/EducationInfo'
import { formatYearMonth } from '../../utils/helper'
import LanguageSection from '../ResumeSection/LanguageSection'
import WorkExperience from '../ResumeSection/WorkExperience'
import ProjectInfo from '../ResumeSection/ProjectInfo'
import SkillsSection from '../ResumeSection/SkillsSection'
import CertificationInfo from '../ResumeSection/CertificationInfo'

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"]

const Title = ({ text, color }) => {
  return (
    <div className='relative w-fit mb-2'>
      <span className=' absolute bottom-0 left-0 w-full h-1.5  ' style={{ backgroundColor: color }}  ></span>
      <h2 className={` relative  font-bold  `} > {text} </h2>
    </div>
  )
}
const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {

  const themeColor = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null)

  const [baseWidth, setbaseWidth] = useState(800)
  const [scale, setscale] = useState(1)

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setbaseWidth(actualBaseWidth);
    setscale(containerWidth / baseWidth)
  }, [containerWidth])


  return (
    <div className='p-2 bg-white  w-[100%]  h-auto   '  ref={resumeRef} style={{
      transform: containerWidth > 0 ? `scale(${scale} )` : null,
      transformOrigin: " top left ",
      width: containerWidth > 0 ? `${baseWidth}px` : "auto",
      height: "auto",
    }}>

      <div className=' flex    items-center     ' style={{ backgroundColor: themeColor[10] }} >
        <div className='  rounded-full  flex items-center justify-center border-3  ' style={{ borderColor: themeColor[1] }} >
          {resumeData?.profileInfo.profilePreviewUrl ? (
            <img className=' w-[100px] h-[90px] rounded-full  ' src={resumeData.profileInfo.profilePreviewUrl} alt="" />
          ) : (
            <div className=' w-[100px] h-[100px] flex items-center justify-center text-5xl rounded-full ' style={{ backgroundColor: themeColor[4] }} >
              <LuUser />
            </div>

          )}
        </div>
        <div className=' flex flex-col items-start w-full  pl-10  '>
          <h2 className=' text-3xl font-bold mt-3 font-mono ' > {resumeData.profileInfo.fullName} </h2>
          <p className=' text-lg font-medium text-center '> {resumeData.profileInfo.destination} </p>
          <div className='grid grid-cols-2 gap-1 pt-1  justify-around w-full items-center  '>
            <ContactInfo
              icon={<LuMail />}
              iconBg={themeColor[2]}
              vlaue={resumeData.contactInfo.email}

            />
            <ContactInfo
              icon={<LuPhone />}
              iconBg={themeColor[2]}
              vlaue={resumeData.contactInfo.phone}
            />
            <ContactInfo
              icon={<LuMapPinHouse />}
              iconBg={themeColor[2]}
              vlaue={resumeData.contactInfo.location}
            />



            {resumeData.contactInfo.github &&
              <ContactInfo
                icon={<LuGithub />}
                iconBg={themeColor[2]}
                vlaue={resumeData.contactInfo.github}

              />

            }

            {resumeData.contactInfo.linkedin &&
              <ContactInfo
                icon={<RiLinkedinLine />}
                iconBg={themeColor[2]}
                vlaue={resumeData.contactInfo.linkedin}

              />
            }
            
             {resumeData.contactInfo.website &&
              <ContactInfo
                icon={<LuRss />}
                iconBg={themeColor[2]}
                vlaue={resumeData.contactInfo.website}

              />
            }

          </div>


        </div>

      </div>
      <div className=' h-0.5 bg-gray-500 w-full my-1 mb-2  '></div>

      <div className=' grid grid-cols-12 gap-7 '>
        <div className=' col-span-4 p-2 ' style={{ backgroundColor: themeColor[0] }} >
          <div className='mt-3'>
            <Title text={"Education"} color={themeColor[1]} />

            {resumeData.education && resumeData.education.map((data, index) => (
              <EducationInfo
                key={`education_${index}`}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(
                  data.startDate
                )} - ${formatYearMonth(data.endDate)}`}
              />
            ))}
          </div>

          <div className='mt-4 '>
            <Title text={"Language"} color={themeColor[1]} />

            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColor[3]}
              bgColor={themeColor[2]}

            />
          </div>

          <div className='mt-4'>
            <div className='mt-4'>
              <Title text={"Certifications"} color={themeColor[1]} />

              <div className='grid grid-cols-1 gap-2 p-1'>
                {resumeData?.certification?.map((certificate, index) => (
                  <CertificationInfo
                    key={`certificate_${index}`}
                    title={certificate.title}
                    issuer={certificate.issuer}
                    year={certificate.year}
                    bgColor={themeColor[2]}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='mt-4'>
            {resumeData.interests.length > 0 && resumeData.interests[0] != "" && (<div className='mt-4'>
              <Title text={"Interests"} color={themeColor[1]} />

              <div className='grid grid-cols-3 gap-4 mt-4'>
                {resumeData.interests.map((interest, index) => {
                  if (!interest) return null;
                  return (
                    <div key={`interest_${index}`} className=' text-[12px] font-medium py-1 px-3 rounded-lg ' style={{ backgroundColor: themeColor[2] }}  >
                      {interest}
                    </div>
                  )
                })}
              </div>
            </div>)}
          </div>
        </div>
        <div className=' col-span-8   pr-2 pb-2 '>
          <div>
            <Title text={"Professional Summary"} color={themeColor[1]} />

            <p className=' text-sm font-medium  pr-2 '> {resumeData.profileInfo.summary} </p>
          </div>
          <div className='mt-3'>
            <Title text={"Work Experience"} color={themeColor[1]} />

            {resumeData.workExperience.map((data, index) => {
              return (
                <WorkExperience
                  key={`work_${index}`}
                  company={data.company}
                  role={data.role}
                  duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                  durationColor={themeColor[4]}
                  description={data.description}
                />
              )
            })}
          </div>

          <div className='mt-3'>
            <Title text={"Projects"} color={themeColor[1]} />

            {resumeData?.projects.map((project, index) => (
              <ProjectInfo
                key={`project_${index}`}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColor[2]}

              />
            ))}
          </div>

          <div className='mt-3'>
            <Title text={"Skills"} color={themeColor[1]} />

            <SkillsSection
              skills={resumeData.skills}
              accentColor={themeColor[3]}
              bgColor={themeColor[2]}
            />
          </div>






        </div>
      </div>
    </div>
  )
}

export default TemplateThree
