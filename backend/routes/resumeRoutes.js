const express = require("express")
const router = express.Router()
const {createResume, getUserProfile, getResumeById, updateResume, deleteResume } = require('../controllers/resumeController')
const {protect } = require('../middlewares/authMiddleware')
const { uploadResumeImages } = require("../controllers/uploadImages")




router.post("/",protect, createResume)
router.get('/',protect , getUserProfile)
router.get("/:id",protect,getResumeById)
router.put("/:id",protect,updateResume)
router.put("/:id/upload-images",protect, uploadResumeImages)

router.delete("/:id",protect, deleteResume)


module.exports = router;