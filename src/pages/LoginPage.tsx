import LoginForm from "@/components/LoginForm"
import Navbar from "@/components/NavBar"
import { CheckAuth } from "@/lib/checkUser"
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
      async function checkLogged(){
      const isLoggedIn = await CheckAuth()
        if (isLoggedIn){
          navigate("/")
        }}
        checkLogged()
    }, [navigate])
    return (
        <div>
            <Navbar/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage