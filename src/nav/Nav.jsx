import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="flex flex-row justify-around mt-[50px]">
        <div>
          <NavLink to="/" className="text-black text-3xl font-bold font-sans">
            <div>
              <span className="text-teal-200">A</span>nimo
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to="/login" className="">
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-[25px] bg-teal-200 px-5 py-3 
            justify-center w-44 h-14 text-white ml-10
            text-white text-lg font-medium font-sans">
            Register
          </NavLink>
        </div>
      </nav>
    </>
  );
}
