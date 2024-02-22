import React, { useEffect, useState } from 'react';
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

export default function DashboardSetting() {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/p/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    getData();
  }, []);

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("city", userData.city);
      formData.append("district", userData.district);
      formData.append("zipcode", userData.zipcode);
      formData.append("avatar", userData.avatar); // เพิ่มรูปภาพ
      const rs = await axios.put(
        `http://localhost:8112/p/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const hdlFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prv) => ({ ...prv, avatar: file, img_profile: URL.createObjectURL(file) }));
  };

  return (
    <div className={DashCss.container}>
      <div className={DashCss.containerDash}>
        <Menu />
        <div className={DashCss.boxBord}>
          <div className={DashCss.bord}>
            <div className={DashCss.inBord}>
              <div>
                <h1>Welcome to the Profile panel!</h1>
                <div className={DashCss.line}></div>
              </div>

              {isEditing ? (
                <div>
                  <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                  <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                  <input type="text" name="email" value={userData.email} onChange={handleChange} disabled />
                  <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                  <input type="text" name="address" value={userData.address} onChange={handleChange} />
                  <input type="text" name="city" value={userData.city} onChange={handleChange} />
                  <input type="text" name="district" value={userData.district} onChange={handleChange} />
                  <input type="text" name="zipcode" value={userData.zipcode} onChange={handleChange} />
                  <input type="file" accept="image/*" onChange={hdlFileChange} />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <p>First Name: {userData.firstName}</p>
                  <p>Last Name: {userData.lastName}</p>
                  <p>Email: {userData.email}</p>
                  <p>Phone Number: {userData.phone}</p>
                  <p>First Name: {userData.address}</p>
                  <p>Last Name: {userData.city}</p>
                  <p>Phone Number: {userData.district}</p>
                  <p>Phone Number: {userData.zipcode}</p>
                  <img src={userData.img_profile} alt="Profile" />
                  <button onClick={handleEditClick}>Edit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
