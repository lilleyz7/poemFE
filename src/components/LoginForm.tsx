import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NavLink } from "react-router";
import LoginResponse from "@/types/LoginResponse";
import { CheckAuth } from "@/lib/checkUser";
import { LoginFormValues } from "@/types/LoginFormValues";


const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();

  const isLoggedIn = CheckAuth()
  if (isLoggedIn){
    navigate("/")
  }

  const onSubmit = async (data: LoginFormValues) => {
    const url = import.meta.env.VITE_BASE_API_AUTH_URL
    const loginEndpoint = url + "/login"

    const responseBody = {
      username: data.username,
      password: data.password
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody)
    }

    try{
      const response = await fetch(loginEndpoint, options)
      const authTokens: LoginResponse = await response.json() 
      Cookies.set("access", authTokens.access, {expires: 1})
      if (authTokens.refresh){
        Cookies.set("refresh", authTokens.refresh, {expires: 7})
      }
      alert("Signed in")
      navigate("/")

    } catch(e){
      alert("Failed to login with error: " + e)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
  )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center">
            Don’t have an account? <NavLink to="/register" className="text-blue-600">Register</NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
