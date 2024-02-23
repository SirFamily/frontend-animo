import React from "react";
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListHistory from "./ListBookingHistory/ListHistory";
import ListRequestHistory from "./ListBookingHistory/ListRequestHistory";

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

          <div className={DashCss.bord}>
          <div className={DashCss.inBord}>
            <div>
              <h1>Welcome to the Room panel!</h1>
              <div className={DashCss.line}></div>
            </div>
            <div className={DashCss.boxListPet}>
             <ListRequestHistory />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
