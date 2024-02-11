import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'

export default function Nav() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  const guestNav = [
    {
      text: (
        <>
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
        </>
      ),
    },
  ];

  const userNav = [
    {
      text: (
        <>
          <div className="flex flex-row justify-around " >Profile {user?.id ? user.firstName : 'Guest'}</div> 
        </>
      ),
    },
  ];

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

        <div className="flex flex-row justify-around gap-4">
          {user?.id ? (
            <>
              {userNav.map((item, index) => (
                <div key={index}>{item.text}</div>
              ))}
              <div><button onClick={hdlLogout} className="">
                Logout
              </button></div>
              
            </>
          ) : (
            guestNav.map((item, index) => (
              <div key={index}>{item.text}</div>
            ))
          )}
        </div>
      </nav>
    </>
  );
}
