import React, { useState, useRef } from "react";
import GridImagesCss from "./ModelCss/GridImagesCss.module.css";
import ModelPopup from "./ModelPopup";

export default function ModelGridImages({ selectedHostImg, onClose }) {
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
      (currentIndex - 1 + selectedHostImg.length) % selectedHostImg.length;
    setCurrentIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % selectedHostImg.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <ModelPopup>
        <div className={GridImagesCss.imageGrid}>
          {selectedHostImg.map((image, index) => (
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
              src={selectedHostImg[currentIndex].imgUrl}
              alt={`Large Image ${selectedHostImg[currentIndex].id}`}
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
        <button onClick={onClose}>
          close
        </button>
      </ModelPopup>
    </div>
  );
}
