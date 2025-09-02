import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: RegisterData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && RegisterData) {
      toast.success(RegisterData.message || "signUp successful");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "signup failed");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "login failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "login successful");
      navigate("/");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    RegisterData,
    loginError,
    registerError,
  ]);
  return (
    <div className="flex items-center justify-center w-full mt-20">
      <div className="flex flex-col w-full max-w-sm gap-6 ">
        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    placeholder="Eg. Gopal Shukla"
                    required="true"
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    placeholder="Eg. xyz@gmail.com "
                    required="true"
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    placeholder="Eg xyz"
                    required="true"
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Login your password here. After signup. you'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    placeholder="Eg xyz@gmail.com"
                    required="true"
                    onChange={changeInputHandler}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    placeholder="Eg xyz"
                    required="true"
                    onChange={changeInputHandler}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
