import React, { useState } from "react";
import "./rightSide.css";
import Skeleton from "@mui/material/Skeleton";

const RightSideSkeleton = (props) => {
  return (
    <>
      <div className="rightRow1">
        {/* <SmallMap stores={props.stores} /> */}
        <div className="rightRow2">
          <div className="weekrowsLoc">
            <div id="location_section">
              <div className="location">
                <Skeleton
                  variant="rectangular"
                  width={20}
                  height={20}
                  className="locationIcon"
                />
              </div>
              <Skeleton variant="text" width={200} id="location_description" />
            </div>
            <div style={{ color: "#ec5f7f", marginLeft: "15px" }}>
              <Skeleton variant="text" width={200} />
            </div>
          </div>
          <div className="weekDays col-md-12">
            <div className=" locationIcon">
              <Skeleton variant="rectangular" width={20} height={20} />
            </div>
            <div className="phoneInfo">
              <Skeleton variant="text" width={100} />
            </div>
          </div>

          <div className="weekDaysRow col-md-12">
          <div className=" locationIcon d-flex">
              <Skeleton variant="rectangular" width={20} height={20} />
              <Skeleton variant="text" width={100} />
            </div>
            <div>
              <Skeleton variant="text" width={100} />
            </div>
          </div>
            <div className=" SocialIconsRow col-md-12">

                <Skeleton variant="rectangular" width={40} />   
                <Skeleton className="mr-3" variant="rectangular" width={40} />
                <Skeleton className="mr-3" variant="rectangular" width={40} />
            
            </div>
          </div>
      
      </div>
    </>
  );
};

export default RightSideSkeleton;
