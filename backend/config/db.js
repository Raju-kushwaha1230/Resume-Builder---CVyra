const mongoose= require('mongoose')

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{})
        console.log("MongoDb is connected");
    }catch(err){
        console.log("MongoDb getting error",err);
    }
}

module.exports = connectDb