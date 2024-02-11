import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import catImg from "../assets/image (14).png";


function Login() {
  const { setUser } = useAuth()
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
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center gap-[20px] w-80 h-96 bg-gray-300 shadow-md ">
          <div>Login</div>
          <div>
            <form onSubmit={hdlSubmit}>
              <input
                type="text"
                id="email"
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
              <button type="submit">Submit</button>
              <br />
            </form>
          </div>
          <hr />
          <div>
            You don’t have an account ?<Link to="/register">Register</Link>{" "}
          </div>
        </div>
        <div className="shadow-md">
          <img src={catImg} alt="" className="w-80 h-96 bg-cover bg-center" />
        </div>
      </div>
    </>
  );
}

export default Login;
