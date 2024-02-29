import React, { useEffect, useState } from 'react';
import ModelPopup from '../../component/ModelPopup';
import Select from 'react-select';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ShowImages from '../../component/ShowImagesUrlmg';
import RoomDetailCss from "./css/RoomDetailCss.module.css"

export default function RoomDetailForBooking({ onClose, hostId, selectedRoom }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDataPet, setIsDataPet] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [pricePerNight, setPricePerNight] = useState(0);
  const [selectedtImg, setSelectedImg] = useState(null);
  const [isPopupOpenImg, setPopupOpenImg] = useState(false);

  const { user } = useAuth();
  const userId = user.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8112/p/user/pet/pet/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setIsDataPet(response.data);
      } catch (error) {

      }
    }
    getData();
  }, []);

  useEffect(() => {
    setPricePerNight(selectedRoom.pricePerNight || 0);
  }, [selectedRoom.pricePerNight]);

  const calculateDateDifference = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const differenceInTime = checkOut.getTime() - checkIn.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const dateDifference = calculateDateDifference();
    return dateDifference * pricePerNight;
  };

  

  const tagOptions = isDataPet
    ? isDataPet.map((pet) => ({ value: pet.id, label: pet.petName }))
    : [];

  const handleTagChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > selectedRoom.maximumAnimal) {
      return;
    }
    setSelectedTags(selectedOptions);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const formData ={
      checkInDate:new Date(checkInDate),   
      checkOutDate:new Date(checkOutDate),
      totalPrice:calculateTotalPrice(),
      selectedTags,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8112/booking/${hostId}/${selectedRoom.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(formData)
      if (response.status === 200) {
        alert("จองสำเร็จ");
        onClose();
      }
    } catch (error) {
    }
  };

  const toggleImgPopup = (data) => {
    setSelectedImg(data);
    setPopupOpenImg(!isPopupOpenImg);
  };
console.log(selectedRoom.rooms_img[0].urlImg)
  return (
    <div>
      <ModelPopup>
        <div className={RoomDetailCss.container}>
        <form className={RoomDetailCss.container_info} onSubmit={hdlSubmit}>
          <div className={RoomDetailCss.textname}>Room : {selectedRoom.roomName}</div>
          <div>
            <hr />
            {/* {selectedRoom.rooms_img.map((img) => (
              <img
                key={img.id}
                src={img.urlImg}
                alt={`Room ${selectedRoom.roomName}`}
                style={{ width: '100px', height: '100px', margin: '5px' }}
              />
            ))} */}
   <div
              className={RoomDetailCss.petImage}
              onClick={() => toggleImgPopup(selectedRoom.rooms_img)}
              style={{
                background: `url("${selectedRoom.rooms_img[0].urlImg}") no-repeat center/cover`,
              }}
            >
              <p
                className={RoomDetailCss.fixposition}
              >
                รูปภาพเพิ่มเติม
              </p>
              </div>



          </div>
          <hr />
          <div> <span className={RoomDetailCss.hightext}>{selectedRoom.description}</span></div>
          <hr />
          <div>TypeRoom: <span className={RoomDetailCss.hightext}>{selectedRoom.typeRoom}</span></div>
          <div>MaximumAnimal: <span className={RoomDetailCss.hightext}>{selectedRoom.maximumAnimal}</span></div>
          <div>Price/Night: <span className={RoomDetailCss.hightext}>{selectedRoom.pricePerNight}</span></div>
          <hr />
          <div>
            <label>Select Tags:</label>
            <Select
              isMulti
              options={tagOptions}
              value={selectedTags}
              onChange={handleTagChange}
              placeholder="Select Pet"
            />
          </div>
          <hr />
          <div>
            <label htmlFor="checkInDate">checkInDate :</label>
            <input type="date" name="checkInDate" value={checkInDate} onChange={handleCheckInDateChange} />
            <label htmlFor="checkOutDate">checkOutDate :</label>
            <input type="date" name="checkOutDate" value={checkOutDate} onChange={handleCheckOutDateChange} />
          </div>
          <div>
            สัตว์เลี้ยงที่เข้าพัก : <span className={RoomDetailCss.hightext}>{selectedTags.length}</span>
          </div>
          <hr />
          <div>
            ระยะห่างของวัน: <span className={RoomDetailCss.hightext}>{calculateDateDifference()}</span> วัน
          </div>
          <div>
            ราคาทั้งหมด: <span className={RoomDetailCss.hightext}>{calculateTotalPrice()}</span> บาท
          </div>
          <hr />
          <button>Booking</button>
          <button onClick={onClose}>Close</button>
        </form>
        </div>
        {isPopupOpenImg && (
          <ShowImages
            onClose={toggleImgPopup}
            selectedImg={selectedtImg}
          />
        )}
      </ModelPopup>
    </div>
  );
}
