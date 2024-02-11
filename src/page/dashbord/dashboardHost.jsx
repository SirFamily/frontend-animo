import React from "react";
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListPet from "./listpet/ListPet";
export default function dashbordHost() {
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
                <h1>Welcome to the HOST panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <ListPet />
            </div>
          </div>

          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the HOST panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <ListPet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
