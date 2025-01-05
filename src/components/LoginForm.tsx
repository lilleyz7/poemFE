import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NavLink } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data); // Replace with actual login logic
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
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
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
