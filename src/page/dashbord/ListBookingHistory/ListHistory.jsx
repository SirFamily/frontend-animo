import React, { useState, useEffect } from "react";
import axios from "axios";
import DashCss from "../dashbordCss/DashCss.module.css";

export default function ListHistory() {
    const [listBookingHistory, setListBookingHistory] = useState([]);

    useEffect(() => {
      const getData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8112/booking/bookings`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const filteredData = response.data.filter(
            (booking) =>
              (booking.status_booking.length > 0 &&
                (booking.status_booking[0].bookingStatus === "CONPLETED" ||
                  booking.status_booking[0].bookingStatus === "CANCELLED")) &&
              booking.booking_history.length > 0 &&
              booking.booking_history[0].checkOutDatetime !== null
          );
          setListBookingHistory(filteredData);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      };
  
      getData();
    }, []);
  
  return (
    <div>
          <div>
      {listBookingHistory.map((history) => (
        <div key={history.id} className={DashCss.listPet}>
          <div
            className={DashCss.descPet}
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }) lightgray 50% / cover no-repeat`,
            }}
          >
            <div className={DashCss.text}>{history.host.hostName}</div>
          </div>

          <div>
            <div>{`โรงแรม ${history.host.hostName}`}</div>
            <div>{`ห้อง ${history.room.roomName}`}</div>
            <div>{`จำนวน ${history.pets_count_booking.length} ตัว`}</div>
            <div>{`เข้าพัก ${history.checkInDate} ถึง ${history.checkOutDate}`}</div>
            <div>{`สถานะ: ${history.status_booking[0].bookingStatus}`}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
