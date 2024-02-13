import React, { useState, useEffect } from "react";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListPet from "./listpet/ListPet";
import Menu from "./menu/menu";
import useAuth from "../../hooks/useAuth";
import AddPet from "./listpet/addPet";

export default function dashbord() {
  const { user } = useAuth();
  const id = user.id;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
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
                <div className={DashCss.listPet} onClick={togglePopup}>
                  <div className={DashCss.AddPet} style={{}}>
                    <div className={DashCss.add}>+</div>
                    <div className={DashCss.text} style={{ color: `#A4D9E0` }}>
                      เพิ่มสัตว์เลี้ยง
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <AddPet onClose={togglePopup} />}
    </div>
  );
}
