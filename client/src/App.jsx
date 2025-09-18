import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/courses";
import MyLearning from "./pages/student/MyLearning";
import EditProfile from "./pages/student/EditProfile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCours from "./pages/admin/course/AddCours";
import EditCourse from "./pages/admin/course/EditCourse";

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
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      // admin routes start from here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "courses",
            element: <CourseTable />,
          },
          {
            path: "courses/create",
            element: <AddCours />,
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />,
          },
        ],
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
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
