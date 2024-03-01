import React, { useState, useRef } from "react";
import GridImagesCss from "./ModelCss/GridImagesCss.module.css";
import ModelPopup from "./ModelPopup";

export default function ModelGridImages({ selectedImg, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    const newIndex =
      (currentIndex - 1 + selectedImg.length) % selectedImg.length;
    setCurrentIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % selectedImg.length;
    setCurrentIndex(newIndex);
  };
console.log(selectedImg)
  return (
    <div>
      <ModelPopup>
        <div className={GridImagesCss.container}>
        <div className={GridImagesCss.imageGrid}>
          {selectedImg.map((image, index) => (
            <img
              key={index}
              src={image.imgUrl}
              className={GridImagesCss.imageItem}
              onClick={() => handleImageClick(image, index)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className={GridImagesCss.largeImagePopup}>
            <img
              onClick={handleClosePopup}
              ref={imageRef}
              src={selectedImg[currentIndex].imgUrl}
              alt={`Large Image ${selectedImg[currentIndex].id}`}
              className={GridImagesCss.largeImage}
            />

            <div>
              <button className={GridImagesCss.button} onClick={handlePrevImage}>
                ย้อนกลับ
              </button>
              <button className={GridImagesCss.button} onClick={handleNextImage}>
                ถัดไป
              </button>
            </div>
          </div>
        )}
        <button className={GridImagesCss.btc} onClick={onClose}>
          close
        </button>
        </div>
      </ModelPopup>
    </div>
  );
}
