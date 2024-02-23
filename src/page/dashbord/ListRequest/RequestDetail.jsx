import React from 'react';
import ModelPopup from "../../../component/ModelPopup";
import axios from 'axios';

export default function RequestDetail({ onClose, data }) {
const id = data.status_booking[0].id
const idBH =  data.booking_history[0].id
const status = data.status_booking[0].bookingStatus;
    const  hdlConfirmed = async () =>{
        try{

              const token = localStorage.getItem("token");
              const response = await axios.put(`http://localhost:8112/booking/accept/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (response.status === 200) {
                alert("อัพเดตเรียบร้อย");
              }
        }catch(error){
            console.log(error);
        }
    }

    const  hdlCancel = async () =>{
        try{

              const token = localStorage.getItem("token");
              const response = await axios.put(`http://localhost:8112/booking/reject/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (response.status === 200) {
                alert("อัพเดตเรียบร้อย");
              }
        }catch(error){
            console.log(error);
        }
    }

    const  hdlComplete = async () =>{
        try{

              const token = localStorage.getItem("token");
              const response = await axios.put(`http://localhost:8112/booking/Complete/${id}/${idBH}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (response.status === 200) {
                alert("อัพเดตเรียบร้อย");
              }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
      <ModelPopup>
        <div>{data.room.roomName}</div>
        <img src={data.user.img_profile} alt="" style={{ width: '150px', height: '100px' }} />
        <div>{data.user.firstName} {data.user.lastName}</div>
        <div>{data.user.identityNumber}</div>
        <div>{data.user.address}</div>
        <div>{data.user.city}</div>
        <div>{data.user.district}</div>
        <div>{data.user.email}</div>
        <div>{data.user.phone}</div>
          <div>
            {data.pets_count_booking.map((petBooking) => (
              <div key={petBooking.id}>
                {petBooking.pet && (
                  <>
                  <hr />
                  <img src={petBooking.pet.urlImgPet} alt="" style={{ width: '150px', height: '100px' }} />
                  <div>{petBooking.pet.petName}</div>
                  <div>{petBooking.pet.gender}</div>
                  <div>{petBooking.pet.petType}</div>
                  <div>{petBooking.pet.birthDate}</div>
                  <div>{petBooking.pet.weight}</div>
                  <div>{petBooking.pet.height}</div>
                  <div>{petBooking.pet.color}</div>
                  <div>{petBooking.pet.healthStatus}</div>
                  </>
                )}
              </div>
            ))}
          </div>
     <div>Totle price{data.totalPrice}</div>

     {status === 'PENDING' && (
          <>
            <button onClick={hdlCancel}>cancel</button>
            <button onClick={hdlConfirmed}>confirm</button>
          </>
        )}

        {status === 'CONFIRMED' && (
          <button onClick={hdlComplete}>เชคเอ้า</button>
        )}

        <button onClick={onClose}>Close</button>
      </ModelPopup>
    </div>
  );
}
