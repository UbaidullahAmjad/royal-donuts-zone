import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import LeftColumn from "./Contents/LeftColumn";
import "./Storelist.css";

const StoreList = () => {

  return (
    <>
      <Header />
      <div className="storelistMain">
        <LeftColumn />
      </div>
      <Footer />
    </>
  );
};

export default StoreList;
