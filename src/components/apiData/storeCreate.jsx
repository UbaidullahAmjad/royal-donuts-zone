import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb/index";
import { CKEditor } from "ckeditor4-react";
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
} from "../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../env";

import { useTranslation, } from "react-i18next";
// import Instagram from "../Instagram/instagram";

var arr = [];
const Products = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [content, setContent] = useState(null);
  const [daysArray, setDaysArray] = useState([]);
  const [checkedTue, setCheckedTue] = useState(false);
  const [checkedWed, setCheckedWed] = useState(false);
  const [checkedMon, setCheckedMon] = useState(false);
  const [checkedThu, setCheckedThu] = useState(false);
  const [checkedFri, setCheckedFri] = useState(false);
  const [checkedSat, setCheckedSat] = useState(false);
  const [checkedSun, setCheckedSun] = useState(false);
  const [storeDays, setStoreDays] = useState([]);
  const [singleDay, setSingleDay] = useState(null);
  const ChangeStoreDays = (e) => {
    if (e.target.checked === true) {
      if (e.target.name === "Monday") {
        setCheckedMon(true);
        setSingleDay({ ...singleDay, day_name: "Monday" });
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(true);
        setSingleDay({ ...singleDay, day_name: "Tuesday" });
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(true);
        setSingleDay({ ...singleDay, day_name: "Wednesday" });
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(true);
        setSingleDay({ ...singleDay, day_name: "Thursday" });
      }
      if (e.target.name === "Friday") {
        setCheckedFri(true);
        setSingleDay({ ...singleDay, day_name: "Friday" });
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(true);
        setSingleDay({ ...singleDay, day_name: "Saturday" });
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(true);
        setSingleDay({ ...singleDay, day_name: "Sunday" });
      }
    } else if (e.target.checked === false) {
      if (e.target.name === "Monday") {
        setCheckedMon(false);
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(false);
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(false);
      }
      if (e.target.name === "Friday") {
        setCheckedFri(false);
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(false);
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(false);
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(false);
      }
    }
  };

  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    setValue("description_fr", newContent);
  };

  const navigate = useNavigate();

  const days = [
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    { name: "Sunday" },
  ];

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
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
    if (status == "done") {
      setValue("image", file);
      setError("image", {
        shouldFocus: false,
      });
    }
  };
  const TypeAheadChanged = (data_selected) => {
    setValue("days", data_selected);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    var multiple_images_files = [];
    // if (data.imagegallery != null) {
    //   data.imagegallery.map((item) => multiple_images_files.push(item.file));
    // }
    let newArr = arr.filter(
      (item) =>
        item.name !== "" &&
        item.day_start_time !== "" &&
        item.MonEndTime !== "" &&
        item.day_start_time !== "" &&
        item.TueEndTime !== "" &&
        item.day_start_time !== "" &&
        item.WedEndTime !== "" &&
        item.day_start_time !== "" &&
        item.ThuEndTime !== "" &&
        item.day_start_time !== "" &&
        item.FriEndTime !== "" &&
        item.day_start_time !== "" &&
        item.SatEndTime !== "" &&
        item.day_start_time !== "" &&
        item.SunEndTime !== ""
    );

    var days_array = [];
    // data.days.map((item, index) => days_array.push(item.name));
    if (data.image != undefined) {
      formData.append("image", data.image);
    }
    // if (multiple_images_files.length > 0) {
    //   for (var i = 0; i <= multiple_images_files.length; i++) {
    //     formData.append("imagegallery[]", multiple_images_files[i]);
    //   }
    // }

    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("name_fr", data.name_fr);
    // formData.append("name_fr", data.name_fr);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("email", data.email);
    // formData.append("instagram_username", data.instagram_username);
    // formData.append("instagram_password", data.instagram_password);
    formData.append("zip_code", data.zip_code);
    formData.append("url_field", data.url_field);
    if (storeDays.length > 0) {
      formData.append("storeDays", JSON.stringify(storeDays));
    }
    if (
      data.description_fr != undefined &&
      data.description_fr != "" &&
      data.description_fr != null
    ) {
      formData.append("description_fr", data.description_fr);
    }
    formData.append("instagram_token", data.instagram_token);
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
          // navgiate(`/stores/list`);
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR ----", error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/stores/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
    };
    getData();
  }, []);

  const checkTime = (e) => {
    if (e.target.id === "MonStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "MonEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "TueStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "TueEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "WedStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "WedEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "ThuStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "ThuEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "FriStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "FriEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "SatStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "SatEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    } else if (e.target.id === "SunStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
    } else if (e.target.id === "SunEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
    }
  };

  const setDays = () => {
    if (singleDay != null) {
      if (
        singleDay.name !== "" &&
        singleDay.day_start_time !== "" &&
        singleDay.day_end_time !== ""
      ) {
        setStoreDays([...storeDays, singleDay]);
        toast.success(trans("Time selected"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setSingleDay(null);
      }
    }
  };

  const [instaToken, setInstaToken] = useState("");
  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Create Stores")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>{trans(magasin)}</h5>
              </CardHeader> */}
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Latitude")}
                      </Label>
                      <Input
                        className="form-control"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder={trans("Enter Latitude")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.latitude && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Longitude")}
                      </Label>
                      <Input
                        className="form-control"
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder={trans("Enter the Longitude")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.longitude && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Name of the Shop")}
                      </Label>
                      <Input
                        className="form-control"
                        name="name_fr"
                        type="text"
                        placeholder={trans("Enter the French name")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.name_fr && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Email)}</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
                        innerRef={register({ required: false })}
                      />
                      <span>{errors.email && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Address)}
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Enter Address")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.address && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Call")}
                      </Label>
                      <Input
                        className="form-control"
                        name="phone"
                        type="tel"
                        placeholder={trans("Enter mobile")}
                        innerRef={register({ required: false })}
                      />
                      <span>{errors.phone && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Code Postal")}
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
                      <Label htmlFor="validationCustom02">{trans(Url)}</Label>
                      <InputGroup
                      // className="form-control"
                      // name="url_field"
                      // type="text"
                      // placeholder={trans("Enter URL")}

                      // innerRef={register({ required: true })}
                      >
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

                      <span>
                        {errors.url_field && errors.url_field.type == "required"
                          ? trans("field is required")
                          : errors.url_field && errors.url_field.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Days")}
                      </Label>
                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Monday"
                            id=""
                            innerRef={register({ required: true })}
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Monday</label>
                        </div>
                        {checkedMon == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                id="MonStart"
                                min="00:00"
                                max="23:59"
                                step="60"
                                onChange={checkTime}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                id="MonEnd"
                                type="time"
                                // value={monday.MonEndTime}
                                onChange={(e) => checkTime(e)}
                                defaultValue=""
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Tuesday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Tuesday</label>
                        </div>

                        {checkedTue == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                id="TueStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
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
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Wednesday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Wednesday</label>
                        </div>

                        {checkedWed == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                id="WedStart"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
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
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Thursday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Thursday</label>
                        </div>
                        {checkedThu == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="ThuEndTime"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Friday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Friday</label>
                        </div>

                        {checkedFri == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="FriEndTime"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Saturday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Saturday</label>
                        </div>
                        {checkedSat == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SatEndTime"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>

                      <div class="button-labels d-flex">
                        <div className="col-md-3 mb-3">
                          <input
                            type="checkbox"
                            onChange={(selected) => ChangeStoreDays(selected)}
                            name="Sunday"
                          />
                          &nbsp;&nbsp;
                          <label for="finRot2">Sunday</label>
                        </div>

                        {checkedSun == true && (
                          <>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="day_start_time"
                                onChange={(e) => checkTime(e)}
                                // value={val.startTime}
                                type="time"
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Input
                                className="form-control digits"
                                name="SunEndTime"
                                type="time"
                                onChange={(e) => checkTime(e)}
                                // value={val.endTime}
                                innerRef={register({ required: true })}
                              />
                            </Col>
                            <Col md="3 mb-3">
                              <Button onClick={setDays}>Set Time</Button>
                            </Col>
                          </>
                        )}
                      </div>
                      <span>{errors.days && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Image)}</Label>
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
                        {errors.image && trans("field is required")}
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
                          <CKEditor
                            activeclassName="p10"
                            initData={content}
                            onChange={onChange}
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
                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{Image}</Label>
                      <Controller
                        control={control}
                        name="imagegallery"
                        render={({ onChange }) => (
                          <Dropzone
                            onChangeStatus={handleControlledDropzonChangeStatus}
                          />
                        )}
                        accept="image/*"
                      />
                      <span>
                        {errors.imagegallery && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col> */}
                    <Col md="12 mb-3">
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
                  </div>
                  <Button color="success">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Products;
