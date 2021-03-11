import React from "react";
import Header from "../Components/Header/header";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 130 }} />
      {props.children}
    </>
  );
};

export default Layout;
