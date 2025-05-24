import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer class="bg-gray-900 text-white py-10 px-6" >
                <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">


                    <div>
                        <h2 class="text-2xl font-bold mb-2">CVyra</h2>
                        <p class="text-gray-400">Build professional resumes in minutes with stunning templates and AI assistance.</p>
                    </div>


                    <div>
                        <h3 class="font-semibold mb-2">Quick Links</h3>
                        <ul class="text-gray-400 space-y-1">
                            <li><a href="/about" class="hover:underline">About</a></li>
                            <li><a href="#features" class="hover:underline">Features</a></li>
                            <li><a href="#templates" class="hover:underline">Templates</a></li>
                            <li><a href="#how-it-works" class="hover:underline">How It Works</a></li>
                            <li><a href="#faq" class="hover:underline">FAQs</a></li>
                        </ul>
                    </div>


                    <div>
                        <h3 class="font-semibold mb-2">Connect with Us</h3>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="text-blue-600 hover:text-white transition duration-200">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-blue-400 hover:text-white transition duration-200">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-pink-500 hover:text-white transition duration-200">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-red-600 hover:text-white transition duration-200">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>


                <div class="mt-10 text-center text-gray-500 text-sm">
                    &copy; 2025 CVyra. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Footer