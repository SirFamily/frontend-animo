import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import useAuth from "../../../hooks/useAuth";
import AddPetCss from "./Css/AddPerCss.module.css";
import axios from "axios";
import defaultImageUrl from "../../../assets/picture.png";
export default function AddPet({ onClose }) {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);

  const id = user.id;
  const [input, setInput] = useState({
    petName: null,
    petType: null,
    birthDate: null,
    weight: null,
    height: null,
    color: null,
    gender: null,
    healthStatus: null,
    avatar: null,
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, avatar: e.target.files[0] }));
    // สร้าง URL ของรูปภาพที่เลือกและแสดงตัวอย่างรูปภาพ
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImagePreview(imageUrl);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("petName", input.petName);
    formData.append("petType", input.petType ? input.petType : null);
    formData.append(
      "birthDate",
      input.birthDate ? new Date(input.birthDate).toISOString() : null
    );
    formData.append("weight", input.weight);
    formData.append("height", input.height);
    formData.append("color", input.color);
    formData.append("gender", input.gender);
    formData.append("healthStatus", input.healthStatus);
    formData.append("avatar", input.avatar);
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8112/p/user/pet/${id}`,
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
        alert("ลงทะเบียนสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <ModelPopup>
        <div className={AddPetCss.container}>
          <div className={AddPetCss.text}>AddPet</div>
          <img
            src={imagePreview !== null ? imagePreview : defaultImageUrl}
            alt="Preview"
            className={AddPetCss.imagePreview}
          />
          <input
            type="file"
            src=""
            alt=""
            accept="image/png,image/jpeg"
            onChange={hdlFileChange}
          />
          <form
            onSubmit={hdlSubmit}
            encType="multipart/form-data"
            className={AddPetCss.form}
          >
            <input
              placeholder="Name"
              type="text"
              name="petName"
              value={input.petName}
              onChange={hdlChange}
              className={AddPetCss.inputField}
              required
            />

            <input
              placeholder="Type"
              type="text"
              name="petType"
              value={input.petType}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="birthDate"
              type="date"
              name="birthDate"
              value={input.birthDate}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="weight"
              type="number"
              name="weight"
              value={input.weight}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="height"
              type="number"
              name="height"
              value={input.height}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="color"
              type="text"
              name="color"
              value={input.color}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="gender"
              type="text"
              name="gender"
              value={input.gender}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />

            <input
              placeholder="healthStatus"
              type="text"
              name="healthStatus"
              value={input.healthStatus}
              onChange={hdlChange}
              className={AddPetCss.inputField}
            />
            <div className={AddPetCss.buttons}>
              <button
                className={`${AddPetCss.button} ${AddPetCss.primary}`}
                type="submit"
              >
                Add
              </button>
              <button
                className={`${AddPetCss.button} ${AddPetCss.secondary}`}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </ModelPopup>
    </>
  );
}
