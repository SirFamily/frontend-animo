import React from "react";
import ModelPopup from "../../component/ModelPopup";

export default function ShowImagesHost({ onClose, selectedHostImg }) {
  console.log(selectedHostImg);
  return (
    <div>
      <ModelPopup>
        {selectedHostImg.map((image) => (
          <img key={image.id} src={image.imgUrl} alt={`Image ${image.id}`} width={150}
          height={150}/>
        ))}
        <button onClick={onClose}>Close</button>
      </ModelPopup>
    </div>
  );
}
