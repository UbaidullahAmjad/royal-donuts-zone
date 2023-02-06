import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { translate } from "react-switch-lang";
import userlogo from "../../../assets/images/userlogo.png";
import "./leadsMap.css";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";

const LeadsMap = (props) => {
  const trans = props.t;
  const navigate = useNavigate();

  const [allLeads, setAllLeads] = useState([]);
  const [leadFound, setLeadFound] = useState(null);
  const [userVisible, setUserVisible] = useState(false);

  const getLeads = async () => {
    const response = await axios.get(
      `https://ecco.royaldonuts.xyz/api/leadss`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      }
    );
    console.log("response", response);
    setAllLeads(response.data.leads);
  };

  useEffect(() => {
    getLeads();
  }, []);

  const showCard = (id) => {
    axios
      .get(`https://ecco.royaldonuts.xyz/api/leadss/${id}/edit`)
      .then((response) => {
        console.log("user detial", response);
        setLeadFound(response.data.lead);
        setUserVisible(true);
      })
      .catch((error) => {});
  };

  const viewLead = async (id) => {
    //  navigate(`/crm/leads/view/${id}/RD`)
    await axios
      .get(`https://ecco.royaldonuts.xyz/api/leadss/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        navigate(`/crm/leads/view/${id}/RD`);
      })
      .catch((err) => {
        SweetAlert.fire({
          icon: "error",
          title: trans("Lead") + " " + trans("View"),
          // text: trans("This User don't have any Lead"),
          text: trans(err.response.data.message),
          confirmButtonText: trans("OK"),
        });
      });
  };

  const hideCard = () => {
    setUserVisible(false);
  };

  return (
    <>
      <div id="div" className="map" style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k" }}
          // defaultZoom={5}
          resetBoundsOnResize={true}
          center={{ lat: 46.2276, lng: 2.2137 }}
          zoom={7}
        >
          {allLeads.length > 0 &&
            allLeads.map((user, id) => {
              console.log("user", parseFloat(user.lead.city_latitude));
              return (
                <div
                  key={id}
                  lat={
                    user.lead.city != null
                      ? parseFloat(user.lead.city_latitude)
                      : parseFloat(user.lead.country_latitude)
                  }
                  lng={
                    user.lead.city != null
                      ? parseFloat(user.lead.city_longitude)
                      : parseFloat(user.lead.country_longitude)
                  }
                >
                  {
                    <img
                      onClick={() => showCard(user.lead.id)}
                      //   className={leadFound != null && leadFound.id == user.id && userVisible == true ? "bounce" : 'simple'}
                      style={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        transform: "translate(-50%, -100%)",
                        cursor: "pointer",
                      }}
                      src={userlogo}
                      alt="pin"
                    />
                  }
                </div>
              );
            })}
          {userVisible == true && (
            <div
              className="card"
              style={{
                width: "300px",
                paddingBottom: "5px",
                height: "150px",
                maxHeight: "150px",
                borderRadius: "12px",
                top: "-210px",
                left: "-145px",
                position: "absolute",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
              lat={
                leadFound.city != null
                  ? parseFloat(leadFound.city_latitude)
                  : parseFloat(leadFound.country_latitude)
              }
              lng={
                leadFound.city != null
                  ? parseFloat(leadFound.city_longitude)
                  : parseFloat(leadFound.country_longitude)
              }
            >
              <div className="col-12 d-flex flex-column m-0 p-0">
                <div className=" col-12 d-flex flex-row m-0 p-0">
                  <div className="col-9 d-flex flex-column p-1 ps-2  justify-content-center">
                    <div className="d-flex justify-content-start m-2 ">
                      <i
                        className="fa fa-user addressIcon mr-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                      <span style={{ fontSize: "12px" }}>
                        <b>Name:</b> {leadFound.name}
                      </span>
                    </div>
                    <div className="d-flex justify-content-start m-2 ">
                      <i
                        className="fa fa-id-card addressIcon mr-1"
                        style={{ fontSize: "12px" }}
                      ></i>
                      <span style={{ fontSize: "12px" }}>
                        <b>Address:</b> {leadFound.address}
                      </span>
                    </div>
                    <div className="d-flex justify-content-start m-2 ">
                      <i
                        className="fa fa-phone addressIcon mr-2"
                        style={{ fontSize: "12px" }}
                      ></i>
                      <span style={{ fontSize: "12px" }}>
                        <b>Phone:</b> {leadFound.mobilenumber}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center ">
                      <Button
                        style={{ marginLeft: "30%" }}
                        onClick={() => viewLead(leadFound.id)}
                      >
                        view lead
                      </Button>
                    </div>
                  </div>

                  <div className="col-1 align-items-start justify-content-center">
                    <button
                      className="btn btn-sm"
                      style={{ color: "black", fontSize: "10px" }}
                    >
                      <i className="fa fa-times" onClick={() => hideCard()}></i>
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

{
  /* <div className="col-1 align-items-end justify-content-end">
<button className="btn btn-sm col-1" style={{ color: 'black', fontSize: '10px' }}><i className="fas fa-times" onClick={() => hideCard()}></i></button>
</div> */
}

export default translate(LeadsMap);
