import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { Typeahead } from "react-bootstrap-typeahead";
import { useForm, Controller } from "react-hook-form";
import "./index.css";
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
  magasin,
  jours,
  LatitudeDuMagasin,
  Image,
  LongitudeDuMagasin,
  NomDuMagasin,
  MagasinFrench,
  Description,
  Téléphoner,
  Address,
  Email,
  Url,
  NomInstagram,
  CodePostal,
  MotInstagram,
  HeureDouverture,
  HeureDeFermeture,
  Store,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/images/logo/logoo.png";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import Instagram from "../../Instagram/instagram";
var arr = [];
const CreateMagasin = (props) => {
  const trans = props.t;
  const [content, setContent] = useState(null);
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description_fr", "");
    } else {
      setValue("description_fr", newContent);
    }
  };

  const params = useParams();
  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const [StoreData, setStoreData] = useState(null);
  const [image, setImage] = useState(null);
  const [InstagramToken, setInstagramToken] = useState(null);
  const [daysArray, setDaysArray] = useState([]);
  const [storeSeoData, setStoreSeoData] = useState(null);

  console.log("store seo data", storeSeoData);

  const [checkedTue, setCheckedTue] = useState(false);
  const [checkedWed, setCheckedWed] = useState(false);
  const [checkedMon, setCheckedMon] = useState(false);
  const [checkedThu, setCheckedThu] = useState(false);
  const [checkedFri, setCheckedFri] = useState(false);
  const [checkedSat, setCheckedSat] = useState(false);
  const [checkedSun, setCheckedSun] = useState(false);
  const [CheckedDays, setCheckedDays] = useState([]);
  const [storeDays, setStoreDays] = useState([]);
  const [singleDay, setSingleDay] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customersList, setCustomersList] = useState([]);
  const [zelty, setZelty] = useState(null);
  const [zeltyStatus, setZeltyStatus] = useState(0);

  const [EmptyStoreDaysData, setEmptyStoreDaysData] = useState(null);

  const ChangeStoreDays = (e) => {
    console.log(
      "ChangeStoreDays value ------------------------------",
      e.target.checked
    );

    if (e.target.checked === true) {
      if (e.target.name === "Monday") {
        setCheckedMon(true);
        setSingleDay({ ...singleDay, day_name: "Monday" });
        if (!CheckedDays.some((item) => item.day_name == "Monday")) {
          setCheckedDays([...CheckedDays, { day_name: "Monday" }]);
        }
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(true);
        setSingleDay({ ...singleDay, day_name: "Tuesday" });
        if (!CheckedDays.some((item) => item.day_name == "Tuesday")) {
          setCheckedDays([...CheckedDays, { day_name: "Tuesday" }]);
        }
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(true);
        setSingleDay({ ...singleDay, day_name: "Wednesday" });
        if (!CheckedDays.some((item) => item.day_name == "Wednesday")) {
          setCheckedDays([...CheckedDays, { day_name: "Wednesday" }]);
        }
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(true);
        setSingleDay({ ...singleDay, day_name: "Thursday" });
        if (!CheckedDays.some((item) => item.day_name == "Thursday")) {
          setCheckedDays([...CheckedDays, { day_name: "Thursday" }]);
        }
      }
      if (e.target.name === "Friday") {
        setCheckedFri(true);
        setSingleDay({ ...singleDay, day_name: "Friday" });
        if (!CheckedDays.some((item) => item.day_name == "Friday")) {
          setCheckedDays([...CheckedDays, { day_name: "Friday" }]);
        }
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(true);
        setSingleDay({ ...singleDay, day_name: "Saturday" });
        if (!CheckedDays.some((item) => item.day_name == "Saturday")) {
          setCheckedDays([...CheckedDays, { day_name: "Saturday" }]);
        }
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(true);
        setSingleDay({ ...singleDay, day_name: "Sunday" });
        if (!CheckedDays.some((item) => item.day_name == "Sunday")) {
          setCheckedDays([...CheckedDays, { day_name: "Sunday" }]);
        }
      }
    } else if (e.target.checked === false) {
      if (e.target.name === "Monday") {
        setCheckedMon(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Tuesday") {
        setCheckedTue(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Wednesday") {
        setCheckedWed(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Friday") {
        setCheckedFri(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Thursday") {
        setCheckedThu(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Saturday") {
        setCheckedSat(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
      if (e.target.name === "Sunday") {
        setCheckedSun(false);
        var checked_days = CheckedDays.filter(
          (item) => item.day_name != e.target.name
        );
        setCheckedDays(checked_days);
        storeDays.filter((item) => item.day_name != e.target.name);
      }
    }
  };

  useEffect(() => {
    if (CheckedDays.length == 0) {
      setEmptyStoreDaysData(0);
    } else if (CheckedDays.length > 0) {
      setEmptyStoreDaysData(1);
    }
  }, [CheckedDays]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    control,
  } = useForm({ shouldFocusError: true });

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
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

  const TypeHeadChanged = (data_selected) => {
    setValue("days", data_selected);
  };
  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    var multiple_images_files = [];
    // if (data.imagegallery != null) {
    //   data.imagegallery.map((item) => multiple_images_files.push(item.file));
    // }
    console.log("MULTIPLE IMAES", multiple_images_files);

    const formData = new FormData();
    if (data.image != undefined) {
      formData.append("image", data.image);
    }
    // if (multiple_images_files.length > 0) {
    //   console.log("this is ", multiple_images_files);
    //   for (var i = 0; i <= multiple_images_files.length; i++) {
    //     formData.append("imagegallery[]", multiple_images_files[i]);
    //   }
    // }

    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("name_fr", data.name_fr);
    formData.append("customer_id", data.customer_id);
    formData.append("isActive", data.isActive);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("zip_code", data.zip_code);
    formData.append("url_field", data.url_field);
    formData.append("zelty", data.zelty);
    if (CheckedDays.length > 0) {
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
    formData.append("_method", "PATCH");
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
      url: `${URL}/stores/` + params.idd,
      data: formData,
    })
      .then((response) => {
        console.log("response after edit ", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setImage(response.data.data.image);
          setBackBtn(true);
        } else {
          console.log("DATA ERROR STORE EDIT--- ", response.data);
          if (response.data.type == "url_field") {
            setError(
              "url_field",
              {
                type: "string",
                message: trans("Url_Taken"),
              },
              {
                shouldFocus: true,
              }
            );
            toast.error(trans("Url_Taken"), {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      })
      .catch((error) => {
        console.log("DATA ERROR STORE EDIT--- ", error.response.data);
        if (Object.keys(error.response.data.errors)[0] == "url_field") {
          const value = Object.keys(error.response.data.errors)[0];
          setError(
            "url_field",
            {
              type: "string",
              message: trans("Url_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Url_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const goBack = () => {
    navigate(`/stores/list/RD`);
  };

  const getZeltyStatus = () => {
    axios
      .get(`https://ecco.royaldonuts.xyz/api/get_key_status`)
      .then((response) => {
        console.log("responssss", response);
        setZeltyStatus(response.data.zelti_status);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/stores/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setStoreData(response.data.store);
      setSelectedCustomer(response.data.selected_customer);
      setCustomersList(response.data.supplier_customers);
      setImage(response.data.store.image);
      setInstagramToken(response.data.store.instagram_token);
      setStoreDays(response.data.store_days);
      setStoreSeoData(response.data.store_seo);
      setZelty(response.data.store.zelty);
      if (response.data.store_days.length > 0) {
        var response_store_days = response.data.store_days;
        var all_days_data = [];
        response_store_days.map((item) =>
          all_days_data.push({
            day_name: item.day_name,
            day_start_time: item.day_start_time,
            day_end_time: item.day_end_time,
          })
        );
        setCheckedDays(all_days_data);
      }
      setContent(response.data.store.description_fr);
    };
    getData();
    getZeltyStatus();
  }, []);

  useEffect(() => {
    CheckedDays.map((item) => {
      // debugger;
      if (item.day_name !== null && item.day_name == "Monday") {
        setCheckedMon(true);
      } else if (item.day_name !== null && item.day_name == "Tuesday") {
        setCheckedTue(true);
      } else if (item.day_name !== null && item.day_name == "Wednesday") {
        setCheckedWed(true);
      } else if (item.day_name !== null && item.day_name == "Thursday") {
        setCheckedThu(true);
      } else if (item.day_name !== null && item.day_name == "Friday") {
        setCheckedFri(true);
      } else if (item.day_name !== null && item.day_name == "Saturday") {
        setCheckedSat(true);
      } else if (item.day_name !== null && item.day_name == "Sunday") {
        setCheckedSun(true);
      }
    });
  }, [CheckedDays]);

  const checkTime = (e) => {
    console.log("target", e.target.value, "----ID---", e.target.id);
    if (e.target.id === "MonStart") {
      console.log("target", e.target.value);

      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      console.log("SINGLE DAYYY ----", singleDay);
      var find_day = CheckedDays.some((item) => item.day_name == "Monday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Monday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "MonEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Monday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Monday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "TueStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Tuesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Tuesday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "TueEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Tuesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Tuesday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "WedStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Wednesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Wednesday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "WedEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Wednesday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Wednesday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "ThuStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Thursday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Thursday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "ThuEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Thursday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Thursday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "FriStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Friday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Friday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "FriEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Friday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Friday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "SatStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Saturday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Saturday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "SatEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Saturday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Saturday"
        );

        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    } else if (e.target.id === "SunStart") {
      setSingleDay({ ...singleDay, day_start_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Sunday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Sunday"
        );
        Object.assign(CheckedDays[find_Day_index], {
          day_start_time: e.target.value,
        });
      }
    } else if (e.target.id === "SunEnd") {
      setSingleDay({ ...singleDay, day_end_time: e.target.value });
      var find_day = CheckedDays.some((item) => item.day_name == "Sunday");
      if (find_day) {
        var find_Day_index = CheckedDays.findIndex(
          (item) => item.day_name == "Sunday"
        );
        Object.assign(CheckedDays[find_Day_index], {
          day_end_time: e.target.value,
        });
      }
    }
  };

  const setDays = (event) => {
    console.log(
      "SUNGLE DAY ---",
      singleDay,
      "---- event ----",
      event.target.id
    );
    if (CheckedDays.length > 0) {
      var find_checked_day = CheckedDays.find(
        (item) => item.day_name == event.target.id
      );
      console.log("FIND CHECKED DAY ---", find_checked_day);
      if (
        find_checked_day != null &&
        find_checked_day.day_name != undefined &&
        find_checked_day.day_start_time != undefined &&
        find_checked_day.day_end_time != undefined
      ) {
        toast.success(
          trans(event.target.id.toString()) + " " + trans("Time selected"),
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setSingleDay(null);
      } else {
        setCheckedDays([...CheckedDays, singleDay]);
        toast.error(
          trans(event.target.id.toString()) + " " + trans("Select Times"),
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } else {
      toast.error(
        trans(event.target.id.toString()) + " " + trans("Select Times"),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  console.log("CHECK TIME mionday ---- ", CheckedDays);

  console.log("CHECK EmptyStoreDaysData ---- ", EmptyStoreDaysData);
  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Megasin")} />

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
                      <Label htmlFor="validationCustom04">
                        {trans("Store Latitude")} *
                      </Label>
                      <Input
                        id="validationCustom04"
                        className="form-control"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder={trans("Enter Latitude")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                        })}
                        key={StoreData != null && StoreData.latitude}
                        defaultValue={StoreData != null && StoreData.latitude}
                      />
                      <span>
                        {errors.latitude?.type && trans("field is required")}
                        {errors.latitude?.type === "maxLength" &&
                          trans("Maximum Length: ") + "12"}
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
                        innerRef={register({ required: true, maxLength: 12 })}
                        key={StoreData != null && StoreData.longitude}
                        defaultValue={StoreData != null && StoreData.longitude}
                      />
                      <span>
                        {errors.longitude?.type && trans("field is required")}
                        {errors.longitude?.type === "maxLength" &&
                          trans("Maximum Length: ") + "12"}
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
                        placeholder={trans("Enter French name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={StoreData != null && StoreData.name_fr}
                        defaultValue={StoreData != null && StoreData.name_fr}
                      />
                      <span>
                        {errors.name_fr?.type && trans("field is required")}
                        {errors.name_fr?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name_fr?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Email)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
                        innerRef={register({ required: true, maxLength: 30 })}
                        key={StoreData != null && StoreData.email}
                        defaultValue={StoreData != null && StoreData.email}
                      />
                      <span>
                        {errors.email?.type && trans("field is required")}
                        {errors.email?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
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
                        innerRef={register({ required: true })}
                        key={StoreData != null && StoreData.address}
                        defaultValue={StoreData != null && StoreData.address}
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
                        {trans("Call")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="phone"
                        type="tel"
                        placeholder="Entrez le mobile"
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                        })}
                        key={StoreData != null && StoreData.phone}
                        defaultValue={StoreData != null && StoreData.phone}
                      />
                      <span>
                        {errors.phone?.type == "required" &&
                          trans("field is required")}
                        {errors.phone?.type == "maxLength" &&
                          trans("Maximum Length: ") + "18. "}
                        {errors.phone?.type == "pattern" &&
                          trans("Please write Phone Format")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Code Postal")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Enter Postal")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                        })}
                        key={StoreData != null && StoreData.zip_code}
                        defaultValue={StoreData != null && StoreData.zip_code}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required")
                          : errors.zip_code &&
                            trans(
                              "zip code must be 5 digits and can be up to 9 digits"
                            )}
                        {errors.zip_code?.type === "maxLength" &&
                          trans("Maximum Length: ") + "12"}
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
                          placeholder="Entrez l'url "
                          innerRef={register({
                            required: true,
                            pattern: {
                              value: /^[a-zA-Z0-9d-\s]+$/,
                              message: trans("Url_Error"),
                            },
                          })}
                          key={StoreData != null && StoreData.url_field}
                          defaultValue={
                            StoreData != null && StoreData.url_field
                          }
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
                        key={InstagramToken}
                        defaultValue={InstagramToken}
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
                        innerRef={register({ required: false })}
                        key={StoreData != null && StoreData.isActive}
                        defaultValue={StoreData != null && StoreData.isActive}
                      >
                        <option selected disabled value="">
                          Select status
                        </option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                        <option value="2">Coming soon</option>
                      </Input>
                      <span>
                        {errors.isActive && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Customer")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="customer_id"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected disabled value="">
                          {trans("Select Customer")}
                        </option>
                        {customersList != [] &&
                          customersList.map((customer) => {
                            return (
                              <option
                                selected={
                                  selectedCustomer != null &&
                                  customer.id == selectedCustomer.id
                                }
                                value={customer.id}
                              >
                                {customer.name}
                              </option>
                            );
                          })}
                        )
                      </Input>
                      <span>
                        {errors.customer && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>

                    {zeltyStatus == 1 && (
                      <Col md="12 mb-3">
                        <Label htmlFor="validationCustom02">
                          {trans("Zelty key")} *
                        </Label>
                        <Input
                          className="form-control"
                          name="zelty"
                          type="text"
                          innerRef={register({ required: true })}
                          key={zelty != null ? zelty : ""}
                          defaultValue={zelty != null ? zelty : ""}
                          onChang={(e) => setZelty(e.target.value)}
                        ></Input>
                        <span>
                          {errors.zelty && trans("field is required")}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    )}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Store Days")} *
                      </Label>
                      {CheckedDays.length > 0 && (
                        <div>
                          <div class="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Monday"
                                defaultChecked={
                                  CheckedDays.length > 0 &&
                                  CheckedDays.some(
                                    (item) => item.day_name == "Monday"
                                  )
                                }
                                innerRef={register({ required: true })}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Monday</label>
                            </div>
                            {checkedMon == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control"
                                    name="MonStart"
                                    id="MonStart"
                                    min="00:00"
                                    max="23:59"
                                    step="60"
                                    onChange={checkTime}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Monday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Monday"
                                      )["day_start_time"]
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Monday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Monday"
                                      )["day_start_time"]
                                    }
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.MonStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    id="MonEnd"
                                    name="MonEnd"
                                    type="time"
                                    // value={monday.MonEndTime}
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Monday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Monday"
                                      )["day_end_time"]
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Monday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Monday"
                                      )["day_end_time"]
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.MonEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Monday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={ChangeStoreDays}
                                name="Tuesday"
                                defaultChecked={
                                  CheckedDays.length > 0 &&
                                  CheckedDays.some(
                                    (item) => item.day_name == "Tuesday"
                                  )
                                }
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Tuesday</label>
                            </div>

                            {checkedTue !== false && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    id="TueStart"
                                    name="TueStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Tuesday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Tuesday"
                                      )["day_start_time"]
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Tuesday"
                                      ) &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Tuesday"
                                      )["day_start_time"]
                                    }
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.TueStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="TueEnd"
                                    id="TueEnd"
                                    type="time"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Tuesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Tuesday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Tuesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Tuesday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.TueEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Tuesday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Wednesday"
                                defaultChecked={CheckedDays.some(
                                  (item) => item.day_name == "Wednesday"
                                )}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Wednesday</label>
                            </div>

                            {checkedWed == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="WedStart"
                                    id="WedStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Wednesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Wednesday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Wednesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Wednesday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.WedStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="WedEnd"
                                    type="time"
                                    id="WedEnd"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Wednesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Wednesday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Wednesday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Wednesday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.WedEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Wednesday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Thursday"
                                defaultChecked={CheckedDays.some(
                                  (item) => item.day_name == "Thursday"
                                )}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Thursday</label>
                            </div>
                            {checkedThu == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="ThuStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Thursday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Thursday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Thursday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Thursday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    id="ThuStart"
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.ThuStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="ThuEnd"
                                    type="time"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Thursday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Thursday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.some(
                                        (item) => item.day_name == "Thursday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Thursday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    id="ThuEnd"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.ThuEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Thursday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Friday"
                                defaultChecked={CheckedDays.some(
                                  (item) => item.day_name == "Friday"
                                )}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Friday</label>
                            </div>

                            {checkedFri == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="FriStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Friday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Friday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Friday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Friday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    id="FriStart"
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.FriStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="FriEnd"
                                    id="FriEnd"
                                    type="time"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Friday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Friday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Friday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Friday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.FriEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Friday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Saturday"
                                defaultChecked={CheckedDays.some(
                                  (item) => item.day_name == "Saturday"
                                )}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Saturday</label>
                            </div>
                            {checkedSat == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="SatStart"
                                    id="SatStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Saturday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Saturday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Saturday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Saturday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.SatStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="SatEnd"
                                    id="SatEnd"
                                    type="time"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Saturday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Saturday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Saturday"
                                      )
                                        ? CheckedDays.find(
                                            (item) =>
                                              item.day_name == "Saturday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.SatEnd && trans("field is requird")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Saturday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>

                          <div className="button-labels d-flex">
                            <div className="col-md-3 mb-3">
                              <input
                                type="checkbox"
                                onChange={(selected) =>
                                  ChangeStoreDays(selected)
                                }
                                name="Sunday"
                                defaultChecked={CheckedDays.some(
                                  (item) => item.day_name == "Saturday"
                                )}
                              />
                              &nbsp;&nbsp;
                              <label for="finRot2">Sunday</label>
                            </div>

                            {checkedSun == true && (
                              <>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="SunStart"
                                    id="SunStart"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Sunday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Sunday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Sunday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Sunday"
                                          )["day_start_time"]
                                        : ""
                                    }
                                    type="time"
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.SunStart &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  <Input
                                    className="form-control digits"
                                    name="SunEnd"
                                    id="SunEnd"
                                    type="time"
                                    onChange={(e) => checkTime(e)}
                                    defaultValue={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Sunday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Sunday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    key={
                                      CheckedDays.length > 0 &&
                                      CheckedDays.find(
                                        (item) => item.day_name == "Sunday"
                                      )
                                        ? CheckedDays.find(
                                            (item) => item.day_name == "Sunday"
                                          )["day_end_time"]
                                        : ""
                                    }
                                    innerRef={register({ required: true })}
                                  />
                                  <span>
                                    {errors.SunEnd &&
                                      trans("field is required")}
                                  </span>
                                </Col>
                                <Col md="3 mb-3">
                                  {/* <Button
                                    id="Sunday"
                                    className="form-control"
                                    onClick={(event) => setDays(event)}
                                  >
                                    Set Time
                                  </Button> */}
                                </Col>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      {EmptyStoreDaysData != null &&
                        CheckedDays.length == 0 &&
                        EmptyStoreDaysData == 0 && (
                          <div>
                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={ChangeStoreDays}
                                  name="Monday"
                                />
                                &nbsp;&nbsp;
                                <label for="finRot2">Monday</label>
                              </div>

                              {checkedTue !== false && (
                                <>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      id="MonStart"
                                      name="MonStart"
                                      onChange={(e) => checkTime(e)}
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.TueStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="MonEnd"
                                      id="MonEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.TueEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Monday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>
                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={ChangeStoreDays}
                                  name="Tuesday"
                                />
                                &nbsp;&nbsp;
                                <label for="finRot2">Tuesday</label>
                              </div>

                              {checkedTue !== false && (
                                <>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      id="TueStart"
                                      name="TueStart"
                                      onChange={(e) => checkTime(e)}
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.TueStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="TueEnd"
                                      id="TueEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.TueEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Tuesday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>

                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={(selected) =>
                                    ChangeStoreDays(selected)
                                  }
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
                                      name="WedStart"
                                      id="WedStart"
                                      onChange={(e) => checkTime(e)}
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.WedStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="WedEnd"
                                      type="time"
                                      id="WedEnd"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.WedEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Wednesday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>

                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={(selected) =>
                                    ChangeStoreDays(selected)
                                  }
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
                                      name="ThuStart"
                                      onChange={(e) => checkTime(e)}
                                      id="ThuStart"
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.ThuStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="ThuEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      id="ThuEnd"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.ThuEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Thursday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>

                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={(selected) =>
                                    ChangeStoreDays(selected)
                                  }
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
                                      name="FriStart"
                                      onChange={(e) => checkTime(e)}
                                      id="FriStart"
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.FriStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="FriEnd"
                                      id="FriEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.FriEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Friday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>

                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={(selected) =>
                                    ChangeStoreDays(selected)
                                  }
                                  name="Saturday"
                                  defaultChecked={CheckedDays.some(
                                    (item) => item.day_name == "Saturday"
                                  )}
                                />
                                &nbsp;&nbsp;
                                <label for="finRot2">Saturday</label>
                              </div>
                              {checkedSat == true && (
                                <>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="SatStart"
                                      id="SatStart"
                                      onChange={(e) => checkTime(e)}
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.SatStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="SatEnd"
                                      id="SatEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.SatEnd &&
                                        trans("field is requird")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Saturday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>

                            <div className="button-labels d-flex">
                              <div className="col-md-3 mb-3">
                                <input
                                  type="checkbox"
                                  onChange={(selected) =>
                                    ChangeStoreDays(selected)
                                  }
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
                                      name="SunStart"
                                      id="SunStart"
                                      onChange={(e) => checkTime(e)}
                                      type="time"
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.SunStart &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Input
                                      className="form-control digits"
                                      name="SunEnd"
                                      id="SunEnd"
                                      type="time"
                                      onChange={(e) => checkTime(e)}
                                      innerRef={register({ required: true })}
                                    />
                                    <span>
                                      {errors.SunEnd &&
                                        trans("field is required")}
                                    </span>
                                  </Col>
                                  <Col md="3 mb-3">
                                    <Button
                                      id="Sunday"
                                      className="form-control"
                                      onClick={(event) => setDays(event)}
                                    >
                                      Set Time
                                    </Button>
                                  </Col>
                                </>
                              )}
                            </div>
                          </div>
                        )}
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
                        rules={{ required: false }}
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
                      <div className="container d-flex justify-content-center align-items-center mt-3">
                        {image != null && (
                          <img
                            width={100}
                            height={100}
                            src={`https://ecco.royaldonuts.xyz/images/Store/${image}`}
                            alt={"alt"}
                            onError={(e) => {
                              e.currentTarget.src = logo;
                            }}
                          ></img>
                        )}
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
                        key={StoreData != null && StoreData.description_fr}
                        defaultValue={
                          StoreData != null && StoreData.description_fr
                        }
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
                        <CardHeader className="pl-1">
                          <h5>Store SEO</h5>
                        </CardHeader>
                        <CardBody className="p-1">
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Head")}
                            </Label>
                            <Input
                              className="form-control"
                              name="head"
                              type="textarea"
                              placeholder={trans("Add head")}
                              innerRef={register({ required: false })}
                              // key={storeSeoData != null && storeSeoData.head}
                              defaultValue={
                                storeSeoData != null ? storeSeoData.head : ""
                              }
                            />
                            <span>
                              {errors.head && trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Body")}
                            </Label>
                            <Input
                              className="form-control"
                              name="body"
                              type="textarea"
                              placeholder={trans("Add body")}
                              innerRef={register({ required: false })}
                              // key={storeSeoData != null && storeSeoData.body}
                              defaultValue={
                                storeSeoData != null ? storeSeoData.body : ""
                              }
                            />
                            <span>
                              {errors.body && trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Meta Title")}
                            </Label>
                            <Input
                              className="form-control"
                              name="meta_title"
                              type="text"
                              placeholder={trans("Add meta title")}
                              innerRef={register({ required: false })}
                              key={
                                storeSeoData != null && storeSeoData.meta_title
                              }
                              defaultValue={
                                storeSeoData != null
                                  ? storeSeoData.meta_title
                                  : ""
                              }
                            />
                            <span>
                              {errors.meta_title && trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Meta Description")}
                            </Label>
                            <Input
                              className="form-control"
                              name="meta_description"
                              type="textarea"
                              placeholder={trans("Add meta description")}
                              innerRef={register({ required: false })}
                              // key={storeSeoData != null && storeSeoData.meta_description}
                              defaultValue={
                                storeSeoData != null
                                  ? storeSeoData.meta_description
                                  : ""
                              }
                            />
                            <span>
                              {errors.meta_description &&
                                trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Robots Meta")}
                            </Label>
                            <Input
                              className="form-control"
                              name="robots_meta"
                              type="textarea"
                              placeholder={trans("Add robots meta")}
                              innerRef={register({ required: false })}
                              // key={storeSeoData != null && storeSeoData.robots_meta}
                              defaultValue={
                                storeSeoData != null
                                  ? storeSeoData.robots_meta
                                  : ""
                              }
                            />
                            <span>
                              {errors.robots_meta && trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                          <Col md="12 mb-3 p-0">
                            <Label htmlFor="validationCustom02">
                              {trans("Canonical Url")}
                            </Label>
                            <Input
                              className="form-control"
                              name="canonical_url"
                              type="textarea"
                              placeholder={trans("Add cannonical url")}
                              innerRef={register({ required: false })}
                              key={
                                storeSeoData != null &&
                                storeSeoData.canonical_url
                              }
                              defaultValue={
                                storeSeoData != null
                                  ? storeSeoData.canonical_url
                                  : ""
                              }
                            />
                            <span>
                              {errors.canonical_url &&
                                trans("field is required")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Col>
                        </CardBody>
                      </Card>
                    </Col>
                  </div>
                  <Button className="mt-4" color="primary">
                    {trans("Save")}
                  </Button>
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
