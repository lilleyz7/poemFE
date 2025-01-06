import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NavLink } from "react-router";
import { CheckAuth } from "@/lib/checkUser";
import { useNavigate } from "react-router";
import { RegistrationFormValues } from "@/types/RegistrationFormValues";

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>();

  const navigate = useNavigate()

  const isLoggedIn = CheckAuth();
  if (isLoggedIn){
    navigate("/")
  }

  const onSubmit = async (data: RegistrationFormValues) => {
    const url = "http://localhost:5158/api/Auth/Register"
    const submitData = {
      email: data.email,
      username: data.username,
      password: data.password,
      passwordConfirmation: data.password
    }
    const options = {
      method: "POST",
      headers: {
        "accept": '*/*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData)
    }

    try{
      console.log(options.body)
      const response = await fetch(url, options)
      if (response.status == 200){
        alert("Successfully registered")
        navigate("/login")
      }
    } catch(e){
      alert("Failed to register... Try again: " + e)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                maxLength={50}
                min={7}
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
  )}
            </div>
            <div>
              <Input
                type="text"
                maxLength={24}
                min={7}
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
    <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
  )}
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
            <div>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.passwordConfirmation && (
    <p className="text-red-600 text-sm mt-1">{errors.passwordConfirmation.message}</p>
  )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center">
            Already have an account? <NavLink to="/login" className="text-blue-600">Login</NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationForm;
