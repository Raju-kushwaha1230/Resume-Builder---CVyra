require("dotenv").config()
const express = require('express')
const path = require("path")
const cors = require('cors')
const app= express()
const port = process.env.PORT || 5000;
const connectDb = require('./config/db')
const authRoutes  = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

app.use(cors(
    {
        origin:process.env.CLIENT_URL || "*",
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type',"Authorization"]
    }
))
connectDb()
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/resume",resumeRoutes)

app.use("/uploads",
    express.static(path.join(__dirname, "uploads"),{
        setHeaders:(res, path)=>{
            res.set("Access-Control-Allow-Origin","http://localhost:5173")
        }
    })
)




app.listen(port,()=>{
    console.log(`THe server is running on ${port}`);
})

