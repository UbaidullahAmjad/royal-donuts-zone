/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./card.css";
import Skeleton from "@mui/material/Skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div
        className="card storeCard"
        // href={`/points-vente/rouen/${store.id}`}
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        <div className="col-md-12">
          <div className="cardItems">
            <div className="cardImgCon p-1">
              <Skeleton
                className="leftCardImg img-fluid"
                variant="rectangular"
              />
            </div>
            <div className="detailCont">
              <div className="titleRight">
                <Skeleton className="title" variant="rectangular" />
              </div>
              <div className="titleRight ">
                <Skeleton variant="text" className="w-100" />
              </div>
              <div className="descpCont mt-1">
                <Skeleton className="icon addressIcon" variant="text" />
                <span className="address">
                  <Skeleton variant="text" width={100} />
                </span>
              </div>
              <div className="descpCont descpCont_two mt-1">
                <Skeleton className="icon addressIcon" variant="text" />

                <span className="phone ">
                  <Skeleton variant="text" width={100} />
                </span>
              </div>
              <div className="container p-0 buttonsCont pb-1 d-flex justify-content-center">
                <div className="find_map btn btn-primary btn-sm d-flex justify-content-center align-items-center">
                  <Skeleton variant="text" />
                </div>
                <div className="more_details btn btn-primary btn-sm d-flex justify-content-center align-items-center">
                  <Skeleton variant="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
