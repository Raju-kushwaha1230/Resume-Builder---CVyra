const express =require('express')

const { registerUser, loginUser, getUserProfile} = require('../controllers/authController')
const { protect } = require('../middlewares/authMiddleware')

// const upload = require("../middlewares/uploadMiddleware")

const router = express.Router()
const { upload } = require("../config/cloudinary");

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile",protect,getUserProfile)

router.post("/upload-image",upload.single("image"),( req, res )=>{
    if(!req.file){
        return res.status(400).json({message:"NO file Uploaded"})
    }
    
    res.status(200).json({ imageUrl : req.file.path })
})

module.exports = router