import React, { useEffect, useState } from 'react';
import Menu from "./menu/menu";
import DashCss from "./dashbordCss/DashCss.module.css";
import ProfileCss from "./dashbordCss/ProfileCss.module.css"
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
      formData.append("avatar", userData.avatar); 
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

  const handleCancelClick = () => {
    setUserData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      district: userData.district,
      zipcode: userData.zipcode,
      avatar: userData.avatar, 
      img_profile: userData.img_profile, 
    });
    setIsEditing(false);
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
                <div className={ProfileCss.container_info}>
                  <input className={ProfileCss.info} type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                  <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                  <input type="text" name="email" value={userData.email} onChange={handleChange} disabled />
                  <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                  <input type="text" name="address" value={userData.address} onChange={handleChange} />
                  <input type="text" name="city" value={userData.city} onChange={handleChange} />
                  <input type="text" name="district" value={userData.district} onChange={handleChange} />
                  <input type="text" name="zipcode" value={userData.zipcode} onChange={handleChange} />
                  <input type="file" accept="image/*" onChange={hdlFileChange} />
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div className={ProfileCss.container_info}>
                    <div className={ProfileCss.canter}>
                  <img className={ProfileCss.image} src={userData.img_profile} alt="Profile" />

                    </div>
                  <p>First Name: <span className={ProfileCss.info}>{userData.firstName}</span></p>
                  <p>Last Name: <span className={ProfileCss.info}>{userData.lastName}</span></p>
                  <p>Email: <span className={ProfileCss.info}>{userData.email}</span></p>
                  <p>Phone Number: <span className={ProfileCss.info}>{userData.phone}</span></p>
                  <p>Address : <span className={ProfileCss.info}>{userData.address}</span></p>
                  <p>City : <span className={ProfileCss.info}>{userData.city}</span></p>
                  <p>District : <span className={ProfileCss.info}>{userData.district}</span></p>
                  <p>ZipCode : <span className={ProfileCss.info}>{userData.zipcode}</span></p>
                  <button onClick={handleEditClick}>Edit</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
