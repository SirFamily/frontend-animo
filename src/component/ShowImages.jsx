import React from "react";
import ModelGridImages from "./ModelGridImages";

export default function ShowImages({ onClose, selectedHostImg }) {
  return (
    <>
      <ModelGridImages selectedHostImg={selectedHostImg} onClose={onClose}/>
    </>
  );
}