import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "../nav/Nav";
import useAuth from "../hooks/useAuth";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";

import HostList from "../page/Booking/HostList";
import Dashbord from "../page/dashbord/dashboard";
import DashbordHost from "../page/dashbord/dashboardHost";
import DashboardBooking from "../page/dashbord/dashboardBooking";





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

          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <HostList /> },
        { path: '/dashboard/pet', element: <Dashbord />,},
        { path: '/dashboard/host', element: <DashbordHost />,},
        { path: '/dashboard/booking', element: <DashboardBooking />,},
          
    
      ]
    },
  ]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter
  return <RouterProvider router={finalRouter} />;
}
