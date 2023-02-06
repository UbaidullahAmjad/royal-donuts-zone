import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
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
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";

const EditSupplierAdmin = (props) => {
  const { t } = useTranslation();
  const trans = t;
  let { idd } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const initialstate = {
    new_form_field: [],
    field_name: [],
    newfield_name: [],
    fname: "",
    newfname: "",
    field_type: [],
    newfield_type: [],
    ftype: "",
    newftype: "",
    field_label: [],
    newfield_label: [],
    flabel: "",
    newflabel: "",
    name: "",
    progress_status: "",
    option_names: [],
    optname: "",
    new_option_names_temp: [],
    new_option_names: [],
    new_optname: "",
  };
  const [FormData, setFormData] = useState(initialstate);

  const {
    new_form_field,
    field_name,
    field_type,
    field_label,
    name,
    fname,
    ftype,
    flabel,
    progress_status,
    newfield_name,
    newfname,
    newfield_label,
    newflabel,
    newfield_type,
    newftype,
    option_names,
    optname,
    new_option_names_temp,
    new_option_names,
    new_optname,
  } = FormData;

  const [AllLeadStages, setAllLeadStages] = useState(null);
  const [AllOptions, setAllOptions] = useState([]);
  const [DelRow, setDelRow] = useState([]);

  const handleType = (event, val) => {
    const { name, value } = event.target;
    const get_specific_field_index = forms.findIndex(
      (item) => (item.form_id = val.form_id && item.id == val.id)
    );
    forms[get_specific_field_index].field_type = event.target.value;

    setForms(forms);
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const [forms, setForms] = useState([]);
  const [names, setNames] = useState({});

  const onSubmit = (e) => {
    axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/formss/${idd}`,
      data: {
        field_name: JSON.stringify(field_name),
        field_type: JSON.stringify(field_type),
        field_label: JSON.stringify(field_label),
        new_form_field: JSON.stringify(new_form_field),
        name: name,
        progress_status: progress_status,
        option_ids: JSON.stringify(AllOptions),
        remove: JSON.stringify(DelRow),
      },
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
        if (Object.keys(error.response.data.errors)[0] == "email") {
          const value = Object.keys(error.response.data.errors)[0];
          setError(
            "email",
            {
              type: "string",
              message: trans("Email_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Email_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const [options, setOptions] = useState("");
  const [fieldOptions, setFieldOptions] = useState([]);

  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  const AddOptions = (val) => {
    if (AllOptions.some((item) => item.option_name === options)) {
      toast.error(trans("Options must be unique"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let newId = new Date().getMilliseconds();
      var options_values = {
        id: newId,
        select_field_id: val.id,
        option_name: options,
        new: true,
      };
    }

    if (options_values.option_name != "") {
      setFieldOptions([...fieldOptions, options_values]);
      setAllOptions([...AllOptions, options_values]);
      setOptions("");
    } else {
      toast.error(trans("Please Fill the field"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const getAllForms = async () => {
      const response = await axios.get(`${URL}/formss/${idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      if (response.data.success === true) {
        setForms(response.data.form_fields);
        setNames(response.data.form);
        response.data.form_fields.map((item, index) => {
          setFormData({
            ...FormData,
            field_label: field_label.push({
              id: item.id,
              value: item.field_label,
            }),
            field_name: field_name.push({
              id: item.id,
              value: item.field_name,
            }),
            field_type: field_type.push({
              id: item.id,
              value: item.field_type,
            }),
          });
        });
        response.data.option_ids.map((item, index) => {
          setFormData({
            ...FormData,
            option_ids: option_names.push({
              id: item.id,
              select_field_id: item.select_field_id,
              option_name: item.option_name,
              option_value: item.option_value,
            }),
          });
        });

        var get_all_options = [];

        response.data.option_ids.map((item) =>
          get_all_options.push({
            id: item.id,
            select_field_id: item.select_field_id,
            option_name: item.option_name,
            option_value: item.option_value,
            new: false,
          })
        );

        setAllOptions(get_all_options);

        setFormData({
          ...FormData,
          name: response.data.form.name,
          progress_status: response.data.form.related_to,
        });
      }
    };
    getAllForms();

    const getAllLeadStages = async () => {
      const response = await axios.get(`${URL}/lead_status`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      const leads = response.data.status;
      setAllLeadStages(leads);
    };
    getAllLeadStages();
  }, []);

  const AddMore = () => {
    if (newfname !== "" && newftype !== "" && newflabel !== "") {
      if (newftype === "7" && new_option_names_temp.length === 0) {
        toast.error(trans("Atleast one option is required"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        let f_new_name = newfname
          .replace(/[^a-zA-Z0-9_ -]/g, "")
          .replace(/\s+/g, "_")
          .toLowerCase();
        const last_character = f_new_name.charAt(f_new_name.length - 1);
        if (last_character == "_") {
          f_new_name = f_new_name.slice(0, -1);
        }
        if (
          new_form_field.find(
            (field) =>
              field.field_type == 5 &&
              field.field_name.toLowerCase() == newfname.toLowerCase() &&
              field.field_label.toLowerCase() == newflabel.toLowerCase()
          ) ||
          forms.find(
            (field) =>
              field.field_type == 5 &&
              field.field_name.toLowerCase() == newfname.toLowerCase() &&
              field.field_label.toLowerCase() == newflabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (
          new_form_field.find(
            (field) =>
              field.field_type == 6 &&
              field.field_name.toLowerCase() == newfname.toLowerCase() &&
              field.field_label.toLowerCase() == newflabel.toLowerCase()
          ) ||
          forms.find(
            (field) =>
              field.field_type == 6 &&
              field.field_name.toLowerCase() == newfname.toLowerCase() &&
              field.field_label.toLowerCase() == newflabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (
          (newftype != 5 &&
            newftype != 6 &&
            new_form_field.find(
              (field) =>
                field.field_name.toLowerCase() == newfname.toLowerCase() &&
                field.field_label.toLowerCase() == newflabel.toLowerCase()
            )) ||
          forms.find(
            (field) =>
              field.field_name.toLowerCase() == newfname.toLowerCase() &&
              field.field_label.toLowerCase() == newflabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          const random = Math.floor(100000 + Math.random() * 900000);
          setFormData({
            ...FormData,
            random,
            new_form_field: new_form_field.push({
              field_name: f_new_name,
              field_label: newflabel,
              field_type: newftype,
              option_name: new_option_names_temp,
            }),
            newfield_name: newfield_name.push(f_new_name),
            newfield_label: newfield_label.push(newflabel),
            newfield_type: newfield_type.push(newftype),
            new_option_names: new_option_names.push(new_option_names_temp),
            new_option_names_temp: [],
            newfname: "",
            newflabel: "",
            newftype: "",
          });
          setFormData({
            ...FormData,
            new_option_names_temp: [],
            newfname: "",
            newflabel: "",
            newftype: "",
          });
        }
      }
    } else {
      toast.error(trans("Please Fill the fields"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const Remove = (index) => {
    newfield_name.splice(index, 1);
    newfield_label.splice(index, 1);
    newfield_type.splice(index, 1);
    new_option_names.splice(index, 1);
    new_form_field.splice(index, 1);
    setFormData({
      ...FormData,
      newfname: "",
      newflabel: "",
      newftype: "",
    });
  };

  const Update = (val) => {
    var doc = document.getElementById(val.id);
    if (doc != null) {
      let name = field_name.find((item) => item.id == val.id);
      if (name) {
        let nameValue = document.getElementById(val.id + val.field_name).value;
        let tempItem = { id: name.id, value: nameValue };
        let index = field_name.findIndex((item) => item.id == name.id);
        let tempArray = field_name.filter((item) => item.id != val.id);

        if (tempArray.some((item) => item.value == nameValue)) {
          toast.error(
            trans("Field Name must be unique"),
            +" , " + trans("Except Radio Button"),
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        } else {
          setFormData({
            ...FormData,
            field_name: [...field_name, (field_name[index] = tempItem)],
          });

          let label = field_label.find((item) => item.id == val.id);
          if (label) {
            let labelValue = document.getElementById(
              val.id + val.field_label
            ).value;
            let tempItem = { id: label.id, value: labelValue };
            let index = field_label.findIndex((item) => item.id == label.id);
            setFormData({
              ...FormData,
              field_label: [...field_label, (field_label[index] = tempItem)],
            });
          }

          let type = field_type.find((item) => item.id == val.id);

          if (type) {
            let typeValue = document.getElementById(
              val.id + val.field_type
            ).value;
            let tempItem = {
              id: type.id,
              value:
                typeValue == "Text"
                  ? "1"
                  : typeValue == "Email"
                    ? "2"
                    : typeValue == "Number"
                      ? "3"
                      : typeValue == "Date"
                        ? "4"
                        : typeValue == "Checkbox"
                          ? "5"
                          : typeValue == "Radio"
                            ? "6"
                            : typeValue == "Select"
                              ? "7"
                              : typeValue == "File Upload"
                                ? "8"
                                : typeValue == "Text Area"
                                  ? "9"
                                  : typeValue == "Password" && "10",
            };

            setFormData({
              ...FormData,
              field_type: field_type.map((x) =>
                x.id === val.id ? tempItem : x
              ),
            });
          }
          toast.success(trans("successfully added"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  const removeOption = (option) => {
    let tempObject;
    let tempAll;
    let tempOptions;
    if (option.new == false) {
      tempObject = {
        id: option.id,
        select_field_id: option.select_field_id,
        option_value: option.option_value,
        option_name: option.option_name,
        new: option.new,
        deleted: true,
      };
      tempAll = AllOptions.filter((item) => item.id != option.id);
      tempAll = [...tempAll, tempObject];
      tempOptions = fieldOptions.filter((item) => item.id != option.id);
      setAllOptions(tempAll);
      setFieldOptions(tempOptions);
    }
    if (option.new == true) {
      tempOptions = fieldOptions.filter((item) => item.id != option.id);
      tempAll = AllOptions.filter((item) => item.id != option.id);
      setAllOptions(tempAll);
      setFieldOptions(tempOptions);
    }
  };

  const RenderFormFields =
    new_form_field &&
    new_form_field.map((field, i) => {
      return (
        <Row>
          <Col md="3">
            <Input
              className="form-control my-2"
              name="newfname"
              value={field.field_name}
              type="text"
              placeholder={trans("Field Name")}
              innerRef={register({
                required: true,
                maxLength: 30,
              })}
            />
            <span>
              {errors.newfname?.type == "required" &&
                trans("field is required")}
              {errors.newfname?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="3">
            <Input
              className="form-control my-2"
              type="text"
              name="newflabel"
              value={field.field_label}
              placeholder={trans("Label Name")}
              innerRef={register({ required: true, maxLength: 30 })}
            />
            <span>
              {errors.newflabel?.type == "required" &&
                trans("field is required")}
              {errors.newflabel?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="3">
            <Input
              className="form-control my-2"
              name="newflabel"
              type="select"
              innerRef={register({ required: true })}
            >
              <option selected="true" value={field.field_type} disabled>
                {field.field_type === "1"
                  ? "Text"
                  : field.field_type === "2"
                    ? "Email"
                    : field.field_type === "3"
                      ? "Number"
                      : field.field_type === "4"
                        ? "Date"
                        : field.field_type === "5"
                          ? "Checkbox"
                          : field.field_type === "6"
                            ? "Radio"
                            : field.field_type === "7"
                              ? "Select"
                              : field.field_type === "8"
                                ? "File Upload"
                                : field.field_type === "9"
                                  ? "Text Area"
                                  : field.field_type === "10" && "Password"}
              </option>
            </Input>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="3">
            <button
              className="btn btn-danger mt-2"
              type="button"
              onClick={() => Remove(i)}
            >
              Remove
            </button>
          </Col>
          {field.option_name.length !== 0 &&
            field.option_name.map((option) => (
              <Col md="3">
                <Input
                  className="form-control my-2"
                  name="new_optname"
                  value={option}
                  type="text"
                  placeholder={trans("Option Value")}
                  innerRef={register({
                    required: true,
                    maxLength: 30,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                />
                <span>
                  {errors.new_optname?.type == "required" &&
                    trans("field is required")}
                  {errors.new_optname?.type == "maxLength" &&
                    trans("Maximum Length: ") + "30"}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </Col>
            ))}
        </Row>
      );
    });

  const AddOptions_New = () => {
    if (new_optname != "") {
      const option_find = new_option_names_temp.find(
        (opt) => opt == new_optname
      );
      if (option_find) {
        toast.error(trans("Options must be unique"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (new_option_names.length > 0) {
          const option_find_check = new_option_names.find((opt_arr) =>
            opt_arr.find((opt) => opt == new_optname)
          );
          if (option_find_check) {
            toast.error(trans("Options must be unique"), {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            const option_find_from_update =
              AllOptions.length > 0 &&
              AllOptions.some((item) => item.option_name == new_optname);
            if (option_find_from_update) {
              toast.error(trans("Options must be unique"), {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              setFormData({
                ...FormData,
                new_option_names_temp: new_option_names_temp.push(new_optname),
                new_optname: "",
              });
              setFormData({
                ...FormData,
                new_optname: "",
              });
            }
          }
        } else {
          const option_find_from_update =
            AllOptions.length > 0 &&
            AllOptions.some((item) => item.option_name == new_optname);
          if (option_find_from_update) {
            toast.error(trans("Options must be unique"), {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setFormData({
              ...FormData,
              new_option_names_temp: new_option_names_temp.push(new_optname),
              new_optname: "",
            });
            setFormData({
              ...FormData,
              new_optname: "",
            });
          }
        }
      }
    } else {
      toast.error(trans("Please Fill the field"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const RemoveOptions_New = (index) => {
    new_option_names_temp.splice(index, 1);
    setFormData({
      ...FormData,
      new_optname: "",
    });
  };

  const goBack = () => {
    navigate(`/homeSettings/Role-Management/RoleManagement`);
  };

  const RemoveVal = (val) => {
    let tmpObject = forms.find((item) => item.id == val.id);
    setDelRow([...DelRow, tmpObject]);
    const tempforms = forms.filter((item) => item.id !== val.id);
    setForms(tempforms);
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Manage Forms")} title={trans("Edit Form")} /> */}
      <Breadcrumb
        breadcrumbtitle={
          trans("Edit") + " " + trans("Lead") + " " + trans("Form")
        }
        parent={trans("CRM")}
        title={trans("Leads") + " / " + trans("Forms")}
        subtitle={trans("Edit")}
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  {/* <h5>{trans("Edit Form")}</h5> */}
                  <h5></h5>
                  <Button
                    className=""
                    onClick={goBack}
                    style={{ float: "right" }}
                  >
                    {trans("Go Back")}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Row>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        Progress Status
                      </Label>
                      <Input
                        className="form-control"
                        name="progress_status"
                        onChange={onHandleChange}
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        {/* <option selected="true" defaultValue={names.related_to === "0" ? "Lead"
                          : names.related_to === "1" ? "Qualifiled Lead"
                            : names.related_to === "2" ? "Nigotiation in progress"
                              : names.related_to === "3" ? "Signup in progress"
                                : names.related_to === "4" ? "New Franchise"
                                  : names.related_to === "5" && "Active Franchise"} disabled>
                          {names.related_to === "0" ? "Lead"
                            : names.related_to === "1" ? "Qualifiled Lead"
                              : names.related_to === "2" ? "Nigotiation in progress"
                                : names.related_to === "3" ? "Signup in progress"
                                  : names.related_to === "4" ? "New Franchise"
                                    : names.related_to === "5" && "Active Franchise"}
                        </option> */}
                        {AllLeadStages != null &&
                          AllLeadStages.length > 0 &&
                          AllLeadStages.sort((a, b) =>
                            a.stage > b.stage ? 1 : -1
                          ).map((lead_form) => {
                            if (lead_form.stage == progress_status) {
                              return (
                                <option
                                  value={lead_form.stage}
                                  disabled
                                  selected
                                >
                                  {lead_form.name}
                                </option>
                              );
                            }
                          })}
                      </Input>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Form Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        defaultValue={name}
                        type="text"
                        onChange={onHandleChange}
                        placeholder={trans("Form Name")}
                        innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md="3 mt-1">
                      {/* <Label htmlFor="validationCustom02">{trans("Field Name")}</Label> */}
                      <Input
                        className="form-control"
                        name="newfname"
                        type="text"
                        value={newfname}
                        placeholder={trans("Field Name")}
                        onChange={onHandleChange}
                      // innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3 mt-1">
                      {/* <Label htmlFor="validationCustom02">
                        {trans("Label Name")}
                      </Label> */}
                      <Input
                        className="form-control"
                        name="newflabel"
                        value={newflabel}
                        type="text"
                        onChange={onHandleChange}
                        placeholder={trans("Label Name")}
                      // innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3 mt-1">
                      {/* <Label htmlFor="validationCustom02">{"Field Type"}</Label> */}
                      <Input
                        className="form-control"
                        name="newftype"
                        key={newftype}
                        defaultValue={newftype}
                        type="select"
                        onChange={onHandleChange}
                      // innerRef={register({ required: true })}
                      >
                        <option selected="true">{trans("Select Type")}</option>
                        <option value="1">Text</option>
                        <option value="2">Email</option>
                        <option value="3">Number</option>
                        <option value="4">Date</option>
                        <option value="5">Checkbox</option>
                        <option value="6">Radio</option>
                        <option value="7">Select</option>
                        <option value="8">File Upload</option>
                        <option value="9">Text Area</option>
                        <option value="10">Password</option>
                      </Input>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3 mt-1">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={AddMore}
                      >
                        {trans("Add More")}
                      </button>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {newftype === "7" && (
                      <>
                        <Col sm="12" className="p-0">
                          <Row className="m-0">
                            <Col md="3 mt-2">
                              <Label htmlFor="validationCustom02">
                                {trans("Option Value")}
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="new_optname"
                                value={new_optname}
                                placeholder={trans("Option Value")}
                                onChange={onHandleChange}
                                innerRef={register({ required: true })}
                              />
                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </Col>
                            <Col md="3 mt-3" className="offset-md-6">
                              <button
                                className="btn btn-primary mt-4"
                                type="button"
                                onClick={() => AddOptions_New()}
                              >
                                +
                              </button>
                              {/* <button className="btn btn-danger mt-4 mx-2" type="button" onClick={() => RemoveOptions(i)}>-</button> */}
                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        {new_option_names_temp !== [] &&
                          new_option_names_temp.map((option, i) => (
                            <Col sm="12" className="p-0">
                              <Row className="m-0">
                                <Col md="3 mt-2">
                                  <Label htmlFor="validationCustom02">
                                    {trans("Option Value")}
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="new_optname"
                                    value={option}
                                    placeholder={trans("Option Value")}
                                    onChange={onHandleChange}
                                    innerRef={register({ required: true })}
                                  />
                                  <div className="valid-feedback">
                                    {trans("Looks good!")}
                                  </div>
                                </Col>
                                <Col md="3 mt-3" className="offset-md-6">
                                  <button
                                    className="btn btn-danger mt-4"
                                    type="button"
                                    onClick={() => RemoveOptions_New(i)}
                                  >
                                    -
                                  </button>
                                  <div className="valid-feedback">
                                    {trans("Looks good!")}
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          ))}
                      </>
                    )}
                  </Row>

                  <Row>
                    {forms &&
                      forms.map((val, i) => {
                        return (
                          <div className="d-flex col-12 p-0" id={val.id}>
                            <div className="row m-0 w-100">
                              <div className="col-3 my-1">
                                <Input
                                  id={val.id + val.field_name}
                                  key={val.id + val.field_name}
                                  className="form-control"
                                  type="text"
                                  name="fname"
                                  defaultValue={val.field_name}
                                />
                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </div>
                              <div className="col-3 my-1">
                                <Input
                                  className="form-control"
                                  id={val.id + val.field_label}
                                  key={val.id + val.field_label}
                                  name="flabel"
                                  defaultValue={val.field_label}
                                  type="text"
                                />
                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </div>
                              <div className="col-3 my-1">
                                <Input
                                  className="form-control"
                                  name="ftype"
                                  type="select"
                                  id={val.id + val.field_type}
                                  key={val.id + val.field_type}
                                  onChange={(e) => handleType(e, val)}
                                >
                                  <option
                                    selected
                                    defaultValue={
                                      val.field_type === "1"
                                        ? "Text"
                                        : val.field_type === "2"
                                          ? "Email"
                                          : val.field_type === "3"
                                            ? "Number"
                                            : val.field_type === "4"
                                              ? "Date"
                                              : val.field_type === "5"
                                                ? "Checkbox"
                                                : val.field_type === "6"
                                                  ? "Radio"
                                                  : val.field_type === "7"
                                                    ? "Select"
                                                    : val.field_type === "8"
                                                      ? "File Upload"
                                                      : val.field_type === "9"
                                                        ? "Text Area"
                                                        : val.field_type === "10" && "Password"
                                    }
                                    disabled
                                  >
                                    {val.field_type === "1"
                                      ? "Text"
                                      : val.field_type === "2"
                                        ? "Email"
                                        : val.field_type === "3"
                                          ? "Number"
                                          : val.field_type === "4"
                                            ? "Date"
                                            : val.field_type === "5"
                                              ? "Checkbox"
                                              : val.field_type === "6"
                                                ? "Radio"
                                                : val.field_type === "7"
                                                  ? "Select"
                                                  : val.field_type === "8"
                                                    ? "File Upload"
                                                    : val.field_type === "9"
                                                      ? "Text Area"
                                                      : val.field_type === "10" && "Password"}
                                  </option>
                                  <option value="1">Text</option>
                                  <option value="2">Email</option>
                                  <option value="3">Number</option>
                                  <option value="4">Date</option>
                                  <option value="5">Checkbox</option>
                                  <option value="6">Radio</option>
                                  <option value="7">Select</option>
                                  <option value="8">File Upload</option>
                                  <option value="9">Text Area</option>
                                  <option value="10">Password</option>
                                </Input>

                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </div>

                              <Col sm="3 d-flex align-items-center">
                                <button
                                  type="button"
                                  className="btn btn-warning mr-2"
                                  onClick={() => Update(val)}
                                >
                                  {trans("Update")}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger "
                                  onClick={() => RemoveVal(val, i)}
                                >
                                  {trans("Remove")}
                                </button>
                              </Col>

                              {val.field_type == 7 && (
                                <>
                                  <Col
                                    sm="3"
                                    className="d-flex align-items.center"
                                  >
                                    <Input
                                      className="form-control"
                                      type="text"
                                      name="optname"
                                      value={options}
                                      onChange={handleChange}
                                      innerRef={register({ required: true })}
                                    ></Input>
                                  </Col>
                                  <Col md="3" className="offset-md-6">
                                    <div>
                                      <Button onClick={() => AddOptions(val)}>
                                        +
                                      </Button>
                                    </div>
                                  </Col>
                                </>
                              )}

                              {AllOptions.filter(
                                (item) => item.select_field_id == val.id
                              ).map((option) => {
                                if (
                                  Object.keys(option).includes("deleted") ==
                                  false
                                ) {
                                  return (
                                    <Col md="12">
                                      <Row>
                                        <Col md="3 mt-2">
                                          <Label htmlFor="validationCustom02">
                                            {trans("Option Value")}
                                          </Label>
                                          <Input
                                            className="form-control"
                                            type="text"
                                            name="optname"
                                            value={option.option_name}
                                            placeholder={trans("Option Value")}
                                            // onChange={onHandleChange}
                                            innerRef={register({
                                              required: true,
                                            })}
                                          />
                                          <div className="valid-feedback">
                                            {trans("Looks good!")}
                                          </div>
                                        </Col>
                                        <Col
                                          md="3 mt-3"
                                          className="offset-md-6"
                                        >
                                          <button
                                            className="btn btn-danger mt-4"
                                            type="button"
                                            onClick={() => removeOption(option)}
                                          >
                                            -
                                          </button>
                                          <div className="valid-feedback">
                                            {trans("Looks good!")}
                                          </div>
                                        </Col>
                                      </Row>
                                    </Col>
                                  );
                                }
                              })}

                              {fieldOptions
                                .filter((item) => item.id == val.id)
                                .map((option) => {
                                  return (
                                    <Col md="12">
                                      <Row>
                                        <Col md="3 mt-2">
                                          <Label htmlFor="validationCustom02">
                                            {trans("Option Value")}
                                          </Label>
                                          <Input
                                            className="form-control"
                                            type="text"
                                            name="optname"
                                            value={option.option_name}
                                            placeholder={trans("Option Value")}
                                            // onChange={onHandleChange}
                                            innerRef={register({
                                              required: true,
                                            })}
                                          />
                                          <div className="valid-feedback">
                                            {trans("Looks good!")}
                                          </div>
                                        </Col>
                                        <Col
                                          md="3 mt-3"
                                          className="offset-md-6"
                                        >
                                          <button
                                            className="btn btn-danger mt-4"
                                            type="button"
                                            onClick={() => removeOption(option)}
                                          >
                                            -
                                          </button>
                                          <div className="valid-feedback">
                                            {trans("Looks good!")}
                                          </div>
                                        </Col>
                                      </Row>
                                    </Col>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                  </Row>
                  <div className="all_form_fields mb-3">{RenderFormFields}</div>
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

export default EditSupplierAdmin;
