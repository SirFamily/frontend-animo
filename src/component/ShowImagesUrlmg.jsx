import React from "react";
import ModelGridImages from "./ModelGridImagesUrlImg";

export default function ShowImages({ onClose, selectedImg }) {
  return (
    <>
      <ModelGridImages selectedImg={selectedImg} onClose={onClose}/>
    </>
  );
}