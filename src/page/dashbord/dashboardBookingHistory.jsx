import React from "react";
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListHistory from "./ListBookingHistory/ListHistory";

export default function dashboardBookingHistory() {
  return (
    <div className={DashCss.container}>
      <div className={DashCss.containerDash}>
        {/* ส่วนของเมนูdashboard */}
        <Menu />
        {/* สิ่นสุดส่วนของเมนูdashboard */}
        <div className={DashCss.boxBord}>
          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the Profile panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <ListHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}