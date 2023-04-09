import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import ProfileOperation from "./pages/ProfileOperation";

import ProfileDashboard from "./pages/ProfileDashboard";
import Practice from "./pages/Practice";
import ChangePassword from "./pages/ChangePassword";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
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
        path: "changePassword",
        element: <ChangePassword />,
      },
      {
        path: "profileOperation",
        element: <ProfileOperation />,
      },
      {
        path: "profileDashboard",
        element: <ProfileDashboard />,
      },
      {
        path: "practice",
        element: <Practice />,
      },
    ],
  },
]);

function App() {
  // load the matirial ui style after rendering the app

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <RootLayout />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
