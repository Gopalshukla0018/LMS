import { Button } from "@/components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";

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
          </>
        ),
      },
      {
        path: "login",
        element:<Login/>
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
