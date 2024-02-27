import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgDog from "../assets/image (18).png";
import axios from "axios";
import RegisCss from "./css/Register.module.css";

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
      <div className={RegisCss.background}>
        <div className={RegisCss.container}>
          <div className={RegisCss.in_container}>
            <div
              className={RegisCss.imgtwo}
              style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 20%), url('${imgDog}') lightgray 0% / cover no-repeat `,
              }}
            >    <Link to="/" className={RegisCss.leave}>
            X
          </Link></div>
            <div className={RegisCss.form}>
          
              <div className={RegisCss.lgtext}>Register</div>
              
                <form className={RegisCss.inform} onSubmit={hdlSubmit} encType="multipart/form-data">
                  <input
                    type="text"
                    placeholder="Firstname"
                    name="firstName"
                    value={input.firstName}
                    onChange={hdlChange}
                    className={RegisCss.input}
                    required
                  />

                  <input
                    type="text"
                    placeholder="Lastname"
                    name="lastName"
                    value={input.lastName}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={input.email}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={input.password}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={input.password2}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="text"
                    name="phone"
                    placeholder="phone"
                    value={input.phone}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="number"
                    name="identityNumber"
                    placeholder="identityNumber"
                    value={input.identityNumber}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    value={input.address}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="number"
                    name="zipcode"
                    placeholder="zipcode"
                    value={input.zipcode}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="city"
                    value={input.city}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <input
                    type="text"
                    name="district"
                    placeholder="district"
                    value={input.district}
                    className={RegisCss.input}
                    onChange={hdlChange}
                  />
                  <br />
                  <input
                    type="file"
                    name="imageprofile"
                    accept="image/png,image/jpeg"
                    className={RegisCss.input}
                    onChange={hdlFileChange}
                  />
                  <br />
                  <button className={RegisCss.btsubmit}>Register</button>
                </form>
              
                <hr className={RegisCss.custom_hr} />
              <div>
                You have an account ?<Link className={RegisCss.linkre} to="/login">Login</Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
