import { useState } from "react";
import "./App.css";
import Nav from "./nav/Nav";

function App() {

  return (
    <>
      <Nav />
      <form action="">
        <div>
          <div>Where you go ?</div>
          <input type="text" />
        </div>
        <div className="flex flex-row">
          <div>
            <div>Check in</div>
            <input type="text" />
          </div>
          <div>
            <div>Check out</div>
            <input type="text" />
          </div>
        </div>
        <div>
          <div>Guest</div>
          <select id="pet">
            <option value="">เจ้าขาว</option>
            <option value="">ขุนเดช</option>
          </select>
        </div>
        <button className="btn btn-accent">Accent</button>
      </form>
      <div>ค้นหาสิ่งที่ดีที่สุดสำหรับสัตว์เลี้ยงของคุณ</div>
    </>
  );
}

export default App;
