import React from "react";
import { Link } from "react-router-dom";
import DashCss from "../dashbordCss/DashCss.module.css";
export default function menu() {
  return (
    <>
      <div className={DashCss.menu}>
        <Link to="/dashboard/pet">
          <div className={DashCss.listMenu}>
            <div className={DashCss.textMenu}>Pet</div>
          </div>
        </Link>
        <Link to="/dashboard/host">
          <div className={DashCss.listMenu}>
            <div className={DashCss.textMenu}>Host</div>
          </div>
        </Link>
        <Link to="/dashboard/booking">
          <div className={DashCss.listMenu}>
            <div className={DashCss.textMenu}>Booking</div>
          </div>
        </Link>
        <Link to="/dashboard/setting">
          <div className={DashCss.listMenu}>
            <div className={DashCss.textMenu}>Setting</div>
          </div>
        </Link>
      </div>
    </>
  );
}
