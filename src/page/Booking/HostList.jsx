import axios from "axios";
import React, { useEffect, useState } from "react";
import HostDetailForBooking from "./HostDetailForBooking";
import BookCss from "./css/HostCss.module.css";
import Img from "../../assets/BGdog.png";
import thaiProvinces from "../../component/Data/api_province.json";
export default function HostList() {
  const [isData, setIsData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCount, setIsOpenCount] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const incrementGuests = () => {
    setGuests((prevGuests) => prevGuests + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests((prevGuests) => prevGuests - 1);
    }
  };
  const formatDate = (date) => {
    const options = { day: "numeric", month: "short" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleClick = (e) => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCountClick = (e) => {
    setIsOpenCount((prevState) => !prevState);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const togglePopup = (data) => {
    setSelectedHost(data);
    setPopupOpen(!isPopupOpen);
  };

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8112/host`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsData(response.data);
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <>
      <div className={BookCss.container}>
        <div className={BookCss.section1}>
          <div className={BookCss.searchbox}>
            <div className={BookCss.inputbox}>
              Location
              <div className={BookCss.inputsearch}>
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className={BookCss.dropdown_select}
                >
                  <option value="" disabled>
                    Select Province
                  </option>
                  {thaiProvinces.map((province) => (
                    <option key={province.id} value={province.name_en}>
                      {province.name_th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={BookCss.inputbox}>
              Check-In and Check-Out
              <div className={BookCss.inputsearch}>
                <div className={BookCss.dropdown}>
                  <div
                    onClick={handleClick}
                    className={BookCss.dropdown_toggle}
                  >
                    {checkInDate && checkOutDate ? (
                      <span>{`${formatDate(checkInDate)} to ${formatDate(
                        checkOutDate
                      )}`}</span>
                    ) : (
                      "Select Dates"
                    )}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7996/7996254.png"
                      className={BookCss.icondorp}
                    />
                  </div>
                  {isOpen && (
                    <ul className={BookCss.dropdown_menu}>
                      <li className={BookCss.dropdown_menuli}>
                        <input
                          type="date"
                          name="checkin"
                          id="checkin"
                          min={new Date().toISOString().split("T")[0]}
                          className={BookCss.date_input}
                          onChange={handleCheckInChange}
                        />
                      </li>
                      <li className={BookCss.dropdown_menuli}>to</li>
                      <li className={BookCss.dropdown_menuli}>
                        <input
                          type="date"
                          name="checkout"
                          id="checkout"
                          min={new Date().toISOString().split("T")[0]}
                          className={BookCss.date_input}
                          onChange={handleCheckOutChange}
                        />
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className={BookCss.inputbox}>
              Guests
              <div className={BookCss.inputsearch}>
                <div className={BookCss.dropdown}>
                  <div
                    onClick={handleCountClick}
                    className={BookCss.dropdown_toggle}
                  >
                    <span className={BookCss.guestsCount}>Pet {guests}</span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7996/7996254.png"
                      className={BookCss.icondorp}
                    />
                  </div>
                  {isOpenCount && (
                    <div className={BookCss.dropdown_menu}>
                      <div className={BookCss.dropdown_menudiv}>
                        <div> Guests Pet </div>
                        <button
                          onClick={decrementGuests}
                          className={BookCss.guestsButton}
                        >
                          -
                        </button>
                        <span className={BookCss.guestsCount}>{guests}</span>
                        <button
                          onClick={incrementGuests}
                          className={BookCss.guestsButton}
                        >
                          +
                        </button>{" "}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-accent">Search</button>
          </div>
          <div className={BookCss.word}>Find out what's best for your pet.</div>
        </div>

        <div className={BookCss.section2}>
          <h1 className={BookCss.text}>Recommend</h1>
          <div className={BookCss.container_list}>
            {isData.map((host) => (
              <div
                key={host.id}
                onClick={() => togglePopup(host)}
                className={BookCss.card}
              >
                <div>
                  <img
                    src={host.Host_img[0].imgUrl}
                    alt="host"
                    className={BookCss.imghostpre}
                  />
                </div>
                <div className={BookCss.texthost}>{host.hostName}</div>
                <p>{host.location}</p>
              </div>
            ))}
          </div>
        </div>
        {isPopupOpen && (
          <HostDetailForBooking
            onClose={togglePopup}
            selectedHost={selectedHost}
          />
        )}
      </div>
    </>
  );
}
