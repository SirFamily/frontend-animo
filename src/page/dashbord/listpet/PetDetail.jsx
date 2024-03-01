import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import PetDetailCss from "./Css/PetDetailCss.module.css";
import defaultImageUrl from "../../../assets/picture.png"

export default function PetDetail({ onClose, petData }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPetData, setEditedPetData] = useState({ ...petData });
  const { user } = useAuth();

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, avatar: e.target.files[0] }));
  };

  const hdlEditClick = () => {
    setIsEditMode(true);
  };

  const hdlSaveClick = async (e) => {
    e.preventDefault();
    const userId = user.id;
    const id = editedPetData.id;
    const formData = new FormData();
    formData.append("petName", editedPetData.petName);
    formData.append(
      "petType",
      editedPetData.petType ? editedPetData.petType : null
    );
    formData.append(
      "birthDate",
      editedPetData.birthDate
        ? new Date(editedPetData.birthDate).toISOString()
        : null
    );
    formData.append("weight", editedPetData.weight);
    formData.append("height", editedPetData.height);
    formData.append("color", editedPetData.color);
    formData.append("gender", editedPetData.gender);
    formData.append("healthStatus", editedPetData.healthStatus);
    formData.append("urlImgPet", editedPetData.urlImgPet);
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.put(
        `http://localhost:8112/p/user/pet/pet/${userId}/update/${id}`,
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

  const hdlDelClick = async () => {
    try {
      if (!confirm("Press a button!")) {
        return;
      }
      const id = editedPetData.id;
      const token = localStorage.getItem("token");
      const rs = await axios.delete(
        `http://localhost:8112/p/user/pet/pet/${id}/remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rs);
      if (rs.status === 200) {
        alert("เปลียนแปลงสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const hdlCancelClick = () => {
    setIsEditMode(false);
  };

  const hdlChange = (e) => {
    setEditedPetData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  return (
    <ModelPopup>
      <div className={PetDetailCss.container}>
        {isEditMode ? (
          <>
            <div>
              <img
                className={PetDetailCss.petImage}
                src={editedPetData.urlImgPet !== "" ? editedPetData.urlImgPet : defaultImageUrl}
              />
              <input
                type="file"
                src=""
                alt=""
                accept="image/png,image/jpeg"
                onChange={hdlFileChange}
              />
            </div>
            <div className={PetDetailCss.container_info}>

            <div>
              <input
                className={PetDetailCss.textname}
                placeholder="Name"
                type="text"
                name="petName"
                value={editedPetData.petName}
                onChange={hdlChange}
                required
              />
            </div>

            <input
              className={PetDetailCss.text}
              placeholder="Type"
              type="text"
              name="petType"
              value={editedPetData.petType}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="birthDate"
              type="date"
              name="birthDate"
              value={editedPetData.birthDate}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="weight"
              type="number"
              name="weight"
              value={editedPetData.weight}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="height"
              type="number"
              name="height"
              value={editedPetData.height}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="color"
              type="text"
              name="color"
              value={editedPetData.color}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="gender"
              type="text"
              name="gender"
              value={editedPetData.gender}
              onChange={hdlChange}
            />

            <input
              className={PetDetailCss.text}
              placeholder="healthStatus"
              type="text"
              name="healthStatus"
              value={editedPetData.healthStatus}
              onChange={hdlChange}
            />
             </div>
          </>
        ) : (
          <>
            <img
              className={PetDetailCss.petImage}
              src={editedPetData.urlImgPet !== "" ? editedPetData.urlImgPet : defaultImageUrl}
            />
            <div className={PetDetailCss.container_info}>
              <div className={PetDetailCss.textname}>
                {editedPetData.petName}
              </div>
              <div className={PetDetailCss.text}>
                ประเภท{" "}
                <span className={PetDetailCss.hightext}>
                  {editedPetData.petType}
                </span>
              </div>
              <div className={PetDetailCss.text}>
                วันเกิด{" "}
                <span className={PetDetailCss.hightext}>
                  {editedPetData.birthDate}
                </span>
              </div>
              <div className={PetDetailCss.container_flex}>
                <div className={PetDetailCss.text}>
                  น้ำหนัก{" "}
                  <span className={PetDetailCss.hightext}>
                    {editedPetData.weight}
                  </span>
                </div>
                <div className={PetDetailCss.text}>
                  ส่วนสูง{" "}
                  <span className={PetDetailCss.hightext}>
                    {editedPetData.height}
                  </span>
                </div>
              </div>
              <div className={PetDetailCss.text}>
                สี{" "}
                <span className={PetDetailCss.hightext}>
                  {editedPetData.color}
                </span>
              </div>
              <div className={PetDetailCss.text}>
                เพศ{" "}
                <span className={PetDetailCss.hightext}>
                  {editedPetData.gender}
                </span>
              </div>
              <div className={PetDetailCss.text}>
                สภาพร่างกาย
                <span className={PetDetailCss.hightext}>
                  {editedPetData.healthStatus}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {isEditMode ? (
        <>
          <button className={PetDetailCss.btb} onClick={hdlSaveClick}>Save</button>
          <button className={PetDetailCss.btc} onClick={hdlCancelClick}>Cancel</button>
          <button className={PetDetailCss.btc} onClick={hdlDelClick}>Delete</button>
        </>
      ) : (
        <>
          <button className={PetDetailCss.bte} onClick={hdlEditClick}>Edit</button>
          <button className={PetDetailCss.btc} onClick={onClose}>Close</button>
        </>
      )}
      
    </ModelPopup>
  );
}
