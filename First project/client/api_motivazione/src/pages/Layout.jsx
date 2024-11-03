import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

const Layout = ({LocalData}) => {
  return (
    <>
      <Header LocalData={LocalData}/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
