import React from "react";
import "./Modal.css";

const Modal = ({ title, handleToggle, show, children }) => {
  return (
    <div className={show ? "modal center display-block" : "modal display-none"}>
      <section className="modal-main">
        {title}
        {children}
        <button className="btn btn--small" onClick={handleToggle}>
          close
        </button>
      </section>
    </div>
  );
};

export default Modal;
