import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

export const UserContext = createContext()

const UserProvider = ({children})=>{

  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(null);

  useEffect(() => {
    if(user) return;

    const accessToken = localStorage.getItem("token");

    if(!accessToken){
      setloading(false)
      return;
    }
    const fetchUser = async()=>{
      try {
        const response = await  axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
        setuser(response.data)
      } catch (error) {
        console.error("user not authenticated",error)
      }finally{
        setloading(false)
      }
    }
    fetchUser()


  }, [])
  
  const updateUser = (userData)=>{
    setuser(userData);
    localStorage.setItem("token", userData.token);
    setloading(false)
  }

  const clearUser = ()=>{
    setuser(null),
    localStorage.removeItem("token");


  }

  return (
    <UserContext.Provider value={{user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;