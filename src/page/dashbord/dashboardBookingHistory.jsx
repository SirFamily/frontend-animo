import React, { useState } from "react";
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import ListHistory from "./ListBookingHistory/ListHistory";
import ListRequestHistory from "./ListBookingHistory/ListRequestHistory";

export default function DashboardBookingHistory() {
  const [selectedPanel, setSelectedPanel] = useState("HistoryBooking"); // Default to "HistoryBooking" panel

  return (
    <div className={DashCss.container}>
      <div className={DashCss.containerDash}>
        {/* ส่วนของเมนูdashboard */}
        <Menu />
        {/* สิ่นสุดส่วนของเมนูdashboard */}
        <div className={DashCss.boxBord}>
          {/* <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the HistoryBooking panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <ListHistory />
            </div>
          </div>

          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the HistoryRequest panel!</h1>
                <div className={DashCss.line}></div>
              </div>
              <div className={DashCss.boxListPet}>
                <ListRequestHistory />
              </div>
            </div>
          </div> */}

          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <div>
                  Select Panel:{" "}
                  <select
                    value={selectedPanel}
                    onChange={(e) => setSelectedPanel(e.target.value)}
                  >
                    <option value="HistoryBooking">HistoryBooking Panel</option>
                    <option value="HistoryRequest">HistoryRequest Panel</option>
                  </select>
                </div>
                <div className={DashCss.line}></div>
              </div>

              {selectedPanel === "HistoryBooking" && (
                <>
                  <h1>Welcome to the HistoryBooking panel!</h1>
                  <div className={DashCss.line}></div>
                  <ListHistory />
                </>
              )}

              {selectedPanel === "HistoryRequest" && (
                <>
                  <h1>Welcome to the HistoryRequest panel!</h1>
                  <div className={DashCss.line}></div>
                  <div className={DashCss.boxListPet}>
                    <ListRequestHistory />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
