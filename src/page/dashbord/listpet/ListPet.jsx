import React, { useEffect, useState } from "react";
import axios from "axios";
import DashCss from "../dashbordCss/DashCss.module.css";
import ViewPet from "./ViewPet";

const ListPet = (props) => {
  const { id } = props;
  const [petData, setPetData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const selectPet = (pet) => {
    setSelectedPet(pet);
    togglePopup();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/p/user/pet/pet/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPetData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {petData.map((pet) => (
        <div key={pet.id} className={DashCss.listPet} onClick={() => selectPet(pet)}>
          <div
            className={DashCss.descPet}
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url(${
                pet.urlImgPet ||
                "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }) lightgray 50% / cover no-repeat`,
            }}
          >
            <div className={DashCss.text}>{pet.petName}</div>
          </div>
        </div>
      ))}
      {isPopupOpen && <ViewPet onClose={togglePopup} petData={selectedPet} />}
    </>
  );
};

export default ListPet;

{
  /* <div className={DashCss.listPet}>
        <div
          className={DashCss.descPet}
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
          }}
        >
          <div className={DashCss.text}>ข้าวเจ้า</div>
        </div>
      </div>
      <div className={DashCss.listPet}>
        <div
          className={DashCss.descPet}
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
          }}
        >
          <div className={DashCss.text}>ข้าวเจ้า</div>
        </div>
      </div>

      <div className={DashCss.listPet}>
        <div
          className={DashCss.descPet}
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
          }}
        >
          <div className={DashCss.text}>ข้าวเจ้า</div>
        </div>
      </div>
      <div className={DashCss.listPet}>
        <div
          className={DashCss.descPet}
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%), url('https://e1.pxfuel.com/desktop-wallpaper/433/825/desktop-wallpaper-cool-spongebob.jpg') lightgray 50% / cover no-repeat`,
          }}
        >
          <div className={DashCss.text}>ข้าวเจ้า</div>
        </div>
      </div> */
}
