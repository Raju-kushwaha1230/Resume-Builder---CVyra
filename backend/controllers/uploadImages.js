// const fs =require("fs")
// const path = require('path')
// const upload = require("../middlewares/uploadMiddleware")
// const Resume = require("../models/Resume")

// const uploadResumeImages =async (req, res)=>{
//     try {

//         upload.fields([{name:"thumbnail"}, { name: "profileImage"}])(req, res, async(err)=>{
//             if(err){
//                 return res.status(400).json({message:"File upload failed" , error: err.message})
//             }
//         })
//         const resumeId = req.params.id;
//         const resume = await Resume.findOne({_id: resumeId , userId: req.user._id}) 

//         if(!resume){
//             return res.status(400).json({message:"Resume not Found or unauthorized"})
//         }

//         const uploadsFolders = path.join(__dirname, ".." , "uploads")
//         const baseUrl = `${req.protocol}://${req.get("host")}`;

//         const newThumbnail =   req.files.thumbnail?.[0];
//         const newProfileImage = req.files.profileImage?.[0];

//         if(newThumbnail){
//             if(resume.thumbnailLink){
//                 const oldThumbnail  = path.join(uploadsFolders,path.basename(resume.thumbnailLink) )
//                 if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail)
//             }

//             resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
            
//         }


//         if(newProfileImage){
//             if(resume.profileInfo?.profilePreviewUrl){
//                 const oldProfile = path.join(uploadsFolders, path.basename(resume.profileInfo.profilePreviewUrl))
//                 if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
         
//             }
//             resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`
//         }
//         await resume.save()
//         res.status(200).json({
//             message:"Image uploaded successfully",
//             thumbnailLink: resume.thumbnailLink,
//             profilePreviewUrl: resume.profileInfo.profilePreviewUrl


//         })
//     } catch (error) {
//         res.status(500).json({message:
//         "failed to upload image", error: error.message
//         })
//     }
// }


// module.exports = { uploadResumeImages }



const upload = require('../middlewares/uploadCloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const Resume = require('../models/Resume');

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload failed', error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(400).json({ message: 'Resume not found or unauthorized' });
      }

      let thumbnailLink = "";
      let profilePreviewUrl = "";

      if (req.files.thumbnail?.[0]) {
        const newThumbnail = req.files.thumbnail[0];

        if (resume.thumbnailPublicId) {
          await cloudinary.uploader.destroy(resume.thumbnailPublicId);
        }

        const uploadedThumb = await cloudinary.uploader.upload(newThumbnail.path, {
          folder: "resume_images",
        });

        thumbnailLink = uploadedThumb.secure_url;
        resume.thumbnailLink = uploadedThumb.secure_url;
        resume.thumbnailPublicId = uploadedThumb.public_id;
      }

      
      // Upload new profile image to Cloudinary
      if (req.files.profileImage?.[0]) {
        const newProfileImage = req.files.profileImage[0];

        if (resume.profileInfo?.profilePublicId) {
          await cloudinary.uploader.destroy(resume.profileInfo.profilePublicId);
        }

        const uploadedProfile = await cloudinary.uploader.upload(newProfileImage.path, {
          folder: "profile_images",
        });

        profilePreviewUrl = uploadedProfile.secure_url;
        resume.profileInfo = {
          ...resume.profileInfo,
          profilePreviewUrl: uploadedProfile.secure_url,
          profilePublicId: uploadedProfile.public_id
        };
      }


      await resume.save();

      res.status(200).json({
        message: 'Image uploaded successfully',
        thumbnailLink,
        profilePreviewUrl
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

module.exports = { uploadResumeImages }