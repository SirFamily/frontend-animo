import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavCss from "./css/Nav.module.css";
export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    setIsOpen((prevState) => !prevState);
  };

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  const guestNav = [
    {
      text: (
        <>
          <div className={NavCss.flex}>
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/register" className={NavCss.bt_register}>
              Register
            </Link>
          </div>
        </>
      ),
    },
  ];

  const userNav = [
    {
      text: (
        <>
          <div ref={dropdownRef} className={NavCss.dropdown}>
            <div onClick={handleClick} className={NavCss.dropdown_toggle}>
              <img src={user.img_profile} alt={user.firstName} className={NavCss.imgprofile}/>
              <div className={NavCss.btprofile}>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                    {user.email}
                  </div>
              </div>
            </div>
            {isOpen && (
              <ul className={NavCss.dropdown_menu}>
                <li className={NavCss.dropdown_menuli}>
                  <Link to="/dashboard/pet">Dashboard</Link>
                </li>
                <li className={NavCss.dropdown_menuli}>
                  <Link to="/dashboard/setting">Settings</Link>
                </li>
                <li className={NavCss.dropdown_menuli}>
                  <button onClick={hdlLogout} className="">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <nav className={NavCss.container_flex}>
        <div>
          <Link to="/" className={NavCss.brand_text}>
            <div>
              <span className={NavCss.text_blue}>A</span>nimo
            </div>
          </Link>
        </div>

        <div className={NavCss.container_box}>
          {user?.id ? (
            <>
              {userNav.map((item, index) => (
                <div key={index}>{item.text}</div>
              ))}
              {/* <div><button onClick={hdlLogout} className="">
                Logout
              </button></div> */}
            </>
          ) : (
            guestNav.map((item, index) => <div key={index}>{item.text}</div>)
          )}
        </div>
      </nav>
    </>
  );
}
