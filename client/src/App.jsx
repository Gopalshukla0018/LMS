import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/courses";
import MyLearning from "./pages/student/MyLearning";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* courses */}
            <Courses/>
          </>
        ),
      },
      {
        path: "login",
        element:<Login/>
      },
      {
        path: "my-learning",
        element:<MyLearning/>
      },
    ],
  },
]);

function App() {
  return (
    <main>
      {/* <Navbar />
      <HeroSection />
      <Login /> */}
      <RouterProvider router={appRouter}/>
    </main>
  );
}

export default App;
