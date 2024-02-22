import React, { useEffect, useState } from "react";
import ModelPopup from "../../component/ModelPopup";
import axios from "axios";
import RoomDetailForBooking from "./RoomDetailForBooking";

export default function HostDetailForBooking({ onClose, selectedHost }) {
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const hostId = selectedHost.id;
  const togglePopup = (data) => {
    setSelectedRoom(data);
    setPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8112/p/user/host/room/p/${hostId}/room`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoomsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  console.log(roomsData);
  return (
    <div>
      <ModelPopup>
        <h1 className="text-center">Host Detail</h1>
        <hr />
        <p>Name : {selectedHost.hostName}</p>
        <img
          src="/assets/images/host_image.jpg"
          alt=""
          width={300}
          height={250}
        />
        {roomsData.map((data) => (
          <div key={data.id} onClick={() => togglePopup(data)}>
            <div
              style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                  data.rooms_img && data.rooms_img[0]
                    ? data.rooms_img[0].urlImg
                    : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                }) lightgray 50% / cover no-repeat`,
              }}
            >
              <div>{data.roomName}</div>
            </div>
          </div>
        ))}
        <button onClick={onClose}>Close</button>
        {isPopupOpen && (
          <RoomDetailForBooking
            onClose={togglePopup}
            hostId={hostId}
            selectedRoom={selectedRoom}
          />
        )}
      </ModelPopup>
    </div>
  );
}
