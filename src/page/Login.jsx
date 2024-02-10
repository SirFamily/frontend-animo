import React from "react";
import { Link } from "react-router-dom";
import catImg from "../assets/image (14).png";
import Nav from "../nav/Nav";

function Home() {
  return (
    <>
      <Nav />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center gap-[20px] w-80 h-96 bg-gray-300 shadow-md ">
          <div>Login</div>
          <div>
            <form action="">
              <input type="text" id="username" placeholder="username" />
              <br />
              <input type="password" id="password" placeholder="password" />
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

export default Home;
