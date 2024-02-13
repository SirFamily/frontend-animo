import React from "react";
import ModuleCSs from "./ModelCss/module.module.css";
export default function ModelPopup({ children  }) {
    
  return (
    <>
      <div className={ModuleCSs.popup_container}>
        <div className={ModuleCSs.popup}>
          {children}
        </div>
      </div>
    </>
  );
}

// const [isPopupOpen, setPopupOpen] = useState(false); สเตจ

// const togglePopup = () => {  สเตจ
//   setPopupOpen(!isPopupOpen);
// };

// <ModelPopup> </ModelPopup>

// {isPopupOpen && <AddPet onClose={togglePopup} />} ใช่งาน

// onClick={togglePopup} ใช้งาน
