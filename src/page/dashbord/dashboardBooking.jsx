import React from 'react'
import Menu from './menu/menu'
import ListPet from './listpet/ListPet'
import DashCss from './dashbordCss/DashCss.module.css'
export default function dashboardBooking() {
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
              <h1>Welcome to the Booking panel!</h1>
              <div className={DashCss.line}></div>
            </div>
            <ListPet />
          </div>
        </div>

        <div className={DashCss.bord}>
          <div className={DashCss.inBord}>
            <div>
              <h1>Welcome to the Booking history panel!</h1>
              <div className={DashCss.line}></div>
            </div>
            <ListPet />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
