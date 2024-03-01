import React, { useEffect, useState } from "react";
import ModelPopup from "../../component/ModelPopup";
import axios from "axios";
import RoomDetailForBooking from "./RoomDetailForBooking";
import HostDetailCss from "./css/HostDetail.module.css";
import ShowImages from "../../component/ShowImages";

export default function HostDetailForBooking({ onClose, selectedHost }) {
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedtImg, setSelectedImg] = useState(null);
  const [isPopupOpenImg, setPopupOpenImg] = useState(false);

  const hostId = selectedHost.id;
  const togglePopup = (data) => {
    setSelectedRoom(data);
    setPopupOpen(!isPopupOpen);
  };

  const toggleImgPopup = (data) => {
    setSelectedImg(data);
    setPopupOpenImg(!isPopupOpenImg);
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
  console.log(selectedHost);
  return (
    <div>
      <ModelPopup>
        <div className={HostDetailCss.container}>
          <div className={HostDetailCss.incontainer}>
            <div className={HostDetailCss.bigtext}>
              Hotel : {selectedHost.hostName}
            </div>
            <div
              className={HostDetailCss.imghost_container}
              onClick={() => toggleImgPopup(selectedHost.Host_img)}
              style={{
                background: `url("${selectedHost.Host_img[0].imgUrl}") no-repeat center/cover`,
              }}
            >
              <p
                className={HostDetailCss.fixposition}
              >
                รูปภาพเพิ่มเติม
              </p>
            </div>
            <div className={HostDetailCss.text}>{selectedHost.description}</div>
            <hr />
            <div>{selectedHost.location}</div>
            <hr />
          </div>
          <div className={HostDetailCss.incontainer}>
            <div className={HostDetailCss.bigtext}>Room</div>
            {roomsData.map((data) => (
              <div
                key={data.id}
                onClick={() => togglePopup(data)}
                className={HostDetailCss.containerroom}
              >
                <img
                  className={HostDetailCss.img}
                  src={
                    data.rooms_img && data.rooms_img[0]
                      ? data.rooms_img[0]?.urlImg
                      : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  }
                />
                <div className={HostDetailCss.detailroom}>
                  <div>
                    Room{" "}
                    <span className={HostDetailCss.texthigh}>
                      {data.roomName}
                    </span>
                  </div>
                  <div>
                    PricePerNight{" "}
                    <span className={HostDetailCss.texthigh}>
                      {data.pricePerNight}
                    </span>
                  </div>
                  <div>
                    Capacity{" "}
                    <span className={HostDetailCss.texthigh}>
                      {data.maximumAnimal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <br />
            <hr />
            <div className={HostDetailCss.btarea}>
            <button className={HostDetailCss.bt} onClick={onClose}>Close</button>
          </div>
          </div>

          
        </div>

        {isPopupOpen && (
          <RoomDetailForBooking
            onClose={togglePopup}
            hostId={hostId}
            selectedRoom={selectedRoom}
          />
        )}
        {isPopupOpenImg && (
          <ShowImages
            onClose={toggleImgPopup}
            selectedImg={selectedtImg}
          />
        )}
      </ModelPopup>
    </div>
  );
}
