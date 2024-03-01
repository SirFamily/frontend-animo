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
                  booking.status_booking[0].bookingStatus === "CANCELLED")) 
                  ||
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

          <div>
            <div>{`โรงแรม ${history.host.hostName}`}</div>
            <div>{`ห้อง ${history.room.roomName}`}</div>
            <div>{`จำนวน ${history.pets_count_booking.length} ตัว`}</div>
            <div>{`เข้าพัก ${new Date(history.checkInDate).toLocaleDateString()}  ถึง ${new Date(history.checkOutDate).toLocaleDateString()} `}</div>
            <div>{`สถานะ: ${history.status_booking[0].bookingStatus}`}</div>
          </div>
        </div>
      ))}
    </div>
    
    </div>
  )
}
