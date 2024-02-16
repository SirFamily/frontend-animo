import React from 'react'
import ModelPopup from '../../../component/ModelPopup'
import axios from 'axios'

export default function HostDetail({ onClose, host }) {
    if(host === null) return <div></div>
    
    const hdlDelete = async () => {
        try {
            if(!confirm("Press a button")){
                return; 
            }
            const token = localStorage.getItem("token");
            const rs = await axios.delete(
                `http://localhost:8112/host/${host.id}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (rs.status === 200) {
                alert("ลบสำเร็จ");
                onClose();
              }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
      <ModelPopup>
      <div>{host.hostName}</div>
      <div>{host.location}</div>
      <div>{host.description}</div>
      <div>{host.propertyType}</div>
      <button onClick={onClose}>Close</button>
      <button onClick={hdlDelete}>Delete</button>
      </ModelPopup>
    </div>
  )
}
