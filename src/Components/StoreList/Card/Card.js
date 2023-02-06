/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useTranslation, } from "react-i18next";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { SIMPLE_URL } from "../../../env";

const Card = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const navigate = useNavigate();
  const { store, showCard } = props;
  const { firstId, firstLoad, setFirstLoad } = props;

  useEffect(() => {
    if (firstLoad == true) {
      showCard(firstId);
      setFirstLoad(false);
    }
  }, []);

  let id = store.id;

  const setRoute = (url) => {
    navigate(`/points-vente/${store.url_field}`, { state: { id } });
  };

  return (
    <>
      {store !== null ? (
        <a
          className="card storeCard"
          onClick={() => showCard(store.id)}
          style={{
            textDecoration: "none",
            cursor: "pointer",
            borderColor: "#fff",
          }}
        >
          <div className="col-md-12">
            <div className="cardItems">
              <div className="cardImgCon p-1">
                <img
                  className="leftCardImg img-fluid"
                  src={`${SIMPLE_URL}/images/Store/${store.image}`}
                  alt="img1"
                ></img>
              </div>
              <div className="detailCont">
                {store.isActive === "1" && (
                  <div className="titleRight">
                    <span className="title">{store.name_fr}</span>
                  </div>
                )}
                {store.isActive === "2" && (
                  <div className="titleRight ">
                    <span className="title" style={{ color: "blue" }}>
                      {store.name_fr}
                    </span>
                  </div>
                )}

                <div className="descpCont mt-1">
                  <button className="icon">
                    {" "}
                    <i className="fas fa-id-card addressIcon"></i>
                  </button>
                  <span className="address">{store.address}</span>
                </div>
                <div className="descpCont descpCont_two mt-2">
                  <button className="icon">
                    {" "}
                    <i className="fas fa-phone-alt addressIcon"></i>
                  </button>
                  <span className="phone ">{store.phone}</span>
                </div>
                <div
                  className="container p-0 buttonsCont pb-1"
                  style={{
                    display: "flex",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    marginLeft: 16,
                    marginBottom: 10,
                  }}
                >
                  <a
                    onClick={() => showCard(store.id)}
                    className="find_map btn btn-light btn-sm d-flex justify-content-center align-items-center w-50"
                  >
                    {trans("Find on map")}
                  </a>
                  {store.isActive === "1" && (
                    <a
                      className="more_details btn btn-primary btn-sm d-flex justify-content-center align-items-center w-50"
                      onClick={() => setRoute()}
                    >
                      {trans("More details")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      ) : null}
    </>
  );
};

export default Card;
