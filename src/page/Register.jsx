import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput((prv) => ({ ...prv, avatar: e.target.files[0] }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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
       alert("ลงทะเบียนสำเร็จ")
       navigate("/login");
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
            ></div>
            <div className={RegisCss.form}>
              <Link to="/" className={RegisCss.leave}>
                X
              </Link>
              <div className={RegisCss.lgtext}>Register</div>
              <form
                className={RegisCss.inform}
                onSubmit={
                  currentStep === 4 ? hdlSubmit : (e) => e.preventDefault()
                }
                encType="multipart/form-data"
              >
                <div>
                  {currentStep === 1 && (
                    <>
                      <div className={RegisCss.inputgroup}>
                        <input
                          type="text"
                          placeholder="Firstname"
                          name="firstName"
                          value={input.firstName}
                          onChange={hdlChange}
                          className={RegisCss.inputingroup}
                          required
                        />

                        <input
                          type="text"
                          placeholder="Lastname"
                          name="lastName"
                          value={input.lastName}
                          className={RegisCss.inputingroup}
                          onChange={hdlChange}
                        />
                      </div>
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
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
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
                      <br />
                      <input
                        type="text"
                        name="city"
                        placeholder="city"
                        value={input.city}
                        className={RegisCss.input}
                        onChange={hdlChange}
                      />
                      <br />
                      <input
                        type="text"
                        name="district"
                        placeholder="district"
                        value={input.district}
                        className={RegisCss.input}
                        onChange={hdlChange}
                      />
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
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
                        type="text"
                        name="identityNumber"
                        placeholder="IdentityNumber"
                        value={input.identityNumber}
                        className={RegisCss.input}
                        onChange={hdlChange}
                      />
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <input
                        type="file"
                        name="imageprofile"
                        accept="image/png,image/jpeg"
                        className={RegisCss.input}
                        onChange={hdlFileChange}
                      />
                    </>
                  )}
                </div>
                <div className={RegisCss.btnArea}>
                  {currentStep > 1 && (
                    <button onClick={prevStep} className={RegisCss.btsubmit}>
                      Back
                    </button>
                  )}
                  {currentStep < 4 && (
                    <button onClick={nextStep} className={RegisCss.btsubmit}>
                      Next
                    </button>
                  )}

                  {currentStep === 4 && (
                    <button className={RegisCss.btsubmit}>Register</button>
                  )}
                </div>
              </form>
              <hr className={RegisCss.custom_hr} />
              <div className={RegisCss.loginArea}>
                {/* Display back to login link only in the first step */}

                <>
                  You have an account?{" "}
                  <Link className={RegisCss.linkre} to="/login">
                    Login
                  </Link>{" "}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
