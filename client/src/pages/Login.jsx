import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/authSlice";
import GoogleLoginButton from "@/components/GoogleLoginButton";

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
  const dispatch = useDispatch();
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

  // Normal Registration/Login Handler
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  // --- NEW FEATURE: Guest Demo Login Handler ---
  const handleDemoLogin = async () => {
    const demoData = {
      email: "test@gmail.com",
      password: "test123",
    };
   
    setLoginInput(demoData);

    await loginUser(demoData);
  };

  useEffect(() => {
    if (registerIsSuccess && RegisterData) {
      toast.success(RegisterData.message || "Signup successful");
      dispatch(userLoggedIn(RegisterData));
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup failed");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful");
      dispatch(userLoggedIn(loginData));
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromQuery = searchParams.get("tab");
  const tabFromState = location.state?.tab;
  const initialTab = tabFromState || tabFromQuery || "login";

  return (
    <div className="flex items-center justify-center w-full mt-20">
      <div className="flex flex-col w-full max-w-sm gap-6 ">
        <Tabs defaultValue={initialTab}>
          <TabsList className="w-full">
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          {/* SIGNUP TAB */}
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    placeholder="Eg. Gopal Shukla"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    placeholder="Eg. xyz@gmail.com "
                    required={true}
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    placeholder="Eg xyz"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div>
                  <Select
                    value={signupInput.role}
                    onValueChange={(value) =>
                      setSignupInput({ ...signupInput, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
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

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Login directly or use the Guest Demo to explore.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    placeholder="Eg xyz@gmail.com"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "login")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    placeholder="Eg xyz"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "login")}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full"
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* --- NEW GUEST LOGIN BUTTON --- */}
                <Button
                  variant="outline"
                  disabled={loginIsLoading}
                  onClick={handleDemoLogin}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 font-bold text-white transition-all duration-300 ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-indigo-500/50 animate-pulse hover:animate-none hover:scale-105"
                >
                  🚀 Login as Guest (Recruiter Demo)
                </Button>
              </CardFooter>
              <CardFooter>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
              </CardFooter>
              <CardFooter>
                <GoogleLoginButton />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
