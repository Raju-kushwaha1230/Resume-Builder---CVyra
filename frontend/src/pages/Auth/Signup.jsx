import React , {useState} from 'react'
import Input from '../../components/inputs/Input'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const Signup = ({setcurrentPage}) => {

  const [profilePic, setprofilePic] = useState("")
  const [email, setemail] = useState("")
  const [FullName, setFullName] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  const [error, seterror] = useState(null)

  const { updateUser } = useContext(UserContext)


  const handleSignUp = async(e)=>{
    e.preventDefault();

    if(!profilePic){
      seterror("Please upload a profile picture")
      return
    }
    if(!email){
      seterror("Please enter a valid email")
      return
    }
    if(!FullName){
      seterror("Please enter your full name")
      return
    }
    if(!password){
      seterror("Please enter a password")
      return
    }
    if(password.length < 6){
      seterror("Password must be at least 6 characters")
      return
    }
    seterror("")
    try {
      let profileImageUrl =""
      if(profilePic){
          const imgUploadRes = await uploadImage(profilePic)
          profileImageUrl = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER,{
        name:FullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if(token){
        localStorage.setItem("token",token)
        updateUser(response.data)
        navigate("/dashboard")
      }

      
    } catch (error) {
        if (error.response && error.response.data.message) {
        seterror(error.response.data.message)
      } else {
        seterror("Something went wronge")
      }
      
    }
  }
  
  return (
    <div>
      <div className='min-w-2xl min-h-[50vh] '>
        <h1 className='text-3xl font-semibold text-center'>Signup</h1>
        <p className='text-center text-sm'>Create a new account</p>
          <form onSubmit={handleSignUp} className='flex flex-col space-y-4 mt-4'>
            <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
            <Input
          value={FullName}
          onChange={({target})=>{setFullName(target.value)}}
          label="Full Name"
          placeholder="Raju Kushwaha"
          type="text"

          />
            <Input
          value={email}
          onChange={({target})=>{setemail(target.value)}}
          label="Email Address"
          placeholder="mighty@gmail.com"
          type="text"

          />
            <Input
          value={password}
          onChange={({target})=>{setpassword(target.value)}}
          label="Password"
          placeholder="mighty@098"
          type="password"

          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}

   
           <button className='p-2 bg-blue-500  rounded-lg hover:bg-cyan-600 hover:cursor-pointer'>SignUp</button>
       
          <p className='text-center text-sm'>Already have an account? <span onClick={()=>{setcurrentPage("login")}} className='text-blue-500 hover:cursor-pointer'>Login</span></p>
          

          </form>
       </div>
    </div>
  )
}

export default Signup