import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";
import { translate } from "react-switch-lang";

const CreateLeadForm = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const {
    register,
    // handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const initialstate = {
    form_fields: [],
    field_name: [],
    fname: "",
    field_type: [],
    ftype: "",
    field_label: [],
    flabel: "",
    name: "",
    progress_status: "",
    option_name: [],
    field_option_name: [],
    optname: "",
  };
  const [Form_Data, setForm_Data] = useState(initialstate);
  const {
    form_fields,
    field_name,
    field_type,
    field_label,
    name,
    fname,
    ftype,
    flabel,
    progress_status,
    field_option_name,
    option_name,
    optname,
  } = Form_Data;
  const [formId, setFormId] = useState();
  const [AllLeadStages, setAllLeadStages] = useState(null);
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setForm_Data({
      ...Form_Data,
      [name]: value,
    });
  };
  const [admin, setAdmin] = useState([]);

  console.log("Form_Data-CreateLeadForm", Form_Data);

  const onSubmit = () => {
    console.log("form_fields: ", form_fields);
    console.log("form_fields-JSON.stringify: ", JSON.stringify(form_fields));
    if (progress_status == "") {
      toast.error(trans("Please Fill the Status"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (name == "") {
      toast.error(trans("Please Fill the Name"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (form_fields.length == 0) {
      toast.error(trans("Alteast one field is required"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      handleSubmitData();
    }
  };
  const handleSubmitData = () => {
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      // url: `https://ecco.royaldonuts.xyz/api/formss?form_fields=${JSON.stringify(form_fields)}&name=${name}&progress_status=${progress_status}`,
      url: `https://ecco.royaldonuts.xyz/api/formss`,
      data: {
        form_fields: JSON.stringify(form_fields),
        name: name,
        progress_status: progress_status,
      },
    })
      .then((response) => {
        console.log("CreateLeadFrom", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          // navigate(`/lead/forms/list/RD`);
        } else {
          // toast.error(trans("failed"), {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
          toast.error(trans(response.data.message), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log("CreateLeadFrom-error", error);
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
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/admins/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setAdmin(response.data.roles);
    };
    getData();
    getAllLeadStages();
  }, []);

  const getAllLeadStages = async () => {
    const response = await axios.get(`${URL}/lead_status`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("lead-forms:", response);
    const leads = response.data.status;
    setAllLeadStages(leads);
  };

  const AddMore = () => {
    if (
      fname !== "" &&
      ftype !== "" &&
      flabel !== "" &&
      progress_status !== "" &&
      name !== ""
    ) {
      if (ftype === "7" && field_option_name.length === 0) {
        toast.error(trans("Atleast one option is required"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const random = Math.floor(100000 + Math.random() * 900000);

        /**
         * string.replace(/[^a-zA-Z ]/g, "") : Remove all special characters (and numbers)
         * string..replace(/\s+/g, '-') : replace spaces with '-'
         */
        let f_name = fname
          .replace(/[^a-zA-Z0-9_ ]/g, "")
          .replace(/\s+/g, "_")
          .toLowerCase();
        const last_character = f_name.charAt(f_name.length - 1);
        if (last_character == "_") {
          f_name = f_name.slice(0, -1);
        }

        if (
          form_fields.find(
            (field) =>
              field.field_type == 5 &&
              field.field_name.toLowerCase() == f_name.toLowerCase() &&
              field.field_label.toLowerCase() == flabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (
          form_fields.find(
            (field) =>
              field.field_type == 6 &&
              field.field_name.toLowerCase() == f_name.toLowerCase() &&
              field.field_label.toLowerCase() == flabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (
          ftype != 5 &&
          ftype != 6 &&
          form_fields.find(
            (field) =>
              field.field_name.toLowerCase() == f_name.toLowerCase() ||
              field.field_label.toLowerCase() == flabel.toLowerCase()
          )
        ) {
          toast.error(trans("Field Name and Label must be unique"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setForm_Data({
            ...Form_Data,
            form_fields: form_fields.push({
              field_name: f_name,
              field_label: flabel,
              field_type: ftype,
              option_name: field_option_name,
            }),
            field_name: field_name.push(f_name),
            field_label: field_label.push(flabel),
            field_type: field_type.push(ftype),
            option_name: option_name.push(field_option_name),
            fname: "",
            flabel: "",
            ftype: "",
            optname: "",
            field_option_name: [],
          });
          setFormId(random);
          setForm_Data({
            ...Form_Data,
            fname: "",
            flabel: "",
            ftype: "",
            optname: "",
            field_option_name: [],
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
    // const element = document.getElementById(id);
    // element.remove();
    console.log("index", index);
    form_fields.splice(index, 1);
    field_name.splice(index, 1);
    field_label.splice(index, 1);
    field_type.splice(index, 1);
    option_name.splice(index, 1);
    field_option_name.splice(index, 1);
    setForm_Data({
      ...Form_Data,
      fname: "",
      flabel: "",
      ftype: "",
      optname: "",
    });
  };

  const AddOptions = () => {
    if (optname != "") {
      const option_find = field_option_name.find((opt) => opt == optname);
      console.log("option_find", option_find);
      if (option_find) {
        toast.error(trans("Options must be unique"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (option_name.length > 0) {
          const option_find_check = option_name.find((opt_arr) =>
            opt_arr.find((opt) => opt == optname)
          );
          console.log("option_find_check", option_find_check);
          if (option_find_check) {
            toast.error(trans("Options must be unique"), {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setForm_Data({
              ...Form_Data,
              field_option_name: field_option_name.push(optname),
              optname: "",
            });
            setForm_Data({
              ...Form_Data,
              optname: "",
            });
          }
        } else {
          setForm_Data({
            ...Form_Data,
            field_option_name: field_option_name.push(optname),
            optname: "",
          });
          setForm_Data({
            ...Form_Data,
            optname: "",
          });
        }
      }
    } else {
      toast.error(trans("Please Fill the field"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const RemoveOptions = (index) => {
    field_option_name.splice(index, 1);
    setForm_Data({
      ...Form_Data,
      optname: "",
    });
  };

  const RenderName =
    field_name &&
    field_name?.map((name) => {
      return (
        <>
          <Input
            className="form-control my-2"
            type="text"
            name="fname"
            value={name}
            // placeholder={trans("Field Name")}
            innerRef={register({ required: true, maxLength: 30 })}
          />
          <span>
            {errors.fname?.type == "maxLength" &&
              trans("Maximum Length: ") + "30"}
          </span>
          <div className="valid-feedback">{trans("Looks good!")}</div>
        </>
      );
    });

  const RenderLabel =
    field_label &&
    field_label?.map((label) => {
      return (
        <>
          <Input
            className="form-control my-2"
            name="flabel"
            value={label}
            type="text"
            placeholder={trans("Label Name")}
            innerRef={register({ required: true })}
          />
        </>
      );
    });

  const RenderOptions = option_name.map((option, i) => {
    return (
      <>
        {option !== [] && (
          <>
            {
              <Input
                className="form-control my-2"
                name="optname"
                value={option}
                type="text"
                placeholder={trans("Option Value")}
                innerRef={register({ required: true })}
              />
            }
          </>
        )}
      </>
    );
  });

  const RenderType =
    field_type &&
    field_type?.map((type) => {
      return (
        <>
          <Input
            className="form-control my-2"
            name="ftype"
            type="select"
            innerRef={register({ required: true })}
          >
            <option selected="true" value={type} disabled>
              {type === "1"
                ? "Text"
                : type === "2"
                ? "Email"
                : type === "3"
                ? "Number"
                : type === "4"
                ? "Date"
                : type === "5"
                ? "Checkbox"
                : type === "6"
                ? "Radio"
                : type === "7"
                ? "Select"
                : type === "8"
                ? "File Upload"
                : type === "9"
                ? "Text Area"
                : type === "10" && "Password"}
            </option>
          </Input>
          <div className="valid-feedback">{trans("Looks good!")}</div>
        </>
      );
    });

  const RenderButton = field_name.map((type, i) => {
    return (
      <div>
        <button
          className="btn btn-danger mt-2"
          type="button"
          onClick={() => Remove(i)}
        >
          Remove
        </button>
      </div>
    );
  });

  const RenderFormFields =
    form_fields &&
    form_fields.map((field, i) => {
      return (
        <div className="form-row">
          {console.log("RenderFormFields", field)}
          <Col md="3">
            <Input
              className="form-control my-2"
              name="fname"
              value={field.field_name}
              type="text"
              placeholder={trans("Field Name")}
              innerRef={register({
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z0-9.\s]+$/,
              })}
            />
            <span>
              {errors.fname?.type == "required" && trans("field is required")}
              {errors.fname?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
              {errors.fname?.type == "pattern" &&
                "Please write alphanumeric values"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="3">
            <Input
              className="form-control my-2"
              type="text"
              name="flabel"
              value={field.field_label}
              placeholder={trans("Label Name")}
              innerRef={register({
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z0-9.\s]+$/,
              })}
            />
            <span>
              {errors.flabel?.type == "required" && trans("field is required")}
              {errors.flabel?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
              {errors.flabel?.type == "pattern" &&
                "Please write alphanumeric values"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="3">
            <Input
              className="form-control my-2"
              name="ftype"
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
                  name="optname"
                  value={option}
                  type="text"
                  placeholder={trans("Option Value")}
                  innerRef={register({ required: true, maxLength: 30 })}
                />
                <span>
                  {errors.optname?.type == "required" &&
                    trans("field is required")}
                  {errors.optname?.type == "maxLength" &&
                    trans("Maximum Length: ") + "30"}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </Col>
            ))}
        </div>
      );
    });

  const goBack = () => {
    navigate(`/homeSettings/Lead-Management/LeadManagement/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Manage Form")} title={trans("Create Form")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Create Form</h5>
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
                <form
                  className="needs-validation"
                  noValidate=""
                  // onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Status")}
                      </Label>
                      <Input
                        className="form-control"
                        name="progress_status"
                        onChange={onHandleChange}
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected="true" value="" disabled>
                          {trans("Select Status")}
                        </option>
                        {/* <option value="0">Lead</option>
                        <option value="1">Qualifiled Lead</option>
                        <option value="2">Nigotiation in progress</option>
                        <option value="3">Signup in progress</option>
                        <option value="4">New Franchise</option>
                        <option value="5">Active Franchise</option> */}
                        {AllLeadStages != null &&
                          AllLeadStages.length > 0 &&
                          AllLeadStages.sort((a, b) =>
                            a.stage > b.stage ? 1 : -1
                          ).map((lead_form) => {
                            if (lead_form.stage > 1) {
                              return (
                                <option value={lead_form.stage}>
                                  {lead_form.name}
                                </option>
                              );
                            }
                          })}
                        {/* </select> */}
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
                        type="text"
                        onChange={onHandleChange}
                        // placeholder={trans("Form Name")}
                        innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>

                  {/* // } */}
                  <div className="form-row">
                    <Col md="3 ">
                      <Label htmlFor="validationCustom02">
                        {trans("Field Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="fname"
                        type="text"
                        value={fname}
                        // placeholder={trans("Field Name")}
                        onChange={onHandleChange}
                        innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3 ">
                      <Label htmlFor="validationCustom02">
                        {trans("Label Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="flabel"
                        type="text"
                        value={flabel}
                        onChange={onHandleChange}
                        // placeholder={trans("Label Name")}
                        innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3 ">
                      <Label htmlFor="validationCustom02">{"Field Type"}</Label>
                      <Input
                        className="form-control"
                        name="ftype"
                        type="select"
                        defaultValue={ftype}
                        key={ftype}
                        onChange={onHandleChange}
                        innerRef={register({ required: true })}
                      >
                        <option selected>{trans("Select Type")}</option>
                        {/* <option value="1">Text</option>
                        <option value="2">Text Area</option>
                        <option value="3">File Upload</option>
                        <option value="4">Checkbox</option>
                        <option value="5">Radio</option>
                        <option value="6">Password</option>
                        <option value="7">Email</option>
                        <option value="8">Select</option>
                        <option value="9">Number</option>
                        <option value="10">Date</option> */}
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
                    <Col md="3 mt-2">
                      <button
                        className="btn btn-primary mt-4"
                        type="button"
                        onClick={AddMore}
                      >
                        {trans("Add More")}
                      </button>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* -------- */}
                    {ftype == "7" && (
                      <>
                        <Col md="3 mt-2">
                          <Label htmlFor="validationCustom02">
                            {trans("Option Value")}
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="optname"
                            value={optname}
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
                            onClick={AddOptions}
                          >
                            +
                          </button>
                          {/* <button className="btn btn-danger mt-4 mx-2" type="button" onClick={() => RemoveOptions(i)}>-</button> */}
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        {field_option_name !== [] &&
                          field_option_name.map((option, i) => (
                            <>
                              <Col md="3 mt-2">
                                <Label htmlFor="validationCustom02">
                                  {trans("Option Value")}
                                </Label>
                                <Input
                                  className="form-control"
                                  type="text"
                                  name="optname"
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
                                  onClick={() => RemoveOptions(i)}
                                >
                                  -
                                </button>
                                <div className="valid-feedback">
                                  {trans("Looks good!")}
                                </div>
                              </Col>
                            </>
                          ))}
                      </>
                    )}
                  </div>

                  <div className="form-row" id={formId}>
                    {/* <Col md="3">
                      {RenderName}
                    </Col>
                    <Col md="3">
                      {RenderLabel}
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="3">
                      {RenderType}
                    </Col>
                    <Col md="3 mt-2">
                      {RenderButton}
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6">
                      {RenderOptions}
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                  </div>
                  <div className="all_form_fields" id={formId}>
                    {RenderFormFields}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={onSubmit}
                  >
                    {trans("Save")}
                  </button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateLeadForm);
