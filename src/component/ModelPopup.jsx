import React from "react";
import ModuleCSS from "./ModelCss/module.module.css";

export default function ModelPopup({ children }) {
  return (
    <div className={ModuleCSS.popup_container}>
      <div className={`${ModuleCSS.popup} ${ModuleCSS.animate}`}>
        {children}
      </div>
    </div>
  );
}

// const [isPopupOpen, setPopupOpen] = useState(false); สเตจ

// const togglePopup = () => {  สเตจ
//   setPopupOpen(!isPopupOpen);
// };

// <ModelPopup> </ModelPopup>

// {isPopupOpen && <AddPet onClose={togglePopup} />} ใช่งาน

// onClick={togglePopup} ใช้งาน
