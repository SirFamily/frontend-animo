import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "../nav/Nav";
import useAuth from "../hooks/useAuth";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";

import HostList from "../page/Booking/HostList";



const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Home />
        <Outlet />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

const userRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <HostList />
          <Outlet />
        </>
      ),
    },
  ]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter
  return <RouterProvider router={finalRouter} />;
}
