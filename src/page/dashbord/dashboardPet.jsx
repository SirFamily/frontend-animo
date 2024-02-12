import React, { useEffect } from "react";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListPet from "./listpet/ListPet";
import Menu from "./menu/menu";
import useAuth from "../../hooks/useAuth";

export default function dashbord() {
  const { user } = useAuth();
  const id = user.id;
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
              <div className={DashCss.boxListPet}>
                <ListPet id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
