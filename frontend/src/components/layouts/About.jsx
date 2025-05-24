import React from 'react'
import Navbar from './Navbar'
import profilrpic from '../../assets/profilepic.png'
import Footer from './Footer'
import head from '../../assets/head.jpg'

const About = () => {
    return (
        <div>
            <div className=' sticky top-0 bottom-0 '>
                <Navbar />
            </div>
            <section class="bg-gray-100 py-12 px-6">
                <div class="max-w-5xl mx-auto">
                      <div class="text-center mb-12">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
                        <p class="text-gray-600 mb-6">We're a small team passionate about helping people succeed.</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:w-[50%] sm:w-full mx-auto  items-center gap-4">
                            <div class="text-center flex flex-col items-center">
                                <img src={profilrpic} class="w-50 h-50 rounded-full border-2 border-cyan-300 mb-2" alt="" />
                                <p class="font-medium text-gray-700">Raju Kushwaha</p>
                                <p class="text-sm text-gray-500">Founder & Developer</p>
                            </div>
                            <div class="text-center flex flex-col items-center">
                                <img src="/profile" class="w-50 h-50 rounded-full border-2 border-cyan-300 object-scale-down mb-2" alt="img" />
                                <p class="font-medium text-gray-700">Vaishnavi</p>
                                <p class="text-sm text-gray-500">UI/UX Designer</p>
                            </div>

                        </div>
                    </div>
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold text-gray-800 mb-4">About CVyra</h1>
                        <p class="text-gray-600 text-lg">Empowering job seekers with powerful, elegant, and professional resume tools.</p>
                    </div>


                    <div class="bg-white p-8 rounded-xl shadow-md mb-12">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                        <p class="text-gray-600 leading-relaxed">
                            CVyra was born out of the frustration of using outdated resume tools. We wanted a platform that made building a resume as easy as drag-and-drop,
                            with templates that are both modern and ATS-friendly. Whether you're a fresh graduate or an experienced professional, we built CVyra to help you
                            present yourself confidently.
                        </p>
                    </div>


                    <div class="mb-12">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Choose CVyra?</h2>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="bg-white p-6 rounded-lg shadow-md text-center">
                                <h3 class="font-bold text-xl text-blue-600 mb-2">Easy to Use</h3>
                                <p class="text-gray-600">No tech skills needed. Just choose a template, fill in your info, and you're done!</p>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow-md text-center">
                                <h3 class="font-bold text-xl text-green-600 mb-2">Modern Templates</h3>
                                <p class="text-gray-600">Choose from designer-quality templates optimized for all industries.</p>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow-md text-center">
                                <h3 class="font-bold text-xl text-purple-600 mb-2">100% Customizable</h3>
                                <p class="text-gray-600">Tailor every element — from colors to fonts — to fit your personal brand.</p>
                            </div>
                        </div>
                    </div>



                  



                    <div class="text-center mt-16">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Ready to build your dream resume?</h2>
                        <a href="/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                            Get Started Now
                        </a>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}

export default About
