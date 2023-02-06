import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation, } from "react-i18next";
import { URL } from "../../env";
import "./copyright.css";

const CopyRight = (props) => {
  const { t } = useTranslation();
  const trans = t;;
  const year = new Date().getFullYear();

  let defaultHomeBGColor = "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)";
  const [HomeBGColor, setHomeBGColor] = useState(defaultHomeBGColor)

  useEffect(() => {
    getHomeSettings();
  }, []);

  const getHomeSettings = async () => {
    await axios
      .post(`${URL}/general_home_setting`)
      .then((response) => {
        setHomeBGColor(response.data.setting.background_color);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  }

  return (
    <Row className="col-12 copyright_row" style={{
      background: HomeBGColor != null && HomeBGColor != "" ? (`linear-gradient(90deg, ${HomeBGColor}A0 0%, ${HomeBGColor}D0 50%, ${HomeBGColor} 100%)`) : defaultHomeBGColor,
    }}>
      <span className="d-flex justify-content-center">
        {trans("Footer Copyright")}
      </span>
    </Row>
  );
};

export default CopyRight;
