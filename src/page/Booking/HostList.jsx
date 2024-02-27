import axios from "axios";
import React, { useEffect, useState } from "react";
import HostDetailForBooking from "./HostDetailForBooking";

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
      <h1 className="">Recommend</h1>
      <div class="">
        {isData.map((host) => (
          <div
            key={host.id}
            onClick={() => togglePopup(host)}
            class=""
          >
            <h2>{host.hostName}</h2>
            <p class="">{host.location}</p>
            <p class="">{host.description}</p>
            <p class="">{host.propertyType}</p>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <HostDetailForBooking
          onClose={togglePopup}
          selectedHost={selectedHost}
        />
      )}
    </>
  );
}
