import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";
import RoomDetailCss from "./css/RoomDetailCss.module.css";
import defaultImageUrl from "../../../assets/picture.png";

export default function RoomDetail({ onClose, selectedRoomEdit }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const [editedRoomData, setEditedRoomData] = useState({ ...selectedRoomEdit });
  const hostId = editedRoomData.hostId;
  const roomId = editedRoomData.id;

  const hdlEditClick = () => {
    setIsEditMode(true);
  };
  const hdlCancelClick = () => {
    setIsEditMode(false);
  };
  const hdlChange = (e) => {
    setEditedRoomData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSaveClick = async (e) => {
    e.preventDefault();

    const requestData = {
      roomName: editedRoomData.roomName,
      description: editedRoomData.description,
      maximumAnimal: editedRoomData.maximumAnimal,
      pricePerNight: editedRoomData.pricePerNight,
      typeRoom: editedRoomData.typeRoom,
    };

    try {
      const token = localStorage.getItem("token");
      const rs = await axios.put(
        `http://localhost:8112/p/user/host/room/update/room/${roomId}/host/${hostId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (rs.status === 200) {
        alert("เปลียนแปลงสำเร็จ");
        setIsEditMode(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hdlDelClick = async () => {
    try {
      if (!confirm("Press a button!")) {
        return;
      }

      const token = localStorage.getItem("token");
      const rs = await axios.delete(
        `http://localhost:8112/p/user/host/room/room/${roomId}/host/${hostId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (rs.status === 200) {
        alert("ลบสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ModelPopup>
      <div className={RoomDetailCss.container}>
        {isEditMode ? (
          <>
            <img
              src={
                editedRoomData.rooms_img[0]
                  ? editedRoomData.rooms_img[0]?.urlImg
                  : defaultImageUrl
              }
              alt={`Room ${editedRoomData.roomName}`}
              className={RoomDetailCss.petImage}
            />
            <div className={RoomDetailCss.container_info}>
              <input
                placeholder="Name"
                type="text"
                name="roomName"
                className={RoomDetailCss.textname}
                value={editedRoomData.roomName}
                onChange={hdlChange}
                required
              />

              <input
                placeholder="description"
                type="text"
                name="description"
                value={editedRoomData.description}
                onChange={hdlChange}
              />

              <input
                placeholder="maximumAnimal"
                type="text"
                name="maximumAnimal"
                value={editedRoomData.maximumAnimal}
                onChange={hdlChange}
              />

              <input
                placeholder="pricePerNight"
                type="text"
                name="pricePerNight"
                value={editedRoomData.pricePerNight}
                onChange={hdlChange}
              />
              <input
                placeholder="typeRoom"
                type="text"
                name="typeRoom"
                value={editedRoomData.typeRoom}
                onChange={hdlChange}
              />
            </div>
          </>
        ) : (
          <>
            {/* {editedRoomData.rooms_img.map((img) => (
              <img key={img.id} src={img.urlImg} alt={`Room ${editedRoomData.roomName}`} />
      ))} */}

            <img
              src={
                editedRoomData.rooms_img[0]
                  ? editedRoomData.rooms_img[0]?.urlImg
                  : defaultImageUrl
              }
              alt={`Room ${editedRoomData.roomName}`}
              className={RoomDetailCss.petImage}
            />
            <div className={RoomDetailCss.container_info}>
              <div className={RoomDetailCss.textname}>
                {editedRoomData.roomName}
              </div>
              <div>{editedRoomData.description}</div>
              <div>{editedRoomData.maximumAnimal}</div>
              <div>{editedRoomData.pricePerNight}</div>
              <div>{editedRoomData.typeRoom}</div>
            </div>
          </>
        )}

        {isEditMode ? (
          <>
            <button className={AddRoomCss.btb} onClick={hdlSaveClick}>Save</button>
            <button className={AddRoomCss.btc} onClick={hdlCancelClick}>Cancel</button>
            <button className={AddRoomCss.btc} onClick={hdlDelClick}>Delete</button>
          </>
        ) : (
          <>
            <button className={AddRoomCss.bte} onClick={hdlEditClick}>Edit</button>
            <button className={AddRoomCss.btc} onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </ModelPopup>
  );
}
