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
      <h1 className="text-center text-3xl font-bold mt-8">Recommend</h1>
      <div class="container mx-auto px-4">
        {isData.map((host) => (
          <div
            key={host.id}
            onClick={() => togglePopup(host)}
            class="bg-white p-4 rounded-lg shadow-md mt-4 mb-4"
          >
            <h2>{host.hostName}</h2>
            <p class="text-gray-500 mb-2">{host.location}</p>
            <p class="mb-2">{host.description}</p>
            <p class="text-gray-700 font-bold">{host.propertyType}</p>
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
