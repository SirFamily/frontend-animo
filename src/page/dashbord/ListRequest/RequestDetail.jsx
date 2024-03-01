import React from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";
import RequestCss from "./css/RequestDetailCss.module.css";

export default function RequestDetail({ onClose, data }) {
  const id = data.status_booking[0].id;
  const idBH = data.booking_history[0].id;
  const status = data.status_booking[0].bookingStatus;
  const hdlConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8112/booking/accept/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("อัพเดตเรียบร้อย");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8112/booking/reject/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("อัพเดตเรียบร้อย");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hdlComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8112/booking/Complete/${id}/${idBH}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("อัพเดตเรียบร้อย");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ModelPopup>
        <div className={RequestCss.container}>
          <div className={RequestCss.container_info}>
            <div>
              <div className={RequestCss.textname}>
                Room : {data.room.roomName}
              </div>
              <img
                className={RequestCss.petImage}
                src={data.user.img_profile}
              />
              <div>
                Owner : {data.user.firstName} {data.user.lastName}
              </div>
              <div>Email : {data.user.email}</div>
              <div>Phone : {data.user.phone}</div>
              <div>Address : {data.user.address}</div>
              <div>City : {data.user.city}</div>
              <div>District : {data.user.district}</div>
            </div>
            <div>
              {data.pets_count_booking.map((petBooking) => (
                <div key={petBooking.id}>
                  {petBooking.pet && (
                    <>
                      <img
                        src={petBooking.pet.urlImgPet}
                        className={RequestCss.petImage}
                      />
                      <div className={RequestCss.text_info}>
                        <div>Pet Name : {petBooking.pet.petName}</div>
                        <div>Gender : {petBooking.pet.gender}</div>
                        <div>Pet type : {petBooking.pet.petType}</div>
                        <div>
                          BirtDay :{" "}
                          {new Date(
                            petBooking.pet.birthDate
                          ).toLocaleDateString()}
                        </div>
                        <div>weight : {petBooking.pet.weight}</div>
                        <div>height : {petBooking.pet.height}</div>
                        <div>color : {petBooking.pet.color}</div>
                        <div>HealthStatus : {petBooking.pet.healthStatus}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div>
              Totle price{" "}
              <span className={RequestCss.hightext}>{data.totalPrice}</span>
            </div>
          </div>
        </div>

        {status === "PENDING" && (
          <>
            <button className={RequestCss.btc} onClick={hdlCancel}>
              cancel
            </button>
            <button className={RequestCss.btb} onClick={hdlConfirmed}>
              confirm
            </button>
          </>
        )}

        {status === "CONFIRMED" && (
          <button className={RequestCss.btb} onClick={hdlComplete}>
            Check out
          </button>
        )}

        <button className={RequestCss.btc} onClick={onClose}>
          Close
        </button>
      </ModelPopup>
    </div>
  );
}
