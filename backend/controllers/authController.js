const User  = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateTOken = (userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'});
}

const registerUser = async (req,res)=>{
    try{
        const {name,email,password,profileImageUrl} = req.body;
        const userExist = await User.findOne({email});
        
        if(userExist){
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name, email, password:hashedPassword, profileImageUrl
        })

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateTOken(user._id)
        })

    }catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;

        const userExist = await User.findOne({email:email});
        if(!userExist){
            res.status(401).json({message:"User doesn't exist!.."})
            return
        }
        const match = await bcrypt.compare(password,userExist.password);
        if(!match){
           return  res.status(401).json({message:"Password Incorrect!..."})
        }

        res.json({
            _id:userExist._id,
            name:userExist.name,
            email:userExist.email,
            profileImageUrl:userExist.profileImageUrl,
            token:generateTOken(userExist._id),
            message:"Logged In"
            
        })

    }catch(err){
        res.status(501).json({message:"server error", error: err.message})
    }


}
const getUserProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            res.status(401).json({message:"user not found"})
        }
        res.json(user)
    }catch(err){
        res.status(501).json({message:"server error", error: err.message})

    }
}

module.exports = { registerUser, loginUser, getUserProfile };