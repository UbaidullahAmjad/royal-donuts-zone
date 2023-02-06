/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "../../App.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollupFloatingButton = (props) => {

    const [scrollYPosition, setScrollYPosition] = useState(0);
    const [bottomCartBtnMargin, setBottomCartBtnMargin] = useState(0);

    const listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = winScroll / height;

        setScrollYPosition(scrolled);

        if (window.location.pathname.includes("/produit/")) {
            if (scrolled >= 0.24) {
                setBottomCartBtnMargin(65);
            } else {
                setBottomCartBtnMargin(0);
            }
        } else {
            setBottomCartBtnMargin(0);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);

        return () => {
            window.addEventListener("scroll", listenToScroll);
        };
    }, []);

    return (
        <div
            className="scrollup_floating_btn"
            onClick={() => window.scrollTo(0, 0)}
            style={
                scrollYPosition >= 0.18
                    ? {
                        transform: "translateY(0)",
                        marginBottom:
                            scrollYPosition >= 0.18 ? bottomCartBtnMargin : 0,
                    }
                    : {
                        transform: "translateY(150%)",
                        marginBottom:
                            scrollYPosition >= 0.18 ? bottomCartBtnMargin : 0,
                    }
            }
        >
            <KeyboardArrowUpIcon className="scrollup_icon" />
        </div>
    )
}

export default ScrollupFloatingButton