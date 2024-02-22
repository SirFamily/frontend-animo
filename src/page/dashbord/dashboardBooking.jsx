import React from 'react'
import Menu from './menu/menu'
import DashCss from './dashbordCss/DashCss.module.css'
import ListBooking from './ListBooking/ListBooking'
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
            <ListBooking />
          </div>
        </div>

        <div className={DashCss.bord}>
          <div className={DashCss.inBord}>
            <div>
              <h1>Welcome to the BookingHistory history panel!</h1>
              <div className={DashCss.line}></div>
            </div>
  
  
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
