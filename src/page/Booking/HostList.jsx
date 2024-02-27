import axios from "axios";
import React, { useEffect, useState } from "react";
import HostDetailForBooking from "./HostDetailForBooking";
import BookCss from "./css/HostCss.module.css";
export default function HostList() {
  const [isData, setIsData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);

  const togglePopup = (data) => {
    setSelectedHost(data);
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8112/host`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsData(response.data);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <>
      <div class={BookCss.container}>
        <h1 className={BookCss.text}>Recommend</h1>
        <div className={BookCss.container_list}>
          {isData.map((host) => (
            <div
              key={host.id}
              onClick={() => togglePopup(host)}
              className={BookCss.card}
            >
              <div>
                <img
                  src={host.Host_img[0].imgUrl}
                  alt="host"
                  className={BookCss.imghostpre}
                />
              </div>
              <div className={BookCss.texthost}>{host.hostName}</div>
              <p>{host.location}</p>
            </div>
          ))}
        </div>
        {isPopupOpen && (
          <HostDetailForBooking
            onClose={togglePopup}
            selectedHost={selectedHost}
          />
        )}
      </div>
    </>
  );
}
