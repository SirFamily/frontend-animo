import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";

export default function HostDetail({ onClose, host }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedHostData, setEditedHostData] = useState({ ...host });

  const hdlDelete = async () => {
    try {
      if (!confirm("Press a button")) {
        return;
      }
      const token = localStorage.getItem("token");
      const rs = await axios.delete(
        `http://localhost:8112/host/${host.id}/delete`,
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
      console.log(error);
    }
  };

  const hdlSaveClick = async (e) => {
    e.preventDefault();
        if (!confirm("Press a button")) {
          return;
        }
    const formData = new FormData();
    formData.append("hostName", editedHostData.hostName);
    formData.append("location", editedHostData.location);
    formData.append("description", editedHostData.description);
    formData.append("propertyType", editedHostData.propertyType);
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.put(
        `http://localhost:8112/host/host/update`,
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
        alert("เปลียนแปลงสำเร็จ");
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const hdlEditClick = () => {
    setIsEditMode(true);
  };
  const hdlCancelClick = () => {
    setIsEditMode(false);
  };

  const hdlChange = (e) => {
    setEditedHostData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <ModelPopup>
        {isEditMode ? (
          <>
            <input
              placeholder="Name"
              type="text"
              name="hostName"
              value={editedHostData.hostName}
              onChange={hdlChange}
              required
            />

            <input
              placeholder="location"
              type="text"
              name="location"
              value={editedHostData.location}
              onChange={hdlChange}
            />

            <input
              placeholder="description"
              type="text"
              name="description"
              value={editedHostData.description}
              onChange={hdlChange}
            />

            <input
              placeholder="propertyType"
              type="text"
              name="propertyType"
              value={editedHostData.propertyType}
              onChange={hdlChange}
            />
          </>
        ) : (
          <>
            <div>{editedHostData.hostName}</div>
            <div>{editedHostData.location}</div>
            <div>{editedHostData.description}</div>
            <div>{editedHostData.propertyType}</div>
          </>
        )}
        {isEditMode ? (
          <>
            <button onClick={hdlSaveClick}>Save</button>
            <button onClick={hdlCancelClick}>Cancel</button>
            <button onClick={hdlDelete}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={hdlEditClick}>Edit</button>
            <button onClick={onClose}>Close</button>
          </>
        )}

      </ModelPopup>
    </>
  );
}
