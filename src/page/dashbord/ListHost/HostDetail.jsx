import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import axios from "axios";
import HostDetailCss from "./css/HostDetail.module.css";

export default function HostDetail({ onClose, host }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedHostData, setEditedHostData] = useState({ ...host });

  console.log(editedHostData);

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
    formData.append("publish", editedHostData.publish);
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

  const hdlChangeCheckbox = () => {
    setEditedHostData((prev) => ({ ...prev, publish: !prev.publish }));
  };

  return (
    <>
      <ModelPopup>
        <div className={HostDetailCss.container}>
          {isEditMode ? (
            <>
              <img
                className={HostDetailCss.petImage}
                src={editedHostData.Host_img[0].imgUrl}
              />
              <div className={HostDetailCss.container_info}>
                <div className={HostDetailCss.textname}>
                  <input
                    placeholder="Name"
                    type="text"
                    name="hostName"
                    value={editedHostData.hostName}
                    onChange={hdlChange}
                    required
                  />
                </div>

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

                <div
                  style={{
                    color: editedHostData.publish ? "#00FF00" : "#FF0000",
                  }}
                >
                  <input
                    type="checkbox"
                    name="publish"
                    id="publish"
                    checked={editedHostData.publish}
                    onChange={hdlChangeCheckbox}
                  />
                  {editedHostData.publish ? "เผยแพร์" : "ไม่เผยแพร์"}
                </div>
              </div>
            </>
          ) : (
            <>
           

              <img
                className={HostDetailCss.petImage}
                src={editedHostData.Host_img[0].imgUrl}
              />

              {/* {editedHostData.Host_img.map((img) => (
              <img
              className={HostDetailCss.petImage}
                key={img.id}
                src={img.imgUrl}
                alt={`Host Image ${img.id}`}
                style={{ width: `50px` }}
              />
              
            ))} */}
              <div className={HostDetailCss.container_info}>
              <div className={HostDetailCss.textname}>
                {editedHostData.hostName}
              </div>
                  <div>{editedHostData.location}</div>
                  <div>{editedHostData.description}</div>
                  <div>{editedHostData.propertyType}</div>
                  <div
                    style={{
                      color: editedHostData.publish ? "#00FF00" : "#FF0000",
                    }}
                  >
                    {editedHostData.publish ? "เผยแพร์" : "ไม่เผยแพร์"}
                  </div>
        
              </div>
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
        </div>
      </ModelPopup>
    </>
  );
}
