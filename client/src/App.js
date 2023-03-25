import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  const [auth, setAuth] = useState(false);
  return <RouterProvider router={router} setAuth={setAuth}></RouterProvider>;
}

export default App;
