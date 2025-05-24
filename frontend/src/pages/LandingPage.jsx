import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import Login from './Auth/login'
import Signup from './Auth/signup'
import UserCard from '../components/cards/UserCard'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react'
import hero from '../assets/hero.png'
import templateone from '../assets/templateone.png'
import templateTwo from '../assets/templateTwo.jpg'
import templateThree from '../assets/templateThree.jpg'
import Footer from '../components/layouts/Footer'
const LandingPage = () => {

    const navigate = useNavigate()
    const [openAuthModal, setopenAuthModal] = useState(false)
    const [currentPage, setcurrentPage] = useState("login")
    const { user } = useContext(UserContext)



    const templates = [
        {
            name: "Modern Tech",
            image: templateone,
            tags: ["Tech", "Clean", "1-Page"]
        },
        {
            name: "Creative Edge",
            image: templateTwo,
            tags: ["Creative", "Colorful", "2-Page"]
        },
        {
            name: "Classic Pro",
            image: templateThree,
            tags: ["Traditional", "Black & White", "ATS-Friendly"]
        }
    ];





    const handleCLI = () => {
        if (!user) {
            setopenAuthModal(true)
        } else {
            navigate("/dashboard")
        }


    }

    return (
        <div >
            <div className='flex  w-[100%]   sticky top-0 z-30  justify-around items-center space-x-4 h-19 bg-[#ffffff] shadow-2xs hover:shadow-lg'>
              
                 <h1 className='text-2xl text-blue-600 font-semibold hover:text-cyan-500 hover:cursor-pointer transition-colors'>CVyra</h1>
                
            

                <div className='flex items-center justify-between lg:w-[18%] sm:w-[40%] '>
                    <div>
                         <p className='text-lg lg:pr-3 sm:pr-10 text-gray-600 font-semibold hover:text-blue-400 cursor-pointer ' onClick={()=> navigate('/about')} >About</p>
                    </div>
                   <div className='flex items-center '>
                     {user ? <UserCard /> :
                        <button onClick={() => { setopenAuthModal(true) }} className='bg-blue-500 text-white px-4 font-semibold  py-2 rounded-md hover:bg-cyan-600 hover:cursor-pointer  transition-colors '>Login / Signup</button>
                    }
                   </div>
                </div>




            </div>
            <div className='grid grid-cols-1  md:grid-cols-2 justify-center items-center  min-h-[45vh]   rounded-lg mt-7'>
                <div className='flex flex-col p-2 items-center  '>
                    <h1 className='text-3xl md:text-4xl font-semibold  text-center  leading-tight'>Create a  <span className='bg-clip-text text-transparent bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'> Job-Winning Resume in Minutes</span></h1>
                    <p className='p-4 text-lg text-gray-600 '>Build your resume effortlessly with our modern templates</p>
                    <button className='bg-black p-2 px-3 text-white  rounded-lg hover:bg-gradient-to-l hover:bg-gray-900 hover:cursor-pointer ' onClick={handleCLI} >Start Building</button>
                    <p class="text-sm text-gray-500 p-5">⭐ 4.9/5 Rating • Trusted by +9999 users</p>

                </div>
                <div className='grid grid-cols-1 bg-cyan-300  '>
                    <img src={hero} className='  ' alt="Resume Preview" />

                </div>
            </div>

            <section class="bg-gray-100 py-16" id="features">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900">Powerful Features to Build Your Dream Resume</h2>
                        <p class="mt-4 text-gray-600">Everything you need to create a standout professional resume, fast and for free.</p>
                    </div>

                    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">


                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                            <div class="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">Customizable Templates</h3>
                            <p class="mt-2 text-gray-600">Choose from modern, clean, and professional resume templates tailored for every industry.</p>
                        </div>


                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                            <div class="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">One-Click Export</h3>
                            <p class="mt-2 text-gray-600">Download your resume instantly in PDF format—ready to share with recruiters and apply for jobs.</p>
                        </div>


                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                            <div class="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5l4 4-12 12h-4v-4l12-12z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">Live Preview</h3>
                            <p class="mt-2 text-gray-600">See your resume take shape in real-time as you fill out your details with our live preview editor.</p>
                        </div>

                    </div>
                </div>
            </section>
            <section class="bg-white py-16" id="how-it-works">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900">How It Works</h2>
                        <p class="mt-4 text-gray-600">Create your professional resume in just 3 simple steps.</p>
                    </div>

                    <div class="grid gap-10 md:grid-cols-3 text-center">


                        <div class="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                            <div class="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
                                1
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">Enter Your Details</h3>
                            <p class="mt-2 text-gray-600">Fill in your personal information, education, experience, and skills using our easy forms.</p>
                        </div>


                        <div class="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                            <div class="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full text-2xl font-bold mb-4">
                                2
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">Choose a Template</h3>
                            <p class="mt-2 text-gray-600">Pick from a variety of stunning, professional resume templates that suit your style.</p>
                        </div>


                        <div class="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                            <div class="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full text-2xl font-bold mb-4">
                                3
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">Download & Share</h3>
                            <p class="mt-2 text-gray-600">Export your resume as a PDF and start applying to jobs instantly with confidence.</p>
                        </div>

                    </div>
                </div>
            </section>
            <div className="py-12 bg-gray-100"  id='templates'>
                <h2 className="text-3xl font-bold text-center mb-4">Explore Our Resume Templates</h2>
                <p className="text-center text-gray-600 mb-10">A variety of modern, professional, and creative templates. Choose your style.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                    {/* Template Card */}
                    {templates.map((template, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img src={template.image} alt={`Template ${index + 1}`} className="w-full h-72 object-contain" />
                            <div className="p-4">
                                <h3 className="font-semibold text-xl mb-2">{template.name}</h3>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {template.tags.map((tag, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section class="bg-gray-100 py-12 px-4" id='faq'>
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

                    <div class="space-y-4">

                        <details class="bg-white p-4 rounded-lg shadow-sm">
                            <summary class="cursor-pointer font-semibold text-lg">Is the resume builder free to use?</summary>
                            <p class="mt-2 text-gray-600">Yes! You can create and download your resume for free. Premium templates are available with additional features.</p>
                        </details>

                        <details class="bg-white p-4 rounded-lg shadow-sm">
                            <summary class="cursor-pointer font-semibold text-lg">Can I edit my resume after downloading it?</summary>
                            <p class="mt-2 text-gray-600">Absolutely! You can come back, log in, and update your resume anytime.</p>
                        </details>

                        <details class="bg-white p-4 rounded-lg shadow-sm">
                            <summary class="cursor-pointer font-semibold text-lg">Are the templates ATS-friendly?</summary>
                            <p class="mt-2 text-gray-600">Yes, all templates are designed to be Applicant Tracking System (ATS) compatible.</p>
                        </details>

                        <details class="bg-white p-4 rounded-lg shadow-sm">
                            <summary class="cursor-pointer font-semibold text-lg">Can I customize fonts and colors?</summary>
                            <p class="mt-2 text-gray-600">Yes, you can fully customize the font style, size, and color of your resume to suit your preferences.</p>
                        </details>
                    </div>
                </div>
            </section>

            <Footer />
            





            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setopenAuthModal(false)
                    setcurrentPage("login")
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
                    {currentPage === "signup" && <Signup setcurrentPage={setcurrentPage} />}
                </div>
            </Modal>
        </div>
    )



}

export default LandingPage