import React, { useState, useEffect } from "react";
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import useAuth from "../../hooks/useAuth";
import ListHost from "./ListHost/ListHost";
import ListRoom from "./ListRoom/ListRoom";

export default function dashbordHost() {
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
                <h1>Welcome to the Host panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <div className={DashCss.boxListPet}>
                <ListHost userId={id} />
              </div>
            </div>
          </div>

          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the Room panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <div className={DashCss.boxListPet}>
                <ListRoom userId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
