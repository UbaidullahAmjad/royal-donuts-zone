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
} from "reactstrap";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL } from "../../../env";
import { Typeahead } from 'react-bootstrap-typeahead';
import { TypeAheadToggleButton } from "../../CustomComponents";

const CreateLeads = (props) => {
  const trans = props.t;

  const navigate = useNavigate();


  //   useEffect(() => {
  //     getAllCountries();
  //   }, []);

  //   const getAllCountries = () => {
  //     axios
  //       .get(`${process.env.PUBLIC_URL}/api/all_countries.json`)
  //       .then((response) => {
  //         console.log("countries list", response);
  //         const countries = response.data.map((country) => country.name);
  //         setCountries(countries);
  //       });
  //   };


  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });;


  const countries = Country.getAllCountries();


  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [franchiseValue, setFranchiseValue] = useState()


  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));

  const updatedStates = (isoCode) =>
    State.getStatesOfCountry(isoCode)
      .map((state) => ({ label: state.name, value: state.id, ...state }));



  const updatedCities = (countryCode, isoCode) =>
    City.getCitiesOfState(countryCode, isoCode)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  const franchiseStatus = (e) => {
    console.log('event value', e.target.value)
    setFranchiseValue(e.target.value)
  }

  const onSubmit = (data) => {
    console.log("Lead submitted data", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/leadss`,
      data: formData,
    })
      .then((response) => {
        console.log("Lead response", response);
        if (response.data.success === true) {
          toast.success(
            `${trans("Lead")} ${trans("created")} ${trans("successfully")}`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          // navigate(`/crm/leads/list/RD`);
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        const err_msg = "" + err.response.data.errors.email;
        console.log("CreateLead-error", err_msg);
        toast.error(trans(err_msg), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const goBack = () => {
    navigate(`/crm/leads/list/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Leads")} title={trans("Create Leads")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
                <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("First Name")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans("First Name")}`}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.name?.type == "required" && trans("field is required") ||
                          errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30" ||
                          errors.name?.type == "pattern" && trans("Please write alphanumeric values")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Last Name")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="last_name"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans("Last Name")}`}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.last_name?.type == "required" && trans("field is required") ||
                          errors.last_name?.type == "maxLength" && trans("Maximum Length: ") + "30" ||
                          errors.last_name?.type == "pattern" && trans("Please write alphanumeric values")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Email")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={`${trans("Enter")} ${trans("Email")}`}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                          })
                        }
                      />
                      <span className="text-danger">
                        {errors.email?.type == "required" && trans("field is required")}
                        {errors.email?.type == "maxLength" && trans("Maximum Length: ") + "30. "
                        }
                        {/* { errors.email?.type == "pattern" && trans("Please write numeric values")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans("Address")}`}
                        innerRef={register({ required: true, maxLength: 150 })}
                      />
                      <span>
                        {errors.address?.type == "required" && trans("field is required")}
                        {errors.address?.type == "maxLength" && trans("Maximum Length: ") + "150"}

                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Mobile Number")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="tel"
                        placeholder={trans("Enter Mobile Number")}
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/
                        })}
                      />
                      <span className="text-danger">
                        {errors.mobilenumber?.type == "required" && trans("field is required")}
                        {errors.mobilenumber?.type == "maxLength" && trans("Maximum Length: ") + "18. "}
                        {errors.mobilenumber?.type == "pattern" && trans("Please write numerical values or + or - or ( or )")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Franchise_Name")} *
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
                            onChange={franchiseStatus}
                            innerRef={register({ required: true })}
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
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Select") + " " + trans("Country")} *
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
                              setCountry(value)
                              setValue('country', JSON.stringify(value[0]))
                            }}
                          >
                            {({ isMenuShown, toggleMenu }) => (
                              <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
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
                    {franchiseValue != 'Master Franchise' &&
                      <>
                        <Col md="6 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Select") + " " + trans("State")} *
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
                                options={country.length > 0 ? updatedStates(country[0].isoCode) : []}
                                value={state}
                                onChange={(value) => {
                                  console.log('state', value)
                                  setState(value)
                                  setValue('state', JSON.stringify(value[0]))
                                }}
                              >
                                {({ isMenuShown, toggleMenu }) => (
                                  <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
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
                        <Col md="6 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Select") + " " + trans("city")} *
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
                                options={state.length > 0 ? updatedCities(state[0].countryCode, state[0].isoCode) : []}
                                value={city}
                                onChange={(value) => {
                                  setCity(value)
                                  setValue('city', JSON.stringify(value[0]))
                                }}
                              >
                                {({ isMenuShown, toggleMenu }) => (
                                  <TypeAheadToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
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
                    }
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zip Code")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans("Zip Code")}`}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                          maxLength: 12
                        })}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required") && trans("Maximum Length: ") + "12"
                          : errors.zip_code &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits and must be a positive number"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="12 mb-3">
                                            <Label htmlFor="validationCustom02">
                                                {trans("Lead") + " " + trans("Status")}
                                            </Label>
                                            <Input
                                                className="form-control"
                                                name="progress_status"
                                                type="hidden"
                                                defaultValue={0} //"0: Lead"
                                                innerRef={register({ required: true })}
                                            />
                                            <Input
                                                className="form-control"
                                                type="text"
                                                // defaultValue={trans("Lead")}
                                                placeholder={trans("Lead")}
                                                disabled
                                            />
                                        </Col> */}
                  </div>
                  <Button color="primary">{trans("Submit form")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateLeads);
