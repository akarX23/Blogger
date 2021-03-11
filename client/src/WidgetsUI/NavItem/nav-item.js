import React from "react";
import "./nav-item.css";

const NavItem = (props) => {
  return (
    <a href={props.link} className="nav-link">
      <p>{props.text}</p>
    </a>
  );
};

export default NavItem;
