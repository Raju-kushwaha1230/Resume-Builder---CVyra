const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

const createResume = async(req, res) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImage:null,
        previewUrl: "",
        fullName: "",
        destination: "",
        summary: "",
      },
      contactInfo:{
        email:"",
        phone:"",
        location:"",
        linkedin:"",
        github:"",
        website:""
    },
     workExperience:[
        {
            company:"",
            role:"",
            startDate:"",
            endDate:"",
            description:""
        }
    ],
    education:[
        {
            degree:"",
            institution:"",
            startDate:"",
            endDate:""
        }
    ],
    skills:[
        {
            name:"",
            progress:0
        }
    ],
    projects:[
        {
            title:"",
            description:"",
            github:"",
            liveDemo:""
        }
    ],
    certification:[
        {
            title:"",
            issuer:"",
            year: ""
        }
    ],
    languages:[
        {
            name:"",
            progress:0
        }
    ],
    interests:[""],
    };

    const newResume = await Resume.create({
        userId: req.user._id,
        title,
        ...defaultResumeData,
    });

    res.status(201).json(newResume)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: err.message });
  }
};

const getUserProfile = async (req, res) => {
    try {

        const resume = await Resume.find({userId: req.user._id}).sort({
            updatedAt:-1
        })
        res.json(resume)
    } catch (error) {
         res
      .status(500)
      .json({ message: "Failed to get resume", error: error.message });
    }

};

const getResumeById = async (req, res) => {
    try {
        const resume  = await Resume.findOne({_id: req.params.id, userId: req.user._id})
        if(!resume){
            res.status(400).json({message:"Resume not found"})
        }
        res.json(resume)
    } catch (error) {
        res
      .status(500)
      .json({ message: "Failed to get resume", error: error.message });
    }
};

const updateResume = async (req, res) => {
    try {

        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id})
        if(!resume){
            res.status(400).json({message:"Resume not found"})
        }

        Object.assign(resume,req.body)
        const savedResume = await resume.save();

        res.json(savedResume)
        
    } catch (error) {
          res
      .status(500)
      .json({ message: "Failed to get resume", error: error.message });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id})
        if(!resume){
            res.status(400).json({message:"Resume not found"})
        }
        const uploadsFolders = path.join(__dirname,"..",'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadsFolders, path.basename(resume.thumbnailLink))
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail)
            }
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile = path.join(uploadsFolders, path.basename(resume.profileInfo.profilePreviewUrl))
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
        }
        
        const deleted = await Resume.findByIdAndDelete({_id: req.params.id , userId: req.user._id })

        if(!deleted){
            return res.status(401).json({message:"Resume not found or unathorized"})
        }

        res.json({message:"Resume deleted successfully!..."})

    } catch (error) {
        res
      .status(500)
      .json({ message: "Failed to get resume", error: error.message });
    }

};

module.exports = {
  createResume,
  getUserProfile,
  getResumeById,
  updateResume,
  deleteResume,
};
