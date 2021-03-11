import React from "react";
import "./authButton.css";

const AuthButton = ({ link, text }) => {
  return (
    <a href={link}>
      <div className="bt-contain">
        <p className="bt-text">{text}</p>
      </div>
    </a>
  );
};

export default AuthButton;
