import React, { useState, useEffect } from "react";
import axios from "axios";
import DashCss from "../dashbordCss/DashCss.module.css";

export default function ListBooking() {
  const [listBooking, setListBooking] = useState([]);

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
        const pendingBookings = response.data.filter(
            (booking) =>
              booking.status_booking.length > 0 &&
              (booking.status_booking[0].bookingStatus === "PENDING"||
              booking.status_booking[0].bookingStatus === "CONFIRMED")
          );
        setListBooking(pendingBookings);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {listBooking.map((booking) => (
        <div key={booking.id} className={DashCss.listPet}>
      

          <div>
            <div>{`โรงแรม ${booking.host.hostName}`}</div>
            <div>{`ห้อง ${booking.room.roomName}`}</div>
            <div>{`จำนวน ${booking.pets_count_booking.length} ตัว`}</div>
              <div>{`เข้าพัก ${new Date(booking.checkInDate).toLocaleDateString()} ถึง ${new Date(booking.checkOutDate).toLocaleDateString()}`}</div>
      <div>Status: {booking.status_booking.length > 0 ? booking.status_booking[0].bookingStatus : 'N/A'}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
