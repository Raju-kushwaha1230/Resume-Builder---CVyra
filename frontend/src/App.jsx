import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import EditResume from './pages/ResumeUpdate/EditResume'
import CreateResumeForm from './pages/Home/CreateResumeForm'
import About from './components/layouts/About'
import { Toaster } from 'react-hot-toast'
import './App.css'
import UserProvider  from './context/userContext'



function App() {


  return (
    <UserProvider>


      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<CreateResumeForm />} />
          <Route path="/resume/:resumeId" element={<EditResume />} />
          <Route path='/about' element={ <About /> } />

        </Routes>
      </ Router >

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "15px",
          }
        }}
      />

    </UserProvider>
  )
}

export default App
