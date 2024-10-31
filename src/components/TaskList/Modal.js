import React from 'react';
import './Modal.css'; // Skapa en CSS-fil för modalen

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;