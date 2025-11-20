import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
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
import CourseProgress from "./pages/student/Courses/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

// import { ThemeProvider } from "./components/ThemeProvider"; removed from here
// protected  components
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import SuperAdminDashboard from "./pages/superAdmin/superAdminDashboard";
import superAdminRoutes from "./components/superAdminRoutes";
import SuperAdminRoutes from "./components/superAdminRoutes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public routes
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "course/search", element: <SearchPage /> },
      { path: "course-detail/:id", element: <CourseDetail /> },

      // User protected routes
      {
        element: <ProtectedRoutes />, // Parent wrapper
        children: [
          { path: "my-learning", element: <MyLearning /> },
          { path: "my-learning/:courseId", element: <CourseProgress /> },
          { path: "edit-profile", element: <EditProfile /> },
        ],
      },

      // Admin protected routes
      {
        path: "admin",
        element: (
          <AdminRoutes>
            <Sidebar />
          </AdminRoutes>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "courses", element: <CourseTable /> },
          { path: "courses/create", element: <AddCours /> },
          { path: "courses/:courseId", element: <EditCourse /> },
          { path: "courses/:courseId/lecture", element: <CreateLecture /> },
          {
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
          {
            path: "super-dashboard",
            element: (
              <SuperAdminRoutes>
                <SuperAdminDashboard />
              </SuperAdminRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <RouterProvider router={appRouter} />
      </main>
    // </ThemeProvider>
  );
}

export default App;
