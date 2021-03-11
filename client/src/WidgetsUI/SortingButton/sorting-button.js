import React from "react";
import "./sortingButton.css";

const SortingButton = ({ pressed, onPress, text }) => {
  return (
    <div
      className={`sort-bt-contain ${pressed ? "pressed" : "released"}`}
      onClick={onPress}
    >
      {text}
    </div>
  );
};

export default SortingButton;
