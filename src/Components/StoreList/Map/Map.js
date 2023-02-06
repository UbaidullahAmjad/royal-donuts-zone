/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../../../Pages/StoreList/Storelist.css";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import "./map.css";
import { margin } from "@mui/system";
import { useTranslation, } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecificStore,
  mapStoreList,
} from "../../../redux/StoreList/Map/mapActions";
import { SIMPLE_URL } from "../../../env";

const Map = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { filteredStores } = props;
  let date = new Date();
  let day = new Date(date).toLocaleString("en-us", { weekday: "long" });
  const {
    storeId,
    hideCard,
    storeVisible,
    showCard,
    setStoreVisible,
    setStoreId,
  } = props;
  const [dayName, setDayName] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const stores = useSelector((state) => state.getStoreListData.store_list);
  const foundStore = useSelector(
    (state) => state.specificStoreData.specific_store
  );
  const storeDays = useSelector((state) => state.specificStoreData.store_days);
  const lat = useSelector((state) => state.specificStoreData.lat);
  const lang = useSelector((state) => state.specificStoreData.lang);

  const getDay = () => {
    let date = new Date();
    let day = new Date(date).toLocaleString("en-us", { weekday: "long" });
    setDayName(day);
  };
  const map = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  storeDays &&
    storeDays?.sort((a, b) => {
      return map[a.day_name] - map[b.day_name];
    });

  useEffect(() => {
    dispatch(getSpecificStore(storeId));
    getDay();
  }, [storeId]);

  useEffect(() => {
    if (filteredStores.length > 0) {
      setStoreVisible(false);
      setStoreId(null);
    }
  }, [filteredStores]);

  const setRoute = (url) => {
    let id = foundStore.id;
    navigate(`/points-vente/${foundStore.url_field}`, { state: { id } });
  };
  const temp = storeDays && storeDays?.find((item) => item.day_name == day);
  const temp2 = storeDays && storeDays[0];
  console.log(temp2?.day_name);
  const temp3 = temp2?.day_name;
  return (
    <>
      <div id="div" className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k" }}
          resetBoundsOnResize={true}
          center={{
            lat: lat != null ? lat : 49.445,
            lng: lang != null ? lang : 1.076,
          }}
          zoom={lat != null && filteredStores.length == 0 ? 10 : 5}
        >
          {filteredStores.length > 0
            ? filteredStores.map((place, id) => {
              return (
                <div key={id} lat={place.latitude} lng={place.longitude}>
                  {
                    <img
                      onClick={() => showCard(place.id)}
                      className={
                        foundStore != null &&
                          foundStore.id == place.id &&
                          storeVisible == true
                          ? "bounce"
                          : "simple"
                      }
                      style={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        transform: "translate(-50%, -100%)",
                        cursor: "pointer",
                      }}
                      src={
                        place.isActive === "1"
                          ? "/images/royal_donut_logo.webp"
                          : `/images/royal_donut_blue.webp`
                      }
                      alt="pin"
                    />
                  }
                </div>
              );
            })
            : stores.length > 0 &&
            stores.map((place, id) => {
              return (
                <div key={id} lat={place.latitude} lng={place.longitude}>
                  {
                    <img
                      onClick={() => showCard(place.id)}
                      className={
                        foundStore != null &&
                          foundStore.id == place.id &&
                          storeVisible == true
                          ? "bounce"
                          : "simple"
                      }
                      style={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        transform: "translate(-50%, -100%)",
                        cursor: "pointer",
                      }}
                      src={
                        place.isActive === "1"
                          ? "/images/royal_donut_logo.webp"
                          : `/images/royal_donut_blue.webp`
                      }
                      alt="pin"
                    />
                  }
                </div>
              );
            })}

          {storeVisible == true && foundStore != null && (
            <div
              className="card foundStore_card"
              store={foundStore}
              lat={foundStore.latitude}
              lng={foundStore.longitude}
            >
              <div className="col-12 d-flex flex-column">
                <div className=" col-12 d-flex flex-row">
                  <div className="col-5 p-1 foundStore_image_div">
                    <img
                      style={{
                        height: "100%",
                        borderRadius: "8px",
                        padding: "5px",
                        paddingRight: "0px",
                      }}
                      className="col-12"
                      src={`${SIMPLE_URL}/images/Store/${foundStore.image}`}
                      alt="img1"
                    ></img>
                  </div>
                  <div
                    className="col-6 d-flex flex-column p-1 ps-2"
                    style={{
                      // height: "200px",
                      position: "relative",
                      marginTop: 5,
                    }}
                  >
                    <h6
                      className="foundStore_card_title"
                      style={{ color: "#ec5f7f" }}
                    >
                      {foundStore.name_fr}
                    </h6>
                    <div className=" col-md-12 mt-1 mapDetail">
                      <div
                        style={{
                          background: "#e5e5e5",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "6px",
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        <i
                          className="fas fa-id-card addressIcon"
                          style={{
                            color: "#f36292",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        ></i>
                      </div>
                      <span className="ms-1 mapAddress">
                        {foundStore.address}
                      </span>
                    </div>
                    <div className=" col-md-12 mapDetail  mt-1">
                      <div
                        style={{
                          background: "#e5e5e5",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                          width: "25px",
                          height: "25px",
                        }}
                      >
                        <i
                          className="fas fa-phone addressIcon"
                          style={{
                            color: "#f36292",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        ></i>
                      </div>
                      <span
                        className="ms-1 mapAddress"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {foundStore.phone}
                      </span>
                    </div>
                    {foundStore.isActive === "1" && (
                      <div className=" col-md-12 mapDetail  mt-1">
                        <div
                          style={{
                            background: "#e5e5e5",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <i
                            className="fas fa-clock addressIcon"
                            style={{
                              color: "#f36292",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          ></i>
                        </div>
                        <div
                          className="column"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span className="ms-1 mapAddress">
                            {day == temp?.day_name
                              ? temp?.day_start_time
                              : storeDays[0]?.day_start_time}{" "}
                            to{" "}
                            {day == temp?.day_name
                              ? temp?.day_end_time
                              : storeDays[0]?.day_end_time}{" "}
                          </span>
                          {"  "}
                          {dayName != null && (
                            <span className="ms-1 ml-1 mapAddress">
                              -{" "}
                              {day == temp?.day_name
                                ? temp?.day_name
                                : storeDays[0]?.day_name}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="container col-md-12 d-flex justify-content-center mt-1">
                      <a
                        style={{ color: "#ec5f7f", marginLeft: "15px" }}
                        href={`/points-vente/direction/${foundStore.id}`}
                        target="_blank"
                      >
                        {trans("Get direction")}
                      </a>
                    </div>
                    {foundStore.isActive === "1" && (
                      <div
                        style={{
                          width: "200px",
                          padding: "0px",
                          margin: "0px",
                        }}
                        className="container d-flex justify-content-center align-items-center d mt-1 direction_link_parent"
                      >
                        <a
                          className="direction_link btn btn-primary btn-sm position-absolute"
                          style={{
                            fontFamily: "JellyDonuts",
                            fontSize: "10px",
                            paddingBottom: "-45px",
                            borderRadius: "20px",
                            height: "36px",
                            textAlign: "center",
                            // paddingTop: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => setRoute()}
                        >
                          {trans("More Details")}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="col-1 align-items-end justify-content-end">
                    <button
                      className="btn btn-sm col-1"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginTop: "1.5px",
                      }}
                    >
                      <i
                        className="fas fa-times"
                        onClick={() => hideCard()}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
