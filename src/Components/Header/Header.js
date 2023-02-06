import React from "react";

import Navbar from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import { useTranslation, } from "react-i18next";

const Header = ({ single_store }, props) => {
  const { t } = useTranslation();
  const trans = t;

  return (
    <div
      style={{
        background: "rgb(245,145,178)",
        background:
          "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)",
        overflow: "visible",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={12}>
          <Navbar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
