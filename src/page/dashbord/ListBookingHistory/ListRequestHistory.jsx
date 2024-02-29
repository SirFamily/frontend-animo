import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashCss from "../dashbordCss/DashCss.module.css";

export default function ListRequest() {
  const [listRequest, setListRequest] = useState([]);

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
        if (booking.status_booking[0].bookingStatus === "CANCELLED" || booking.status_booking[0].bookingStatus === "COMPLETED") {
          return (
            <div key={booking.id} className={DashCss.listPet}>
              <div>
                <div>ชื่อห้อง: {booking.room.roomName}</div>
                <div>ชื่อผู้เข้าพัก: {booking.user.firstName} {booking.user.lastName}</div>
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
  </div>
  );
}

{/* <div>
{listRequest.map((booking) => (
  <div key={booking.id} className={DashCss.listPet}>
    <div>
      <div>ชื่อห้อง: {booking.room.roomName}</div>
      <div>
        ชื่อผู้เข้าพัก: {booking.user.firstName} {booking.user.lastName}
      </div>
      <div>จำนวนสัตว์ที่เข้าพัก: {booking.pets_count_booking.length}</div>
      <div>
        วันเวลา: {new Date(booking.checkInDate).toLocaleDateString()} -{' '}
        {new Date(booking.checkOutDate).toLocaleDateString()}
      </div>
      <div>Status: {booking.status_booking[0].bookingStatus}</div>
    </div>
  </div>
))}
</div> */}