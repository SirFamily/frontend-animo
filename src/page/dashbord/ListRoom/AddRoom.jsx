import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";

export default function AddRoom({ onClose, selectedHost }) {
  const [input, setInput] = useState({
    roomName: "",
    description: "",
    maximumAnimal: "",
    pricePerNight: "",
    typeRoom: "",
    photos: [],
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prev) => ({
      ...prev,
      photos: [...prev.photos, ...e.target.files],
    }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomName", input.roomName);
    formData.append("description", input.description);
    formData.append("maximumAnimal", input.maximumAnimal);
    formData.append("pricePerNight", input.pricePerNight);
    formData.append("typeRoom", input.typeRoom);
    formData.append("photos", input.photos);

    for (let i = 0; i < input.photos.length; i++) {
      formData.append("photos", input.photos[i]);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8112/p/user/host/room/${selectedHost}/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        alert("เพิ่มห้องสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ModelPopup>
        <input
          placeholder="Name"
          type="text"
          name="roomName"
          value={input.roomName}
          onChange={hdlChange}
          required
        />
        <input
          placeholder="description"
          type="text"
          name="description"
          value={input.description}
          onChange={hdlChange}
          required
        />
        <input
          placeholder="maximumAnimal"
          type="text"
          name="maximumAnimal"
          value={input.maximumAnimal}
          onChange={hdlChange}
          required
        />
        <input
          placeholder="pricePerNight"
          type="text"
          name="pricePerNight"
          value={input.pricePerNight}
          onChange={hdlChange}
          required
        />
        <input
          placeholder="typeRoom"
          type="text"
          name="typeRoom"
          value={input.typeRoom}
          onChange={hdlChange}
          required
        />
        <input
          type="file"
          multiple // Allow multiple file selection
          accept="image/png,image/jpeg"
          onChange={hdlFileChange}
        />
        <button onClick={hdlSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </ModelPopup>
    </div>
  );
}
