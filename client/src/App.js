import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import CreateProfile from "./pages/CreateProfile";
import ProfileDashboard from "./pages/ProfileDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <Home /> },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "createProfile",
        element: <CreateProfile />,
      },
      {
        path: "profileDashboard",
        element: <ProfileDashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
