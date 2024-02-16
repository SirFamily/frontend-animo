import React from 'react'
import ModelPopup from '../../../component/ModelPopup'

export default function HostDetail({ onClose, host }) {
  return (
    <div>
      <ModelPopup>
      <div>{host.hostName}</div>
      <div>{host.location}</div>
      <button onClick={onClose}>Close</button>
      </ModelPopup>
    </div>
  )
}
