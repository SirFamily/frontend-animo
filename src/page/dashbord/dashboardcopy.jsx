import React from "react";
import DashCss from "./dashbordCss/DashCss.module.css";

import Menu from "./menu/menu";

export default function dashbordcopy() {
  return (
    
      <div className={DashCss.containerDash}>
        {/* ส่วนของเมนูdashboard */}
        <Menu />
        {/* สิ่นสุดส่วนของเมนูdashboard */}
      </div>

  );
}
