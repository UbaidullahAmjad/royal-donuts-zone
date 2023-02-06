/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Components/StoreList/Card/Card";
import CardSkeleton from "../../../Components/StoreList/Card/CardSkeleton";
import Map from "../../../Components/StoreList/Map/Map";
import { storeListGet } from "../../../redux/StoreList/storeListAction";
import "../Storelist.css";
import Skeleton from "@mui/material/Skeleton";
import Geocode from "react-geocode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { usePlacesWidget } from "react-google-autocomplete";
// import Autocomplete from "react-google-autocomplete";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useTranslation, } from "react-i18next";

const LeftColumn = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const [storeId, setStoreId] = useState(null);
  const [storeVisible, setStoreVisible] = useState(false);
  const [searchStore, setSearchStore] = useState("");
  const [radiusValue, setRadiusValue] = useState("10");
  const [searchedStores, setSearchedStores] = useState([]);
  const [totalResult, setTotalResult] = useState(10);
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.getStoreListData.store_list);
  const isSkeleton = useSelector((state) => state.getStoreListData.isSkeleton);

  const setStoreTosearch = (item) => {
    setValue(item);
    setSearchStore(item);
    setSuggestionOpen(false);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <span
          className="suggest_item"
          key={place_id}
          onClick={() => {
            setStoreTosearch(suggestion.description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </span>
      );
    });

  useEffect(() => {
    if (searchStore == "") {
      setSearchedStores([]);
    }
  }, [searchStore]);


  const setRadius = (e) => {
    setRadiusValue(e.target.value);
  };

  let tempArray = [];
  let key = "AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k";
  const getNearyByStore = () => {
    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setRegion("fr");
    if (searchStore != "" && searchStore != null && searchStore != undefined) {
      Geocode.fromAddress(searchStore)
        .then((response) => {
          if (StoreData.length > 0) {
            StoreData.map((store) => {
              let storeLat = parseFloat(store.latitude);
              let storeLang = parseFloat(store.longitude);
              const { lat, lng } = response.results[0].geometry.location;
              var R = 6371; // Radius of the earth in km
              var dLat = deg2rad(lat - storeLat); // deg2rad below
              var dLon = deg2rad(lng - storeLang);
              var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(storeLat)) *
                Math.cos(deg2rad(lat)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km

              let tempDistance = parseFloat(d).toFixed(2);
              let tempObj;
              if (tempDistance <= radiusValue) {
                if (tempArray.length > 0 && tempArray.length < totalResult) {
                  tempArray.push(store);
                }
                if (tempArray.length == 0) {
                  tempArray.push(store);
                }
              }
            });
            if (tempArray.length > 0) {
              setSearchedStores(tempArray);
            } else if (tempArray.length == 0) {
              toast.error("No Store Found in This Area");
            }
          }

          function deg2rad(deg) {
            return deg * (Math.PI / 180);
          }
        })
        .catch((error) => {
          toast.error("Error");
        });
    } else if (
      searchStore == "" ||
      searchStore == undefined ||
      searchStore == null
    ) {
      toast.warn(trans("Enter Store to search"));
    }
  };

  const skeleton = [1, 2, 3];

  const map_section = useRef();
  const store_section = useRef();

  useEffect(() => {
    dispatch(storeListGet());
  }, []);

  const showCard = (id) => {
    setStoreId(id);
    setStoreVisible(true);
  };

  const hideCard = () => {
    setStoreVisible(false);
  };

  const setSearchValue = (e) => {
    setValue(e.target.value);
    setSuggestionOpen(true);
    if (e.target.value == "") {
      setSearchStore("");
    }
  };

  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <>
      <ToastContainer />
      <div className="leftColumnMain">
        <div className="form-control searchBar">
          <input
            type="text"
            value={value}
            disabled={!ready}
            className="inputSearch"
            placeholder="Search store"
            onChange={(e) => setSearchValue(e)}
          ></input>

          {status === "OK" && suggestionOpen == true && (
            <div className="suggestions_div">{renderSuggestions()}</div>
          )}
        </div>
        <div className="search_dropdown" ref={store_section}>
          <div className="radius_title">{trans("Search Radius")}</div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle radius_input"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ minWidth: 110 }}
            >
              {radiusValue != null ? <b>{radiusValue}KM</b> : "select radius"}
            </button>
            <ul
              className="dropdown-menu radius_li_div"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="radius_value" value="10" onClick={setRadius}>
                10KM
              </li>
              <li className="radius_value" value="25" onClick={setRadius}>
                25KM
              </li>
              <li className="radius_value" value="50" onClick={setRadius}>
                50KM
              </li>
              <li className="radius_value" value="100" onClick={setRadius}>
                100KM
              </li>
              <li className="radius_value" value="200" onClick={setRadius}>
                200KM
              </li>
              <li className="radius_value" value="500" onClick={setRadius}>
                500KM
              </li>
            </ul>
          </div>
          <div className="results_title">{trans("Results")}</div>
          <div className="dropdown ms-2">
            <button
              className="btn btn-secondary dropdown-toggle radius_input"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ minWidth: 90 }}
            >
              {totalResult != null && <b>{totalResult}</b>}
            </button>
            <ul
              className="dropdown-menu radius_li_div_result"
              aria-labelledby="dropdownMenuButton1"
            >
              <li
                className="radius_value"
                value={25}
                onClick={(e) => setTotalResult(e.target.value)}
              >
                25
              </li>
              <li
                className="radius_value"
                value={50}
                onClick={(e) => setTotalResult(e.target.value)}
              >
                50
              </li>
              <li
                className="radius_value"
                value={75}
                onClick={(e) => setTotalResult(e.target.value)}
              >
                75
              </li>
              <li
                className="radius_value"
                value={100}
                onClick={(e) => setTotalResult(e.target.value)}
              >
                100
              </li>
            </ul>
          </div>
          <button className="radius_search_button" onClick={getNearyByStore}>
            {trans("Search")}
          </button>
        </div>
      </div>
      <div className="container-fluid p-0 mt-2">
        <div className="leftColumn row m-0 store_left_coloumn_row">
          <div className="col-12 col-md-5 col-lg-5 storeCardsMain_parrent">
            <div className="storeCardsMain">
              {StoreData.length > 0 ? (
                <div>
                  {searchedStores.length == 0
                    ? StoreData.map((item, index) => (
                      <Card
                        showCard={showCard}
                        id={item.id}
                        store={item}
                        key={index + 1}
                        name={item.name_fr}
                        image={item.image}
                        address={item.address}
                        phone_no={item.phone}
                        working_days={
                          item.workingdays != undefined &&
                          JSON.parse(item.workingdays)
                        }
                        open_time={item.open_time}
                        closing_time={item.close_time}
                        url={item.url_field}
                        firstId={StoreData[0].id}
                        firstLoad={firstLoad}
                        setFirstLoad={setFirstLoad}
                      />
                    ))
                    : searchedStores.map((item, index) => (
                      <Card
                        showCard={showCard}
                        id={item.id}
                        store={item}
                        key={index + 1}
                        name={item.name_fr}
                        image={item.image}
                        address={item.address}
                        phone_no={item.phone}
                        working_days={JSON.parse(item.workingdays)}
                        open_time={item.open_time}
                        closing_time={item.close_time}
                        url={item.url_field}
                        firstId={StoreData[0].id}
                        firstLoad={firstLoad}
                        setFirstLoad={setFirstLoad}
                      />
                    ))}
                </div>
              ) : isSkeleton == true ? (
                skeleton.map((item, index) => (
                  <CardSkeleton>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={150}
                      height={80}
                    />
                  </CardSkeleton>
                ))
              ) : (
                <div
                  style={{
                    minHeight: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontFamily: "Poppins" }}>
                    {trans("No Store Data Found")} !!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-7 col-lg-7 mapsMain" ref={map_section}>
            <Map
              storeId={storeId}
              storeVisible={storeVisible}
              filteredStores={searchedStores}
              setStoreVisible={setStoreVisible}
              setStoreId={setStoreId}
              showCard={showCard}
              hideCard={hideCard}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftColumn;
