import React from "react";
import ModelGridImages from "./ModelGridImages";

export default function ShowImages({ onClose, selectedImg }) {
  return (
    <>
      <ModelGridImages selectedImg={selectedImg} onClose={onClose}/>
    </>
  );
}