import React from 'react'
import Menu from "./menu/menu";

import DashCss from "./dashbordCss/DashCss.module.css";
import ListRequest from './ListRequest/ListRequest';

export default function dashboardRequest() {
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
              <h1>Welcome to the Request panel!</h1>
              <div className={DashCss.line}></div>
            </div>
            <div className={DashCss.boxListPet}>
            <ListRequest />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
