import { Link } from "react-router-dom";
import HomeCss from "./css/Home.module.css";
import DogBG from "../assets/BGdog.png";
function Home() {
  return (
    <>
      <div
        className={HomeCss.container}
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 20%), url(${DogBG}) lightgray 0% / cover no-repeat `,
        }}
      >
        <div className={HomeCss.inputform}>
          <div className={HomeCss.box}>
            <div className={HomeCss.textoninput}>Where you go ?</div>
            <input type="text" className={HomeCss.input}/>
          </div>
          <div>
            <div className={HomeCss.boxcheck}>

            <div className={HomeCss.box}>
              <div  className={HomeCss.textoninput}>Check in</div>
              <input type="text" className={HomeCss.input}/>
            </div>
            <div className={HomeCss.box}>
              <div  className={HomeCss.textoninput}>Check out</div>
              <input type="text" className={HomeCss.input}/>
            </div>
            </div>
            
          </div>
          <div className={HomeCss.box}>
            <div  className={HomeCss.textoninput}>Guest</div>
            <select id="pet" className={HomeCss.input}>
              <option value="">เจ้าขาว</option>
              <option value="">ขุนเดช</option>
            </select>
          </div>
          <Link to="/login" className={HomeCss.btlinklogin}>Search</Link>
        </div>

        <div className={HomeCss.desc}>ค้นหาสิ่งที่ดีที่สุดสำหรับสัตว์เลี้ยงของคุณ</div>
      </div>
    </>
  );
}

export default Home;
