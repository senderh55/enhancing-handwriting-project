import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      {
        path: "login",
        element: <SignInSide />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
