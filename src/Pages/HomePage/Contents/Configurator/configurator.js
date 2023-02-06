/* eslint-disable no-unused-vars */
import React  from "react";
import "./configurator.css";
import { useTranslation, } from "react-i18next";
import getWindowDimensions from '../../../../Components/Hooks/useWindowDimensions';
import ConfiguratorDesk from "./ConfiguratorDesk";
import ConfiguratorMobi from "./ConfiguratorMobi";


const Configurator = (props) => {
  const { t } = useTranslation();
const trans = t;;
  const { screenWidth, screenHeight } = getWindowDimensions();

  return (
    <>
      {
        screenWidth < 768 ? <ConfiguratorMobi /> : <ConfiguratorDesk />
      }
    </>
  );
};

export default Configurator;
