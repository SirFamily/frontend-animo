import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgDog from "../assets/image (18).png";
import axios from "axios";

export default function Register() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    identityNumber: "",
    zipcode: "",
    address: "",
    city: "",
    district: "",
    imageprofile: "",
    avatar: null,
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, avatar: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.password2) {
      alert("Passwords do not match");
      return;
    }
    
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("identityNumber", input.identityNumber);
    formData.append("address", input.address);
    formData.append("zipcode", input.zipcode);
    formData.append("city", input.city);
    formData.append("district", input.district);
    formData.append("avatar", input.avatar);
    try {
      const rs = await axios.post(
        "http://localhost:8112/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(rs);
      if (rs.status === 201) {
        alert("ลงทะเบียนสำเร็จ");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center mt-[60px] ">
        <div className="shadow-md  w-[500px] h-[669px]">
          <img
            src={imgDog}
            alt=""
            className="bg-center rounded-ful bg-clip-border"
          />
        </div>
        <div className="flex flex-col justify-center gap-[20px] w-[500px] h-[669px] bg-gray-300 shadow-md ">
          <div>Register</div>
          <div>
            <form onSubmit={hdlSubmit} encType="multipart/form-data">
              <input
                type="text"
                placeholder="Firstname"
                name="firstName"
                value={input.firstName}
                onChange={hdlChange}
                required
              />

              <input
                type="text"
                placeholder="Lastname"
                name="lastName"
                value={input.lastName}
                onChange={hdlChange}
              />
              <br />
              <input
                type="email"
                placeholder="email"
                name="email"
                value={input.email}
                onChange={hdlChange}
              />
              <br />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
              <br />
              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={input.password2}
                onChange={hdlChange}
              />
              <br />
              <input
                type="text"
                name="phone"
                placeholder="phone"
                value={input.phone}
                onChange={hdlChange}
              />
              <br />
              <input
                type="number"
                name="identityNumber"
                placeholder="identityNumber"
                value={input.identityNumber}
                onChange={hdlChange}
              />
              <br />
              <input
                type="text"
                name="address"
                placeholder="address"
                value={input.address}
                onChange={hdlChange}
              />
              <br />
              <input
                type="number"
                name="zipcode"
                placeholder="zipcode"
                value={input.zipcode}
                onChange={hdlChange}
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                value={input.city}
                onChange={hdlChange}
              />
              <input
                type="text"
                name="district"
                placeholder="district"
                value={input.district}
                onChange={hdlChange}
              />
              <br />
              <input
                type="file"
                name="imageprofile"
                accept="image/png,image/jpeg"
                onChange={hdlFileChange}
              />
              <br />
              <button className="btn btn-accent">Register</button>
            </form>
          </div>
          <hr />
          <div>
            You have an account ?<Link to="/login">Login</Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
