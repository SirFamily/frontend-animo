import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import catImg from "../assets/image (14).png";
import LoginCss from "./css/Login.module.css";

function Login() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const rs = await axios.post("http://localhost:8112/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8112/auth/me", {
        headers: {
          Authorization: `Bearer ${rs.data.token}`,
        },
      });
      console.log(rs1.data);
      setUser(rs1.data);
      if (rs.status === 200) {
        alert("ล็อกอินสำเร็จ");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={LoginCss.background}>
        <div className={LoginCss.container}>
          <div className={LoginCss.in_container}>
            <div className={LoginCss.form}>
              <Link to="/" className={LoginCss.leave}>X</Link>
              <div className={LoginCss.lgtext}>Login</div>
              <form className={LoginCss.inform} onSubmit={hdlSubmit}>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={input.email}
                  onChange={hdlChange}
                  className={LoginCss.input}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={input.password}
                  onChange={hdlChange}
                  className={LoginCss.input}
                />
                <br/>

                <button type="submit">
                  <div className={LoginCss.btsubmit}>LOGIN</div>
                </button>
                <br />
              </form>

              <hr className={LoginCss.custom_hr} />
              <div>
                You don’t have an account ? <Link className={LoginCss.linkre} to="/register"> Register</Link>
              </div>
            </div>
            <div
              className={LoginCss.img}
              style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 20%), url('${catImg}') lightgray 0% / cover no-repeat `,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
