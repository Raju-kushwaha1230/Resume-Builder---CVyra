
import templateone from '../assets/templateone.png'
import templateTwo from '../assets/templateTwo.jpg'
import templateThree from '../assets/templateThree.jpg'


export const resumeTemplates = [
    {
        id: '01',
        thumbnailImg :templateone,
        colorPaletteCode : "themeOne"
    },
    {
         id: '02',
        thumbnailImg : templateTwo,
        colorPaletteCode : "themeTwo"
    },
    {
         id: '03',
        thumbnailImg : templateThree,
        colorPaletteCode : "themeThree"
    }
]


export const themeColorPalette ={
    themeOne : [
       
        ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"], 

        ["#E9FBF8", "#84EFED", "#93E2DA", "#2AC9A0", "#3D4C5A"],
        ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#857901", "#48485C"],
        ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
        ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
        ["#F9FAFB", "#E4E7EB", "#CBD5E8", "#7F9CF5", "#203748"], 

        ["#F4FFFD", "#D3FDF2", "#80E904", "#34C790", "#384C48"],
        ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
        ["#F9FCFF", "#E3F0F9", "#CODDEE", "#6CA6CF", "#46545E"],
        ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FF0000", "#57534E"], 
        ["#EFFCFF", "#C8F0FF", "#99E0FF", "#0078A7", "#283A42"],

        ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
        ["#E3F2FD", "#98CAF9", "#a8d2f4", "#1E88E5", "#0047A1"],
    ]
}

export const DUMMY_RESUME_DATA = {
    profileInfo :{
        profileImgUrl: null,
        profilePreviewUrl : "",
        fullName : "Raju Kush",
        destination : "Senior Software Developer",
        summary: " Passionate nad result-driven developer with 4+ years of experience building full stack web app"
    },
    contactInfo :{
        email:
            "mightyraju@gmail.com",
        phone:
            "+91 6205713942",
        location:
            " Sector 234 Mohali , Hyderabad",
        linkedin:
            "https://www.linkedin.com/in/raju-kushwaha-b2314124b/",
        github:
            "https://github.com/Raju-kushwaha1230",
        website:
            "https://raju-kushwaha1230.github.io/Portfolio-Raju/",
    },
    workExperience : [
        {
            company:"Facebook",
            role: "Frontend Developer",
            startDate: "2024-01",
            endDate: "2025-03",
            description: "I worked on Reactjs and Tailwindcss ",
        },
    ],

    education : [
         {
            degree:
            "Btech in CSE",
            institution:
            "GNIT , Hyderabad",
            startDate:
            "2023-08",
            endDate:
            "2027-08"
        },
    
    ],
    skills : [
        {
                        
         name :"Python",
        progress:60

        },
        {              
         name :"Java",
        progress:69
        },
        {              
         name :"Javascript",
        progress:78
        },
        {              
         name :"Django",
        progress:87
        },
    ],
    projects :[
        {
                    
        title:
        "Full Stack MERN Blog App",
        description:
        "This is a MERN (MongoDB, Express.js, React, Node.js) based blog application.",
        github:
        "https://github.com/Raju-kushwaha1230/Full-Stack-MERN-Blog-App",
        liveDemo: "",

        },
        {
                    
        title:
        "🚀 PersonaX",
        description:
        "A Next.js-powered futuristic user profile and social interaction platform",
        github:
        "https://github.com/Raju-kushwaha1230/PersonaX-",
        liveDemo: "https://persona-x-red.vercel.app/",

        }
    ],
    certification: [
        {
            title: "full stack development",
            issuer: "GWJ",
            year: "2024"
            
        },
         {
            title: "Hackthone Runner up",
            issuer: "HWM",
            year: "2024"
            
        }
    ],
     languages: [
        {
            name: "English",
            progress : 89
           
        },
        {
            name: "Hindi",
             progress : 96
           
        }, {
            name: "Nepali",
            progress : 90
           
        }
    ],
    interests: [
        "Reading",
        "Conding",
        "Camping"
    ]



}