/* eslint-disable no-unused-vars */
import React, { useContext, createContext } from 'react'
import AppContextProvider from "./AppContextProvider";
import getWindowDimensions from "../Hooks/useWindowDimensions";
import AppLoader from "../AppLoader/AppLoader";
import ScrollupFloatingButton from "../ScrollupFloatingButton/ScrollupFloatingButton"
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect,
    Navigate,
} from "react-router-dom";
import { eccomRoutes } from "../../routes"
import CookiesPopupBox from "../CookiesBox/CookiesPopupBox";

export const ScrollPositionContext = createContext(null);

const EcommerceAppContext = () => {

    const {
        FontLoadedPoppins,
        FontLoadedPoppinsBold,
        FontLoadedPoppinsBlack,
        FontLoadedJellyDonuts,
    } = useContext(AppContextProvider);

    const { screenWidth } = getWindowDimensions();

    return (
        <>
            <ScrollPositionContext.Provider value={0}>
                {FontLoadedPoppins == true &&
                    FontLoadedPoppinsBold == true &&
                    FontLoadedPoppinsBlack == true &&
                    FontLoadedJellyDonuts == true ? (
                    <>
                        <BrowserRouter>
                            <CookiesPopupBox />
                            <Routes>
                                {
                                    eccomRoutes.map(({ path, Component }) => (
                                        <Route key={path}
                                            exact
                                            path={`${process.env.PUBLIC_URL}${path}`}
                                            element={<Component />}
                                        />
                                    ))
                                }
                            </Routes>
                        </BrowserRouter>
                    </>
                ) : (
                    <AppLoader />
                )}
            </ScrollPositionContext.Provider>
            {screenWidth >= 900 &&
                !window.location.pathname.includes("/invoice") &&
                FontLoadedPoppins == true &&
                FontLoadedPoppinsBold == true &&
                FontLoadedPoppinsBlack == true &&
                FontLoadedJellyDonuts == true && (
                    <ScrollupFloatingButton />
                )}
        </>
    )
}

export default EcommerceAppContext