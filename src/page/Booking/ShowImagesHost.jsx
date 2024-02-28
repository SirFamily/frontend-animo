import React from "react";
import ModelGridImages from "../../component/ModelGridImages";

export default function ShowImagesHost({ onClose, selectedHostImg }) {
  return (
    <div>
      <ModelGridImages selectedHostImg={selectedHostImg} onClose={onClose}/>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
}