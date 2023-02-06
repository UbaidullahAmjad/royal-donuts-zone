/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  TabContent,
  TabPane,
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { translate } from "react-switch-lang";
import SweetAlert from "sweetalert2";
import { Country, State, City } from "country-state-city";
import { TypeAheadToggleButton } from "../../CustomComponents";
// import { countries } from './country-cities';

const BeforeLead = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [alert, setalert] = useState(false);
  const [beforeLeadStatus, setBeforeLeadStatus] = useState();

  const countries = Country.getAllCountries();

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [franchiseValue, setFranchiseValue] = useState();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));

  const updatedStates = (isoCode) =>
    State.getStatesOfCountry(isoCode).map((state) => ({
      label: state.name,
      value: state.id,
      ...state,
    }));

  const updatedCities = (countryCode, isoCode) =>
    City.getCitiesOfState(countryCode, isoCode).map((city) => ({
      label: city.name,
      value: city.id,
      ...city,
    }));

  useEffect(() => {
    const getStatus = () => {
      axios
        .get(`https://ecco.royaldonuts.xyz/api/check_before_lead`)
        .then((response) => {
          setBeforeLeadStatus(response.data.data);
        })
        .catch((error) => {});
    };
    getStatus();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const Displayalert = (name, id) => {
    setalert(true);
    SweetAlert.fire({
      title: trans("Your form have been approved"),
      text: trans("Click button to login"),
      icon: "success",
      confirmButtonText: "Login",
      showCancelButton: true,
    }).then((val) => {
      if (val.isConfirmed == true) {
        localStorage.removeItem("token123");
        localStorage.removeItem("token_expiry_time");
        navigate("/login");
      }
    });
  };

  const franchiseStatus = (e) => {
    console.log("event value", e.target.value);
    setFranchiseValue(e.target.value);
  };

  const onSubmit = (data) => {
    console.log("Lead submitted data", data);
    console.log("data country", country);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
    // formData.append('user_name', data.user_name)
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("franchise_name", data.franchise_name);
    formData.append("country", country[0].name);
    formData.append("country_latitude", country[0].latitude);
    formData.append("country_longitude", country[0].longitude);
    if (city.length > 0) {
      formData.append("city", city[0].name);
      formData.append("city_latitude", city[0].latitude);
      formData.append("city_longitude", city[0].longitude);
    }
    if (state.length > 0) {
      formData.append("state", state[0].name);
      formData.append("state_latitude", state[0].latitude);
      formData.append("state_longitude", state[0].longitude);
    }
    formData.append("zip_code", data.zip_code);
    // formData.append("progress_status", 0);

    axios({
      method: "post",
      url: `https://ecco.royaldonuts.xyz/api/before_lead_submit`,
      data: formData,
    })
      .then((response) => {
        console.log("Lead response", response);
        if (response.data.success === true) {
          Displayalert();
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        const err_msg = "" + err.response.data.message;
        console.log("CreateLead-error", err_msg);
        toast.error(trans(err_msg), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  console.log("beforeLeadStatus ----- ", beforeLeadStatus);

  return (
    <Container fluid={true} className="p-0">
      <ToastContainer />
      <Row style={{ margin: 0 }}>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div style={{ textAlign: "center" }}>
                <span
                  onClick={() =>
                    (window.location.href = `${process.env.PUBLIC_URL}/login`)
                  }
                  style={{ cursor: "pointer", color: "#f36292" }}
                  // style={{ cursor: "pointer", color: "#0275d8" }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    Royal Donuts
                  </span>
                </span>
              </div>
              <div
                className="login-main login-tab "
                style={{
                  boxShadow: "1px 1px 3px gray",
                  marginTop: "20px",
                  width: "600px",
                }}
              >
                {beforeLeadStatus == null && (
                  <TabContent
                    className="content-login"
                    style={{ height: "auto" }}
                  >
                    <TabPane className="fade show">
                      <Form
                        className="needs-validation theme-form"
                        noValidate=""
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-row">
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("First Name")}
                            </Label>
                            <Input
                              className="form-control"
                              name="name"
                              type="text"
                              placeholder={`${trans("Enter")} ${trans(
                                "First Name"
                              )}`}
                              innerRef={register({
                                required: true,
                                maxLength: 30,
                                pattern: /^[a-zA-Z.\s]+$/,
                              })}
                            />
                            <span>
                              {errors.name?.type == "required" &&
                                trans("field is required")}
                              {errors.name?.type == "maxLength" &&
                                trans("Maximum Length: ") + "30"}
                              {errors.name?.type == "pattern" &&
                                "Please write alphabets only"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Last Name")}
                            </Label>
                            <Input
                              className="form-control"
                              name="last_name"
                              type="text"
                              placeholder={`${trans("Enter")} ${trans(
                                "Last Name"
                              )}`}
                              innerRef={register({
                                required: true,
                                maxLength: 30,
                                pattern: /^[a-zA-Z.\s]+$/,
                              })}
                            />
                            <span>
                              {errors.last_name?.type == "required" &&
                                trans("field is required")}
                              {errors.last_name?.type == "maxLength" &&
                                trans("Maximum Length: ") + "30"}
                              {errors.last_name?.type == "pattern" &&
                                "Please write alphabets only"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Email")}
                            </Label>
                            <Input
                              className="form-control"
                              name="email"
                              type="email"
                              placeholder={`${trans("Enter")} ${trans(
                                "Email"
                              )}`}
                              innerRef={register({ required: true })}
                            />
                            <span>
                              {errors.email && trans("email is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Address")}
                            </Label>
                            <Input
                              className="form-control"
                              name="address"
                              type="text"
                              placeholder={`${trans("Enter")} ${trans(
                                "Address"
                              )}`}
                              innerRef={register({ required: true })}
                            />
                            <span>
                              {errors.address &&
                                `${trans("Address")} ${trans("is required")}`}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Mobile Number")}
                            </Label>
                            <Input
                              className="form-control"
                              name="mobilenumber"
                              type="tel"
                              placeholder={trans("Enter Mobile Number")}
                              innerRef={register({
                                required: true,
                                maxLength: 18,
                                pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                              })}
                            />
                            <span className="text-danger">
                              {errors.mobilenumber?.type == "required" &&
                                trans("field is required")}
                              {errors.mobilenumber?.type == "maxLength" &&
                                trans("Maximum Length: ") + "18. "}
                              {errors.mobilenumber?.type == "pattern" &&
                                trans(
                                  "Please write numerical values or + or - or ( or )"
                                )}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Franchise_Name")}
                            </Label>
                            <Controller
                              control={control}
                              name="franchise_name"
                              rules={{ required: true }}
                              defaultValue=""
                              render={() => (
                                <Input
                                  className="form-control"
                                  name="franchise_name"
                                  type="select"
                                  innerRef={register({ required: true })}
                                  onChange={franchiseStatus}
                                >
                                  <option value="" selected="true" disabled>
                                    {trans("Select") + " " + trans("Franchise")}
                                  </option>
                                  <option value={"Franchise"}>
                                    {trans("Franchise")}
                                  </option>
                                  <option value={"Master Franchise"}>
                                    {trans("Master Franchise")}
                                  </option>
                                </Input>
                              )}
                            />
                            <span className="text-danger">
                              {errors.franchise_name &&
                                `${trans("Franchise")} ${trans("is required")}`}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Select") + " " + trans("Country")}
                            </Label>
                            <Controller
                              control={control}
                              name="country"
                              rules={{ required: true }}
                              defaultValue=""
                              render={() => (
                                <Typeahead
                                  className="typehead_form_control"
                                  id="country"
                                  name="country"
                                  label="country"
                                  options={updatedCountries}
                                  value={country}
                                  placeholder="Choose a state..."
                                  onChange={(value) => {
                                    setCountry(value);
                                    setValue(
                                      "country",
                                      JSON.stringify(value[0])
                                    );
                                  }}
                                >
                                  {({ isMenuShown, toggleMenu }) => (
                                    <TypeAheadToggleButton
                                      isOpen={isMenuShown}
                                      onClick={(e) => toggleMenu()}
                                    />
                                  )}
                                </Typeahead>
                              )}
                            />
                            <span className="text-danger">
                              {errors.country &&
                                `${trans("Country")} ${trans("is required")}`}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          {franchiseValue != "Master Franchise" && (
                            <>
                              <Col md="12 mb-3">
                                <Label htmlFor="validationCustom02">
                                  {trans("Select") + " " + trans("State")}
                                </Label>
                                <Controller
                                  control={control}
                                  name="state"
                                  rules={{ required: true }}
                                  defaultValue=""
                                  render={() => (
                                    <Typeahead
                                      className="typehead_form_control"
                                      id="state"
                                      name="state"
                                      options={
                                        country.length > 0
                                          ? updatedStates(country[0].isoCode)
                                          : []
                                      }
                                      value={state}
                                      onChange={(value) => {
                                        console.log("state", value);
                                        setState(value);
                                        setValue(
                                          "state",
                                          JSON.stringify(value[0])
                                        );
                                      }}
                                    >
                                      {({ isMenuShown, toggleMenu }) => (
                                        <TypeAheadToggleButton
                                          isOpen={isMenuShown}
                                          onClick={(e) => toggleMenu()}
                                        />
                                      )}
                                    </Typeahead>
                                  )}
                                />
                                <span className="text-danger">
                                  {errors.state &&
                                    `${trans("state")} ${trans("is required")}`}
                                </span>
                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </Col>
                              <Col md="12 mb-3">
                                <Label htmlFor="validationCustom02">
                                  {trans("Select") + " " + trans("city")}
                                </Label>
                                <Controller
                                  control={control}
                                  name="city"
                                  rules={{ required: true }}
                                  defaultValue=""
                                  render={() => (
                                    <Typeahead
                                      className="typehead_form_control"
                                      id="city"
                                      name="city"
                                      options={
                                        state.length > 0
                                          ? updatedCities(
                                              state[0].countryCode,
                                              state[0].isoCode
                                            )
                                          : []
                                      }
                                      value={city}
                                      onChange={(value) => {
                                        setCity(value);
                                        setValue(
                                          "city",
                                          JSON.stringify(value[0])
                                        );
                                      }}
                                    >
                                      {({ isMenuShown, toggleMenu }) => (
                                        <TypeAheadToggleButton
                                          isOpen={isMenuShown}
                                          onClick={(e) => toggleMenu()}
                                        />
                                      )}
                                    </Typeahead>
                                  )}
                                />
                                <span className="text-danger">
                                  {errors.city &&
                                    `${trans("city")} ${trans("is required")}`}
                                </span>
                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </Col>
                            </>
                          )}
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Zip Code")}
                            </Label>
                            <Input
                              className="form-control"
                              name="zip_code"
                              type="text"
                              placeholder={`${trans("Enter")} ${trans(
                                "Zip Code"
                              )}`}
                              innerRef={register({
                                required: true,
                                maxLength: 10,
                                pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                              })}
                            />
                            <span>
                              {errors.zip_code?.type == "required" &&
                                trans("field is required")}
                              {errors.zip_code?.type == "maxLength" &&
                                trans("Maximum Length: ") + "10"}
                              {errors.zip_code?.type == "pattern" &&
                                trans(
                                  "zip code must be 5 digits and can be up to 9 digits and must be positive value"
                                )}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                        </div>
                        <Button color="primary">{trans("Submit")}</Button>
                      </Form>
                    </TabPane>
                  </TabContent>
                )}
                {/* {beforeLeadStatus == null && null} */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default translate(BeforeLead);
