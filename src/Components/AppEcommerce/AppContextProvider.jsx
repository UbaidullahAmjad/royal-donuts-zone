/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";

const fontLoader = {
    FontLoadedPoppins: false,
    FontLoadedPoppinsBold: false,
    FontLoadedPoppinsBlack: false,
    FontLoadedJellyDonuts: false,
}

const AppContextProvider = createContext(fontLoader);

export default AppContextProvider;
