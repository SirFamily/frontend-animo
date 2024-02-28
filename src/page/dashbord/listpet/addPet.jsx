import React, { useState } from "react";
import ModelPopup from "../../../component/ModelPopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

export default function AddPet({ onClose }) {
  const { user } = useAuth();
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
  //

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, avatar: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("petName", input.petName);
    formData.append("petType", input.petType ? input.petType:null);
    formData.append("birthDate", input.birthDate ? new Date(input.birthDate).toISOString() : null);
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
        <form onSubmit={hdlSubmit} encType="multipart/form-data">
          <h1>AddPet</h1>

          <input
            placeholder="Name"
            type="text"
            name="petName"
            value={input.petName}
            onChange={hdlChange}
            required
          />

          <input
            placeholder="Type"
            type="text"
            name="petType"
            value={input.petType}
            onChange={hdlChange}
          />

          <input
            placeholder="birthDate"
            type="date"
            name="birthDate"
            value={input.birthDate}
            onChange={hdlChange}
          />

          <input
            placeholder="weight"
            type="number"
            name="weight"
            value={input.weight}
            onChange={hdlChange}
          />

          <input
            placeholder="height"
            type="number"
            name="height"
            value={input.height}
            onChange={hdlChange}
          />

          <input
            placeholder="color"
            type="text"
            name="color"
            value={input.color}
            onChange={hdlChange}
          />

          <input
            placeholder="gender"
            type="text"
            name="gender"
            value={input.gender}
            onChange={hdlChange}
          />

          <input
            placeholder="healthStatus"
            type="text"
            name="healthStatus"
            value={input.healthStatus}
            onChange={hdlChange}
          />

          <input
            type="file"
            src=""
            alt=""
            accept="image/png,image/jpeg"
            onChange={hdlFileChange}
          />
          <button>Add</button>
          <button onClick={onClose}>Close</button>
        </form>
      </ModelPopup>
    </>
  );
}

{
  /* <div className={styles.popup_container}>
<div className={styles.popup}>
  <h2>Login</h2>
  <label className={styles.label01} htmlFor="username">Username:</label>
  <input
    type="text"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <label htmlFor="password">Password:</label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button onClick={handleLogin}>Login</button>
  <button onClick={onClose}>Close</button>
</div>
</div> */
}
