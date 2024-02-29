import React, { useState, useEffect } from "react";
import axios from "axios";
import DashCss from "../dashbordCss/DashCss.module.css";
import RequestDetail from "./RequestDetail";

export default function ListRequest() {
  const [listRequest, setListRequest] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const togglePopup = (booking) => {
    setSelected(booking);
    setPopupOpen(!isPopupOpen);
  };


  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/booking/request`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setListRequest(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    getData();
  }, []);

return (
  <div>
    {listRequest.map((host) =>
      host.Bookings.map((booking) => {
        if (booking.status_booking[0].bookingStatus === "CONFIRMED" || booking.status_booking[0].bookingStatus === "PENDING") {
          return (
            <div key={booking.id} className={DashCss.listPet} onClick={() => togglePopup(booking)}>
              <div>
                <div>ชื่อห้อง: {booking.room.roomName}</div>
                <div>ชื่อเจ้าของสัตว์เลียง: {booking.user.firstName} {booking.user.lastName}</div>
                <div>จำนวนสัตว์ที่เข้าพัก: {booking.pets_count_booking.length}</div>
                <div>วันเวลา: {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</div>
                <div>Status: {booking.status_booking[0].bookingStatus}</div>
              </div>
            </div>
          );
        } else {
          return null; 
        }
      })
    )}
    {isPopupOpen && (
      <RequestDetail onClose={togglePopup} data={selected} />
    )}
  </div>
);

}
