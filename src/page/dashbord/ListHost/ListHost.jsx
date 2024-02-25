import React, { useEffect, useState } from "react";
import axios from "axios";
import DashCss from "../dashbordCss/DashCss.module.css";
import HostDetail from "./HostDetail";
import AddHost from "./AddHost";

export default function ListHost(props) {
  const { userId } = props;
  const [hostData, setHostData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpenA, setPopupOpenA] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const togglePopupA = () => {
    setPopupOpenA(!isPopupOpenA);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/host/host/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHostData(response.data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    getData();
  }, []);

  const handleHostClick = (host) => {
    setSelectedHost(host);
    togglePopup();
  };

  const hdlAddHost = () => {
    togglePopupA();
  };
  return (
    <>
      {hostData.length > 0 ? (
        hostData.map((data) => (
          <div
            key={data.id}
            className={DashCss.listPet}
            onClick={() => handleHostClick(data)}
          >
             <div
            className={DashCss.descPet}
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                data.Host_img.length > 0
                  ? data.Host_img[0].imgUrl  // Use the first image URL
                  : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }) lightgray 50% / cover no-repeat`,
            }}
          >
              <div className={DashCss.text}>{data.hostName}</div>
            </div>
          </div>
        ))
      ) : (
        <div className={DashCss.listPet}>
          <div className={DashCss.AddPet} style={{}} onClick={hdlAddHost}>
            <div className={DashCss.add}>+</div>
            <div className={DashCss.text} style={{ color: `#A4D9E0` }}>
              เพิ่มที่พักสำหรับคุณ
            </div>
          </div>
        </div>
      )}
      {isPopupOpenA && <AddHost onClose={togglePopupA} />}
      {isPopupOpen && <HostDetail onClose={togglePopup} host={selectedHost} />}
    </>
  );
}
