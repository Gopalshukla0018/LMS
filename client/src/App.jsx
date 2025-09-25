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
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/Courses/CourseDetail";

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
        path: "course-detail/:id",
        element: <CourseDetail />,
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
          {
            path: "courses/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />,
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
