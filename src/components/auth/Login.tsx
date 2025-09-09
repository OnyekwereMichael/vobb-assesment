import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Building2, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

// ✅ Firebase
import { auth } from "../Firebase/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInSchema } from "@/lib/validation";

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  //  Validation schema
  const validationSchema = signInSchema;

  
  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      toast({
        title: "Login Successful",
        description: `Welcome back ${user.displayName || "User"}!`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="relative z-10 flex flex-col justify-center">
    <div className="mb-12">
      <Link
        to="/"
        className="inline-flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <h1 className="text-4xl lg:text-3xl font-bold leading-tight mb-6">
        Sign In
      </h1>
      <p className="text-xl text-white/90 mb-12">
        Join your team's requirements management platform
      </p>

      {/* ✅ Feature Highlights */}
      <ul className="space-y-4 text-white/90 mb-12">
        <li className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
          <span>Track all deals and projects in one place</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
          <span>Visualize progress with Kanban & Table views</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
          <span>Generate performance reports & analytics</span>
        </li>
        <li className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
          <span>Collaborate seamlessly with your team</span>
        </li>
      </ul>

      {/* ✅ Quick Stats (optional) */}
    
    </div>
  </div>
</div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background max-sm:p-0">
        <div className="w-full">
          <Card className="border-0 ">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* ✅ Formik Form */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Corporate Email</Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-12 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:text-primary-hover transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover"
                    >
                      {isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-primary hover:text-primary-hover font-medium transition-colors"
                        >
                          Create Account
                        </Link>
                      </span>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
