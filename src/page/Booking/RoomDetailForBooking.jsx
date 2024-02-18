import React, { useEffect, useState } from 'react';
import ModelPopup from '../../component/ModelPopup';
import Select from 'react-select';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

export default function RoomDetailForBooking({ onClose, hostId, selectedRoom }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDataPet, setIsDataPet] = useState(null);
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

  const tagOptions = isDataPet
    ? isDataPet.map((pet) => ({ value: pet.id, label: pet.petName }))
    : [];

  const handleTagChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > selectedRoom.maximumAnimal) {
      return;
    }
    setSelectedTags(selectedOptions);
  };

  return (
    <div>
      <ModelPopup>
        <strong>{selectedRoom.roomName}</strong>
        <div>
          <hr />
          <div>รูปภาพ:</div>
          {selectedRoom.rooms_img.map((img) => (
            <img
              key={img.id}
              src={img.urlImg}
              alt={`Room ${selectedRoom.roomName}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
          ))}
        </div>
        <hr />
        <div>{selectedRoom.description}</div>
        <hr />
        <div>TypeRoom: {selectedRoom.typeRoom}</div>
        <div>MaximumAnimal: {selectedRoom.maximumAnimal}</div>
        <div>Price/Night: {selectedRoom.pricePerNight}</div>
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
          <input type="date" name="checkInDate"  />
          <label htmlFor="checkOutDate">checkOutDate :</label>
          <input type="date" name="checkOutDate "  />
        </div>
        <hr />
        <div>
          สัตว์เลี้ยงที่เข้าพัก : {selectedTags.length}
      
        </div>
        <button onClick={onClose}>Close</button>
      </ModelPopup>
    </div>
  );
}
