/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import Loader from "../layout/loader";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import ThemeCustomize from "../layout/theme-customizer";
import { ToastContainer } from "react-toastify";
import {
  useNavigate,
  // withRouter,
} from "react-router-dom";

const Application = ({ children }) => {
  const [sidebarClose, setSidebarClose] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState([]);

  const closeSides = () => {
    setSidebarClose(false);
    setFilteredMenu([]);
  };

  return (
    <Fragment>
      <Loader />
      <div
        className="page-wrapper compact-wrapper"
        id="pageWrapper"
        onClick={() =>
          document
            .querySelector(".language_nav_translate")
            .classList.remove("active")
        }
      >
        <Header
          sidebarClose={sidebarClose}
          setSidebarClose={setSidebarClose}
          filteredMenu={filteredMenu}
          setFilteredMenu={setFilteredMenu}
        />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body" onClick={closeSides}>
            {children}{" "}
          </div>
          <Footer />
        </div>
      </div>
      <ThemeCustomize />
      <ToastContainer />
    </Fragment>
  );
};
export default Application;
// export default withRouter(Application);
