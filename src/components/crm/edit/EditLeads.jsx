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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { Typeahead } from 'react-bootstrap-typeahead';
import { URL, SIMPLE_URL } from "../../../env";
import { Country, State, City } from "country-state-city";
import { TypeAheadToggleButton } from "../../CustomComponents";

const EditLeads = (props) => {
  const trans = props.t;



  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });;

  const params = useParams();
  const navigate = useNavigate();
  const [LeadsData, setLeadsData] = useState([]);
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [franchiseValue, setFranchiseValue] = useState()

  const countries = Country.getAllCountries();

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


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/leadss/${params.id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("Lead-Data-resp", response)
      const data = [];
      data.push(response.data.lead);
      setFranchiseValue(response.data.lead.franchise_name)
      setLeadsData(data);
      let country = updatedCountries.filter((item) => item.name == response.data.lead.country)
      console.log('country', country)
      setCountry(country)
      let selectedState = State.getStatesOfCountry(country.length > 0 && country[0].isoCode).filter((item) => item.name == response.data.lead.state)
      setState(selectedState)
      let selectedCity = City.getCitiesOfState(selectedState.length > 0 && selectedState[0].countryCode, selectedState[0].isoCode)
        .filter((item) => item.name == response.data.lead.city)
      setCity(selectedCity)

    };
    getData();
  }, []);





  const franchiseStatus = (e) => {
    console.log('event value', e.target.value)
    setFranchiseValue(e.target.value)
  }


  const onSubmit = (data) => {
    console.log("Lead-Edit submitted data", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
    formData.append("address", data.address);
    formData.append("email", data.email);
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

    formData.append("_method", "PATCH");

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/leadss/${params.id}`,
      data: formData,
    })
      .then((response) => {

        if (response.data.success === true) {
          toast.success(
            `${trans("Lead")} ${trans("updated")} ${trans("successfully")}`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          // navigate(`/crm/leads/list/RD`);
        } else {
          toast.error(trans(response.data.message), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
    // .catch((err) => {
    //   console.log('email error', err.response.data.message)
    //   toast.error(trans(err.response.data.message), {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // });
  };

  const goBack = () => {
    navigate(`/crm/leads/list/RD`);
  };



  console.log('selected state', state)
  console.log('selected city', city)
  return (
    <Fragment>
      <Breadcrumb
        parent={`${trans("Edit")} ${trans("Leads")}`}
        title={`${trans("Edit")} ${trans("Leads")}`}
      />

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
                        {trans("First Name")}
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
                        key={LeadsData.length > 0 && LeadsData[0].name}
                        defaultValue={LeadsData.length > 0 && LeadsData[0].name}
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
                        {trans("Last Name")}
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
                        key={LeadsData.length > 0 && LeadsData[0].last_name}
                        defaultValue={LeadsData.length > 0 && LeadsData[0].last_name}
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
                        {trans("Email")}
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
                        key={LeadsData.length > 0 && LeadsData[0].email}
                        defaultValue={LeadsData.length > 0 && LeadsData[0].email}

                      />
                      <span>
                        {errors.email && errors.email?.type == "required"
                          ? trans("email is required") && trans(" Maximum Length: ") + "30"
                          : errors.email && errors.email.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")}
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans("Address")}`}
                        innerRef={register({ required: true, maxLength: 150 })}
                        key={LeadsData.length > 0 && LeadsData[0].address}
                        defaultValue={LeadsData.length > 0 && LeadsData[0].address}
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
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/
                        })}
                        key={LeadsData.length > 0 && LeadsData[0].mobilenumber}
                        defaultValue={
                          LeadsData.length > 0 && LeadsData[0].mobilenumber
                        }
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
                        {trans("Franchise_Name")}
                      </Label>
                      <Controller
                        control={control}
                        name="franchise_name"
                        rules={{ required: true }}
                        key={LeadsData.length > 0 && LeadsData[0].franchise_name}
                        defaultValue={
                          LeadsData.length > 0 && LeadsData[0].franchise_name
                        }
                        render={() => (
                          <Input
                            className="form-control"
                            name="franchise_name"
                            type="select"
                            innerRef={register({ required: true })}
                            key={LeadsData.length > 0 && LeadsData[0].franchise_name}
                            defaultValue={
                              LeadsData.length > 0 && LeadsData[0].franchise_name
                            }
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
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Select") + " " + trans("Country")}
                      </Label>
                      <Controller
                        control={control}
                        name="country"

                        defaultValue={LeadsData.length > 0
                          ? LeadsData
                          : []
                        }
                        rules={{ required: true }}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            name='country'
                            id="country"
                            label='country'
                            clearButton
                            options={updatedCountries}
                            value={LeadsData.length > 0 ? LeadsData : []}
                            key={LeadsData.length > 0 ? LeadsData : []}
                            defaultSelected={LeadsData.length > 0 ? updatedCountries.filter((item) => item.name == LeadsData[0].country) : []}
                            placeholder="Choose a state..."
                            onChange={(value) => {
                              setCity([])
                              setState([])
                              setCountry(value);
                              setValue("country", JSON.stringify(value[0]));
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
                            {trans("Select") + " " + trans("State")}
                          </Label>
                          <Controller
                            control={control}
                            name="state"
                            rules={{ required: true }}
                            defaultValue={LeadsData.length > 0
                              ? LeadsData
                              : []
                            }
                            render={() => (
                              <Typeahead
                                className="typehead_form_control"
                                id="state"
                                name="state"
                                labelKey='name'
                                clearButton
                                value={LeadsData.length > 0 ? LeadsData : []}
                                options={country.length > 0 ? updatedStates(country[0].isoCode) : []}
                                key={state.length > 0 ? state : []}
                                defaultSelected={state.length > 0 ? state : []}
                                onChange={(value) => {
                                  setCity([])
                                  setState(value, false)
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
                            {trans("Select") + " " + trans("city")}
                          </Label>
                          <Controller
                            control={control}
                            name="city"
                            rules={{ required: true }}
                            defaultValue={LeadsData.length > 0
                              ? LeadsData
                              : []
                            }
                            render={() => (
                              <Typeahead
                                className="typehead_form_control"
                                id="city"
                                name="city"
                                labelKey="name"
                                clearButton
                                value={LeadsData.length > 0 ? LeadsData : []}
                                options={state.length > 0 ? updatedCities(state[0].countryCode, state[0].isoCode) : []}
                                key={city.length > 0 ? city : []}
                                defaultSelected={city.length > 0 ? city : []}
                                onChange={(value) => {
                                  setCity(value, false)
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
                        {trans("Zip Code")}
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
                        key={LeadsData.length > 0 && LeadsData[0].zip_code}
                        defaultValue={LeadsData.length > 0 && LeadsData[0].zip_code}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required") && trans("Maximum Length: ") + "30"
                          : errors.zip_code &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits and must be a positive number"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="6 mb-3">
                                            <Label htmlFor="validationCustom02">
                                                {trans("Lead") + " " + trans("Stage")}
                                            </Label>
                                            <Input
                                                className="form-control"
                                                name="progress_status"
                                                type="hidden"
                                                innerRef={register({ required: true })}
                                                key={LeadsData != null && LeadsData.progress_status}
                                                defaultValue={
                                                    LeadsData != null && LeadsData.progress_status
                                                }
                                            />
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder={LeadsData !== null && getCurrLeadStage(LeadsData.progress_status)}
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

export default translate(EditLeads);
