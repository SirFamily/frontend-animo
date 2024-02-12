import React from "react";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListPet from "./listpet/ListPet";
import img from "../../assets/image (14).png";
import catIcon from "../../assets/cat.svg";
import Menu from "./menu/menu";

export default function dashbord() {
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
                <h1>Welcome to the pet panel!</h1>
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
