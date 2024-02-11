import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="flex flex-row justify-around mt-[50px]">
        <div>
          <Link to="/" className="text-black text-3xl font-bold font-sans">
            <div>
              <span className="text-teal-200">A</span>nimo
            </div>
          </Link>
        </div>

        <div>
          <Link to="/login" className="">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-[25px] bg-teal-200 px-5 py-3 
            justify-center w-44 h-14 text-white ml-10
            text-white text-lg font-medium font-sans"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
}
