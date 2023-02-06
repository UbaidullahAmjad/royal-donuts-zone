import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  Image,
  Description,
  Address,
  Email,
  Url,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";

import { translate } from "react-switch-lang";

var arr = [];
const CreateMagasin = (props) => {
  const trans = props.t;
  const [content, setContent] = useState(null);
  const [checkedTue, setCheckedTue] = useState(false);
  const [checkedWed, setCheckedWed] = useState(false);
  const [checkedMon, setCheckedMon] = useState(false);
  const [checkedThu, setCheckedThu] = useState(false);
  const [checkedFri, setCheckedFri] = useState(false);
  const [checkedSat, setCheckedSat] = useState(false);
  const [checkedSun, setCheckedSun] = useState(false);
  const [storeDays, setStoreDays] = useState([])
  const [singleDay, setSingleDay] = useState(null);
  const [CheckedDays, setCheckedDays] = useState([]);
  const [cusomtersList, setCustomersList] = useState([])
  const [zelty, setZelty] = useState(null)
  const [zeltyStatus, setZeltyStatus] = useState(0)

  const ChangeStoreDays = (e) => {
    if (e.target.checked === true) {
      if (e.target.name === "Monday") {
        setCheckedMon(true)
        setSingleDay({ ...singleDay, day_name: "Monday" })
        setCheckedDays([...CheckedDays, { day_name: "Monday" }]);
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(true)
        setSingleDay({ ...singleDay, day_name: "Tuesday" });
        setCheckedDays([...CheckedDays, { day_name: "Tuesday" }]);
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(true)
        setSingleDay({ ...singleDay, day_name: "Wednesday" });
        setCheckedDays([...CheckedDays, { day_name: "Wednesday" }]);
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(true)
        setSingleDay({ ...singleDay, day_name: "Thursday" });
        setCheckedDays([...CheckedDays, { day_name: "Thursday" }]);
      }
      if (e.target.name === "Friday") {
        setCheckedFri(true)
        setSingleDay({ ...singleDay, day_name: "Friday" });
        setCheckedDays([...CheckedDays, { day_name: "Friday" }]);
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(true)
        setSingleDay({ ...singleDay, day_name: "Saturday" });
        setCheckedDays([...CheckedDays, { day_name: "Saturday" }]);
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(true)
        setSingleDay({ ...singleDay, day_name: "Sunday" });
        setCheckedDays([...CheckedDays, { day_name: "Sunday" }]);
      }
    }

    else if (e.target.checked === false) {
      if (e.target.name === "Monday") {
        setCheckedMon(false)
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Friday") {
        setCheckedFri(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(false);
        var checked_days = CheckedDays.filter((item) => item.day_name != e.target.name);
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
    }
  };


  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    setValue("description_fr", newContent);
  };

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if(status =='error_file_size')
    allFiles.forEach(f => f.remove())
    {
      setError(
        "image",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB"),
        },
        {
          shouldFocus: true,
        }
        
      );
    }
    if(status == "done") {
      setValue("image", file);
      setError(
        "image",
        {
          shouldFocus: false
        },
    )
    }
    
  };



  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    const formData = new FormData();
    var multiple_images_files = [];
    console.log("MULTIPLE IMAES", multiple_images_files);


    // data.days.map((item, index) => days_array.push(item.name));
    if (data.image != undefined) {
      formData.append("image", data.image);
    }


    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("name_fr", data.name_fr);
    formData.append("isActive", data.isActive);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("zip_code", data.zip_code);
    formData.append("customer_id", data.customer_id);
    formData.append("url_field", data.url_field);
    formData.append("zelty", data.zelty);
    if (CheckedDays.length > 0) {
      storeDays.filter((item) => item.day_start_time == undefined);
      formData.append("storeDays", JSON.stringify(CheckedDays));
    }
    if (
      data.description_fr != undefined &&
      data.description_fr != "" &&
      data.description_fr != null
    ) {
      formData.append("description_fr", data.description_fr);
    }
    formData.append("instagram_token", data.instagram_token);
    formData.append("head", data.head);
    formData.append("body", data.body);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("robots_meta", data.robots_meta);
    formData.append("canonical_url", data.canonical_url);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/stores`,
      data: formData,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });


        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR ----", error)
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const goBack = () => {
    navigate(`/stores/list/RD`);
  }

  const getCustomers = async () => {
    const response = await axios.get(`https://ecco.royaldonuts.xyz/api/sup_cust`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("resp customers", response);
    setCustomersList(response.data.supplier_customers)
  }

  const getZeltyStatus = ()=>{
    axios.get(`https://ecco.royaldonuts.xyz/api/get_key_status`)
    .then((response)=>{
        console.log('responssss', response)
        setZeltyStatus(response.data.zelti_status)
    }).catch((error)=>{
      console.log('erorror', error)
    })
  }

  console.log('zelty status')

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/stores/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
    };
    getData();
    getCustomers();
    getZeltyStatus();
  }, []);

  const checkTime = (e) => {
    console.log('target', e.target.value, "----ID---", e.target.id);
    if (e.target.id === "MonStart") {
      console.log('target', e.target.value)

      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      console.log("SINGLE DAYYY ----", singleDay);
      var find_day = CheckedDays.some((item) => item.day_name == "Monday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Monday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "MonEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Monday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Monday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "TueStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Tuesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Tuesday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "TueEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value })
      var find_day = CheckedDays.some((item) => item.day_name == "Tuesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Tuesday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "WedStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Wednesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Wednesday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "WedEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Wednesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Wednesday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "ThuStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Thursday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Thursday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "ThuEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Thursday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Thursday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "FriStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Friday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Friday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "FriEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Friday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Friday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "SatStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Saturday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Saturday");

        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "SatEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Saturday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Saturday");

        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }
    else if (e.target.id === "SunStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Sunday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Sunday");
        Object.assign(CheckedDays[find_Day_index], { day_start_time: e.target.value });
      }
    }
    else if (e.target.id === "SunEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Sunday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex((item) => item.day_name == "Sunday");
        Object.assign(CheckedDays[find_Day_index], { day_end_time: e.target.value });
      }
    }

  }

  const setDays = (event) => {
    console.log("SUNGLE DAY ---", singleDay, "---- event ----", event.target.id);
    if (CheckedDays.length > 0) {
      var find_checked_day = CheckedDays.find((item) => item.day_name == event.target.id);
      console.log("FIND CHECKED DAY ---", find_checked_day);
      if (find_checked_day != null && find_checked_day.day_name != undefined && find_checked_day.day_start_time != undefined && find_checked_day.day_end_time != undefined) {

        toast.success(trans("Time selected"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setSingleDay(null)
      }
      else {
        toast.error(trans(event.target.id.toString()) + " " + trans("Select Times"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    else {
      toast.error(trans(event.target.id.toString()) + " " + trans("Select Times"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }


  const [instaToken, setInstaToken] = useState("");

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Create Stores")} />

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
                        {trans("Store Latitude")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder={trans("Enter Latitude")}
                        innerRef={register({ required: true, maxLength: 12, })}
                      />
                      <span>
                        {errors.latitude?.type == "required" && trans("field is required")}
                        {errors.latitude?.type == "maxLength" && trans("Maximum Length: ") + "12"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Longitude")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder={trans("Enter the Longitude")}
                        innerRef={register({ required: true, maxLength: 12, })}
                      />
                      <span>
                        {errors.longitude?.type == "required" && trans("field is required")}
                        {errors.longitude?.type == "maxLength" && trans("Maximum Length: ") + "12"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Name of the Shop")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter the French name")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.name_fr?.type == "required" && trans("field is required")}
                        {errors.name_fr?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name_fr?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Email)} *</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
                        innerRef={register({ required: true, maxLength: 40, })}
                      />
                      <span>{errors.email?.type == "required" && trans("field is required")}
                        {errors.email?.type == "maxLength" && trans("Maximum Length: ") + "40"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Address)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Enter Address")}
                        innerRef={register({ required: true, maxLength: 80 })}
                      />
                      <span>
                        {errors.address?.type == "required" && trans("field is required")}
                        {errors.address?.type === "maxLength" && trans("Maximum Length: ") + "80"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Call")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="phone"
                        type="tel"
                        placeholder={trans("Enter mobile")}
                        innerRef={register({ 
                          required: true, 
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/ 
                        })}
                      />
                      <span className="text-danger">
                        {errors.phone?.type == "required" && trans("field is required")}
                        {errors.phone?.type == "maxLength" && trans("Maximum Length: ") + "18. "}
                        {errors.phone?.type == "pattern" && trans("Please write Phone Format")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zip")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="number"
                        placeholder={trans("Enter Postal")}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                        })}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required")
                          : errors.zip_code &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Url)} *</Label>
                      <InputGroup>
                        <InputGroupText>
                          {window.location.protocol +
                            "/" +
                            window.location.hostname +
                            "/"}
                        </InputGroupText>
                        <Input
                          className="form-control"
                          name="url_field"
                          type="text"
                          placeholder={trans("Enter URL")}
                          innerRef={register({
                            required: true,
                            pattern: {
                              value: /^[a-zA-Z0-9d-\s]+$/,
                              message: trans("Url_Error"),
                            },
                          })}
                        />
                      </InputGroup>

                      <span className="text-danger">
                        {errors.url_field && errors.url_field.type == "required"
                          ? trans("field is required")
                          : errors.url_field && errors.url_field.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Instagram Token")}
                      </Label>
                      <Input
                        className="form-control"
                        name="instagram_token"
                        type="text"
                        placeholder={trans("Add Instagram Token")}
                        innerRef={register({ required: false })}
                        onChange={(event) => setInstaToken(event.target.value)}
                      />
                      <span>
                        {errors.instagram_token && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Status")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="isActive"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected disabled value="">Select status</option>
                        <option value='1' >Active</option>
                        <option value='0' >Inactive</option>
                        <option value='2' >Coming soon</option>
                      </Input>
                      <span className="text-danger">
                        {errors.isActive && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Customer")}
                      </Label>
                      <Input
                        className="form-control"
                        name="customer_id"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected disabled value=''>{trans("Select Customer")}</option>
                        {cusomtersList != [] &&
                          cusomtersList.map((customer) => {
                            return <option value={customer.id}>{customer.name}</option>
                          })
                        })
                      </Input>
                      <span>
                        {errors.customer && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    {zeltyStatus == 1 &&
                    
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zelty key")}
                      </Label>
                      <Input
                        className="form-control"
                        name="zelty"
                        type="text"
                        innerRef={register({ required: true })}
                        onChang= {(e)=>setZelty(e.target.value)}
                      >                       
                      </Input>
                      <span>
                        {errors.zelty && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    }
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Days")} *
                      </Label>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Monday" id="Monday"
                            innerRef={register({ required: true })} />&nbsp;&nbsp;
                          <label for="finRot2">Monday</label>
                        </div>
                        {checkedMon == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="MonStart"
                                id="MonStart"
                                min="00:00"
                                max="23:59"
                                step="60"
                                onChange={checkTime}

                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.MonStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                id="MonEnd"
                                name="MonEnd"
                                type="time"

                                onChange={(e) => checkTime(e)}
                                defaultValue=''
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.MonEnd && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Monday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}

                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Tuesday" />&nbsp;&nbsp;
                          <label for="finRot2">Tuesday</label>
                        </div>

                        {checkedTue == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                id="TueStart"
                                name="TueStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.TueStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="TueEndTime"
                                id="TueEnd"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.TueEndTime && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Tuesday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Wednesday" />&nbsp;&nbsp;
                          <label for="finRot2">Wednesday</label>
                        </div>

                        {checkedWed == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="WedStart"
                                id="WedStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.WedStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="WedEndTime"
                                type="time"
                                id="WedEnd"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.WedEndTime && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Wednesday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Thursday" />&nbsp;&nbsp;
                          <label for="finRot2">Thursday</label>
                        </div>
                        {checkedThu == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="ThuStart"
                                id="ThuStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.ThuStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="ThuEnd"
                                id="ThuEnd"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.ThuEnd && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Thursday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Friday" />&nbsp;&nbsp;
                          <label for="finRot2">Friday</label>
                        </div>

                        {checkedFri == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="FriStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                id="FriStart"
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.FriStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="FriEnd"
                                id="FriEnd"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.FriEnd && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Friday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Saturday" />&nbsp;&nbsp;
                          <label for="finRot2">Saturday</label>
                        </div>
                        {checkedSat == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SatStart"
                                id="SatStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.SatStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SatEnd"
                                id="SatEnd"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.SatEnd && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Saturday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input type="checkbox" onChange={(selected) => ChangeStoreDays(selected)}
                            name="Sunday" />&nbsp;&nbsp;
                          <label for="finRot2">Sunday</label>
                        </div>

                        {checkedSun == true &&
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SunStart"
                                id="SunStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.SunStart && trans("field is required")}
                              </span>
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SunEnd"
                                id="SunEnd"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                              <span>
                                {errors.SunEnd && trans("field is required")}
                              </span>
                            </Col>
                            {/* <Col md="3 mb-3">
                              <Button id="Sunday" onClick={(event) => setDays(event)}>Set Time</Button>
                            </Col> */}
                          </>
                        }
                      </div>

                      <span>{errors.days && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)} *</Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: true }}
                        render={() => (
                          <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            minSizeBytes={0}
                            maxSizeBytes={2000000}
                            inputContent={trans("Drop A File")}
                            styles={{
                              dropzone: { height: 200 },
                              dropzoneActive: { borderColor: "green" },
                            }}
                            accept="image/*"
                            onChangeStatus={handleChangeStatus}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.image?.type == 'required' ? trans("field is required"):
                        errors.image && errors.image.message
                        }
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Description)}
                      </Label>
                      <Controller
                        control={control}
                        name="description_fr"
                        rules={{ required: false }}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={content}
                            events={{
                              change: onChange,
                            }}
                          />
                        )}
                      />

                      <span>
                        {errors.description_fr && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3 p-0">
                      <Card>
                        <CardHeader className = 'pl-1'>
                          <h5>Store SEO</h5>
                        </CardHeader>
                        <CardBody className = 'p-1'>
                          <Label htmlFor="validationCustom02">
                            {trans("Head")}
                          </Label>
                          <Input
                            className="form-control"
                            name="head"
                            type="textarea"
                            placeholder={trans("Add head")}
                            innerRef={register({ required: false })}

                          />
                          <span className="text-danger">
                            {errors.head && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                          <br />
                          <Label htmlFor="validationCustom02">
                            {trans("Body")}
                          </Label>
                          <Input
                            className="form-control"
                            name="body"
                            type="textarea"
                            placeholder={trans("Add body")}
                            innerRef={register({ required: false })}

                          />
                          <span className="text-danger">
                            {errors.body && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        
                          <Label htmlFor="validationCustom02">
                            {trans("Meta Title")}
                          </Label>
                          <Input
                            className="form-control"
                            name="meta_title"
                            type="text"
                            placeholder={trans("Add meta title")}
                            innerRef={register({ required: false })}

                          />
                          <span className="text-danger">
                            {errors.meta_title && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                          <br /> 
                          <Label htmlFor="validationCustom02">
                            {trans("Meta Description")}
                          </Label>
                          <Input
                            className="form-control"
                            name="meta_description"
                            type="textarea"
                            placeholder={trans("Add meta description")}
                            innerRef={register({ required: false })}

                          />
                          <span>
                            {errors.meta_description && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                          <br />
                          <Label htmlFor="validationCustom02">
                            {trans("Robots Meta")}
                          </Label>
                          <Input
                            className="form-control"
                            name="robots_meta"
                            type="textarea"
                            placeholder={trans("Add robots meta")}
                            innerRef={register({ required: false })}

                          />
                          <span>
                            {errors.robots_meta && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                          <br />
                          <Label htmlFor="validationCustom02">
                            {trans("Canonical Url")}
                          </Label>
                          <Input
                            className="form-control"
                            name="canonical_url"
                            type="textarea"
                            placeholder={trans("Add cannonical url")}
                            innerRef={register({ required: false })}

                          />
                          <span>
                            {errors.canonical_url && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateMagasin);


