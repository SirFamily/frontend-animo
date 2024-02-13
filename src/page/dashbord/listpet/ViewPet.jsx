import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

export default function ViewPet({ onClose, petData }) {
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
        setIsEditMode(false)
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
            "Content-Type": "multipart/form-data",
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
      <div>
        {isEditMode ? (
          <>
            <input
              placeholder="Name"
              type="text"
              name="petName"
              value={editedPetData.petName}
              onChange={hdlChange}
              required
            />

            <input
              placeholder="Type"
              type="text"
              name="petType"
              value={editedPetData.petType}
              onChange={hdlChange}
            />

            <input
              placeholder="birthDate"
              type="date"
              name="birthDate"
              value={editedPetData.birthDate}
              onChange={hdlChange}
            />

            <input
              placeholder="weight"
              type="number"
              name="weight"
              value={editedPetData.weight}
              onChange={hdlChange}
            />

            <input
              placeholder="height"
              type="number"
              name="height"
              value={editedPetData.height}
              onChange={hdlChange}
            />

            <input
              placeholder="color"
              type="text"
              name="color"
              value={editedPetData.color}
              onChange={hdlChange}
            />

            <input
              placeholder="gender"
              type="text"
              name="gender"
              value={editedPetData.gender}
              onChange={hdlChange}
            />

            <input
              placeholder="healthStatus"
              type="text"
              name="healthStatus"
              value={editedPetData.healthStatus}
              onChange={hdlChange}
            />

            {/* <input
            type="file"
            src=""
            alt=""
            accept="image/png,image/jpeg"
            onChange={hdlFileChange}
          /> */}
          </>
        ) : (
          <>
            <img
              src={editedPetData.urlImgPet}
              alt=""
              style={{ width: "300px", height: "200px" }}
            />
            <h1>{editedPetData.id}</h1>
            <h1>{editedPetData.petName}</h1>
            <div>{editedPetData.petType}</div>
            <div>{editedPetData.birthDate}</div>
            <div>
              <div>{editedPetData.weight}</div>
              <div>{editedPetData.height}</div>
            </div>
            <div>{editedPetData.color}</div>
            <div>{editedPetData.gender}</div>
          </>
        )}
      </div>
      {isEditMode ? (
        <>
          <button onClick={hdlSaveClick}>Save</button>
          <button onClick={hdlCancelClick}>Cancel</button>
          <button onClick={hdlDelClick}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={hdlEditClick}>Edit</button>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </ModelPopup>
  );
}
