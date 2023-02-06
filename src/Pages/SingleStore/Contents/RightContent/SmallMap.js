import React from "react";
import "./rightSide.css";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  const { stores } = props;

  return (
    <>
      <div className="smallmap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k" }}
          // defaultZoom={10}
          resetBoundsOnResize={true}
          center={{
            lat: stores.latitude != null ? parseFloat(stores.latitude) : 49.445,
            lng:
              stores.longitude != null ? parseFloat(stores.longitude) : 1.076,
          }}
          zoom={stores.latitude != null ? 10 : 5}
        >
          <div key={stores.id} lat={stores.latitude} lng={stores.longitude}>
            <img
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                transform: "translate(-50%, -100%)",
              }}
              src={"/images/royal_donut_logo.webp"}
              alt="pin"
            />
          </div>
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
