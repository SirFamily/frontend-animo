import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";
import AddHostCss from "./css/AddHostCss.module.css"

export default function AddHost({ onClose }) {
  const [input, setInput] = useState({
    hostName: "",
    location: "",
    description: "",
    propertyType: "",
    photos: [],
  });
  const [imagePreview, setImagePreview] = useState(null);


  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prev) => ({
      ...prev,
      photos: [...prev.photos, ...e.target.files],
    }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    alert(input.hostName);
    const formData = new FormData();
    formData.append("hostName", input.hostName);
    formData.append("location", input.location);
    formData.append("description", input.description);
    formData.append("propertyType", input.propertyType);
    formData.append("photos", input.photos);

    for (let i = 0; i < input.photos.length; i++) {
      formData.append("photos", input.photos[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8112/host/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(rs);
      if (rs.status === 200) {
        alert("สร้างhostสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <div>
      <ModelPopup>

        <form className={AddHostCss.container} onSubmit={hdlSubmit} encType="multipart/form-data">
        <div className={AddHostCss.container_info}>
          <h1>AddHost</h1>

          <input
            placeholder="Name"
            type="text"
            name="hostName"
            value={input.hostName}
            onChange={hdlChange}
            required
            />

          <input
            placeholder="location"
            type="text"
            name="location"
            value={input.location}
            onChange={hdlChange}
            />

          <input
            placeholder="description"
            type="text "
            name="description"
            value={input.description}
            onChange={hdlChange}
            />

          <input
            placeholder="propertyType"
            type="text"
            name="propertyType"
            value={input.propertyType}
            onChange={hdlChange}
            />

<input
          type="file"
          multiple 
          accept="image/png,image/jpeg"
          onChange={hdlFileChange}
          />
          <button>Add</button>
          <button onClick={onClose}>Close</button>
          </div>
        </form>
      </ModelPopup>
    </div>
  );
}
