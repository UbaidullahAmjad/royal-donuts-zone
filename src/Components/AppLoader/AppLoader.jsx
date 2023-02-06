import React from 'react'
import "../../App.css"

const AppLoader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader-index-wrapper">
                <div className="loader-index">
                    <span></span>
                </div>
                <svg>
                    <defs></defs>
                    <filter id="goo">
                        <fegaussianblur
                            in="SourceGraphic"
                            stdDeviation="11"
                            result="blur"
                        ></fegaussianblur>
                        <fecolormatrix
                            in="blur"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        >
                            {" "}
                        </fecolormatrix>
                    </filter>
                </svg>
            </div>
        </div>
    )
}

export default AppLoader