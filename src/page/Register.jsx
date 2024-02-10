import React from "react";
import { Link } from "react-router-dom";
import imgDog from '../assets/image (18).png'
import Nav from "../nav/Nav";

export default function Register() {
  return (
    <>
      <Nav />
      <div className="flex flex-row justify-center mt-[60px] ">
        <div className="shadow-md  w-[500px] h-[669px]" >
          <img src={imgDog} alt="" className="  w-[500px] h-[669px] bg-cover bg-center" />
        </div>
        <div className="flex flex-col justify-center gap-[20px] w-[500px] h-[669px] bg-gray-300 shadow-md ">
          <div>Register</div>
          <div>
            <form action="">
              <input type="text" id="firstname" placeholder="Firstname" />

              <input type="text" id="lastname" placeholder="Lastname" />
              <br />
              <input type="email" id="email" placeholder="email" />
              <br />
              <input type="password" id="password" placeholder="password" />
              <br />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="address"
              />
              <br />
              <select id="province" name="province">
                <option value="">-- เลือกจังหวัด --</option>
                <option value="1">กรุงเทพมหานคร</option>
                <option value="2">นนทบุรี</option>
                <option value="3">สมุทรปราการ</option>
              </select>
              <select id="city" name="city" >
                <option value="">-- เลือกเมือง --</option>
                <option value="1">ร้อยเอ็ด</option>
              </select>
              <br />
              <input type="text" id="zipcod" placeholder="Zipcode" />
              <br />
              <input type="file" name="" id="" />
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
