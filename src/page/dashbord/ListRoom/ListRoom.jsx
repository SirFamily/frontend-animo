import axios from "axios";
import React, { useEffect, useState } from "react";
import DashCss from '../dashbordCss/DashCss.module.css';
import AddRoom from "./AddRoom";
import RoomDetail from './RoomDetail'

export default function ListRoom(props) {
  const { userId } = props;
  const [roomData, setRoomData] = useState([]);
  const [isHost, setIsHost] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomEdit, setSelectedRoomEdit] = useState(null);

  const togglePopup = (data) => {
    setSelectedRoom(data)
    setPopupOpen(!isPopupOpen);
  };

  const togglePopupEdit = (data) => {
    setSelectedRoomEdit(data)
    setPopupOpenEdit(!isPopupOpenEdit);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseHost = await axios.get(
          `http://localhost:8112/host/host/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsHost(responseHost.data[0].id);
        const response = await axios.get(
          `http://localhost:8112/p/user/host/room`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoomData(response.data);
      } catch (error) {
    
      }
    };
  
    getData();
  }, []);


  return (
    <>
      {roomData.map((data) => (
        <div key={data.id} className={DashCss.listPet} onClick={()=>togglePopupEdit(data)}>
          <div
            className={DashCss.descPet}
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                data.rooms_img && data.rooms_img[0]
                  ? data.rooms_img[0].urlImg
                  : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }) lightgray 50% / cover no-repeat`,
            }}
          >
            <div className={DashCss.text}>{data.roomName}</div>
          </div>
        </div>
      ))}
      {isHost !== null ? ( <div className={DashCss.listPet} onClick={()=>togglePopup(isHost)}>
        <div className={DashCss.AddPet} style={{}}>
          <div className={DashCss.add}>+</div>
          <div className={DashCss.text} style={{ color: `#A4D9E0` }}>
            เพิ่มห้องพัก
          </div>
        </div>
      </div>):(<><div>ไม่มี</div></>)}
     
      {isPopupOpenEdit && <RoomDetail onClose={togglePopupEdit} selectedRoomEdit={selectedRoomEdit}/>}
      {isPopupOpen && <AddRoom onClose={togglePopup} selectedHost={selectedRoom}/>}
    </>
  );
}
