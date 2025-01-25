import { AddPoemForm } from "@/components/AddPoemCard"
import Navbar from "@/components/NavBar"
import { CheckAuth } from "@/lib/checkUser"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const AddPoemPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      async function checkLogged(){
      const isLoggedIn = await CheckAuth()
        if (!isLoggedIn){
          navigate("/")
        }}
        checkLogged()
    }, [navigate])
    
    return(
    <>
        <Navbar/>
        <AddPoemForm/>
    </>)
}

