import axios from "axios";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { URL } from "../../env";

const NearbyStores = () => {
  const [distance, setDistance] = useState([]);
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = () => {
    axios
      .get(`${URL}/get_stores`)
      .then((response) => {
        setStoreList(response.data.stores);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  let tempArray = [];
  const getDistance = () => {
    setDistance([]);
    if (storeList.length > 0) {
      storeList.map((store) => {
        let storeLat = parseFloat(store.latitude);
        let storeLang = parseFloat(store.longitude);
        Geocode.setApiKey("AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k");
        Geocode.setLanguage("en");
        Geocode.setRegion("fr");

        Geocode.fromAddress(83500)
          .then((response) => {
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
            if(tempDistance <= 15)
            {
              tempObj = { store: store, distance: tempDistance };
              tempArray.push(tempObj);
              setMeasuringDistance(tempObj);
            }
          })
          .catch((error) => {
            console.error("error", error);
          });
      });
    }
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  };

  const setMeasuringDistance = (tempObj) => {
    setDistance((prevState)=>[...prevState,tempObj]);
  };

  return (
    <>
      <div>
        {distance.length > 0 &&
          distance.map((dist) => {
            return (
              <div className="d-flex flex-column">
                <h3>{dist.name}</h3>
                <h3>{dist.distance}</h3>
              </div>
            );
          })}
        <button onClick={getDistance}>calculate</button>
      </div>
    </>
  );
};

export default NearbyStores;
