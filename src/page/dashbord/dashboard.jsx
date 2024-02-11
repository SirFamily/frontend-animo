import React from "react";
import DashCss from "./dashbordCss/DashCss.module.css";
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
        <div className={DashCss.bord}>
          <div className={DashCss.inBord}>
            <div>
              <h1>Welcome to the admin panel!</h1>
              <p>
                Here you can manage your website, add new posts and much more.
              </p>
              <div className={DashCss.line}></div>
            </div>
            <div className={DashCss.boxListPet}>
              <div className={DashCss.listPet}>
                <div
                  className={DashCss.descPet}
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
                  }}
                >
                  <div className={DashCss.text}>ข้าวเจ้า</div>
                </div>
              </div>
              <div className={DashCss.listPet}>
                <div
                  className={DashCss.descPet}
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
                  }}
                >
                  <div className={DashCss.text}>ข้าวเจ้า</div>
                </div>
              </div>

              <div className={DashCss.listPet}>
                <div
                  className={DashCss.descPet}
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
                  }}
                >
                  <div className={DashCss.text}>ข้าวเจ้า</div>
                </div>
              </div>
              <div className={DashCss.listPet}>
                <div
                  className={DashCss.descPet}
                  style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
                  }}
                >
                  <div className={DashCss.text}>ข้าวเจ้า</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
