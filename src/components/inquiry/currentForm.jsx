import React, { Fragment, useEffect, useState, useRef } from "react";
import Breadcrumb from "../../layout/breadcrumb/index";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Image, Description, Address, Email, Url } from "../../constant/index";
import CKEditors from "react-ckeditor-component";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { translate } from "react-switch-lang";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";

const CreateLeadForm = (props) => {
  const { setFormStatus, lastForm } = props;
  const trans = props.t;

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const initialstate = {};
  const [FormData1, setFormData1] = useState(null);
  const [Files, setFiles] = useState(null);
  const [GetForm, setGetForm] = useState(null);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData1({
      ...FormData1,
      [name]: value,
      user_id: user_id,
    });
  };

  console.log("FORMDATA -----------", FormData1);

  const [formFields, setFormFields] = useState([]);
  const [Form, setForm] = useState(null);
  const [userStage, setUserStage] = useState(null);
  const [formId, setId] = useState(null);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [lastLeadHistory, setLastLeadHistory] = useState(null);
  const [UserFormData, setUserFormData] = useState(null);
  const [ImagesData, setImagesData] = useState([]);

  const [cusomtersList, setCustomersList] = useState([]);

  let user_id = atob(localStorage.getItem("user_id"));
  console.log("user id", user_id);

  const handleChangeStatus = (
    { file },
    status,
    allFiles,
    get_field_type,
    get_field_name
  ) => {
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
      setFiles(allFiles)
      setError(
        "image",
        {
          shouldFocus: false
        },
    )
    }
    if (ImagesData.some((item) => item.field_name == get_field_name) == false) {
      setImagesData([
        ...ImagesData,
        {
          field_type: get_field_type,
          field_name: get_field_name,
          image_file: file,
        },
      ]);
    } else {
      var getImageIndex = ImagesData.findIndex(
        (item) => item.field_name == get_field_name
      );
      ImagesData[getImageIndex].image_file = file;
    }
    setFormData1({
      ...FormData1,
      image: ImagesData,
    });
    console.log("IMAGES DATA ---- ", ImagesData);
  };

  const getData = async () => {
    axios
      .get(
        `https://ecco.royaldonuts.xyz/api/currentForm`,
        { params: { user_id: user_id } }
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token123"),
        // },
      )
      .then((response) => {
        console.log("resp curnt form", response);
        setGetForm(true);
        setUserFormData(response.data.user);
        setFormFields(response.data.form_fields);
        setFieldOptions(response.data.field_options);
        setForm(response.data.form);
        setId(response.data.form.id);
        setUserStage(response.data.state);
      })
      .catch((error) => {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setGetForm(false);
        setUserFormData(error.response.data.user);
      });
  };

  useEffect(() => {
    const getLastLeadHistory = async () => {
      await axios
        .get(`https://ecco.royaldonuts.xyz/api/leadhistory`, {
          params: { id: user_id },
        })
        .then((response) => {
          const data = response.data.data;
          const lastHistory = data[0];
          console.log("last form submitted", lastHistory);
          setLastLeadHistory(lastHistory);
        })
        .catch((error) => {
          console.log("ERROR - LEad -History ---- ", error.response.data);
        });
    };

    getLastLeadHistory();
    if (user_id != null) {
      getData();
    }
  }, []);

  const saveForm = async (data) => {
    console.log("data", data);
    if (lastLeadHistory && lastLeadHistory.status == "Pending") {
      SweetAlert.fire({
        icon: "warning",
        title: trans("Lead") + " " + trans("Form"),
        text: trans("Lead From Submit Notice"),
        confirmButtonText: trans("OK"),
      });
    } else {
      const formDataaa = new FormData();

      if (FormData1 != null) {
        if (
          Object.keys(FormData1).includes("image") &&
          FormData1.image.length > 0
        ) {
          console.log("true");
          FormData1.image.map((item) => {
            return (
              item.field_type == 8 &&
              formDataaa.append(item.field_name, item.image_file)
            );
          });
        }
      }
      const object_keys_FormData_1 = Object.keys(FormData1);

      console.log("FORM DATA 22222 ------------", FormData1);
      // object_keys_FormData_1.map(
      //   (item) =>
      //     item.toString() != "image" &&
      //     formDataaa.append(item.toString(), FormData1[item.toString()])
      // );
      console.log("OJECT KEYS DATA ------", Object.keys(data));
      console.log("OJECT VALUES DATA ------", Object.values(data));
      Object.keys(data).map((item, index) => {
        item.toString() != "image" &&
          formDataaa.append(item.toString(), Object.values(data)[index]);
      });

      var multiple_images_files = [];
      console.log("MULTIPLE IMAES", multiple_images_files);

      // if (data.image != undefined) {
      //   formData.append("image", data.image);
      // }

      formDataaa.append("user_id", user_id);
      formDataaa.append("latitude", data.latitude);
      formDataaa.append("longitude", data.longitude);
      formDataaa.append("name_fr", data.name_fr);
      formDataaa.append("isActive", data.isActive);
      formDataaa.append("phone", data.phone);
      formDataaa.append("address", data.address);
      formDataaa.append("email", data.email);
      formDataaa.append("zip_code", data.zip_code);
      formDataaa.append("customer_id", data.customer_id);
      formDataaa.append("url_field", data.url_field);

      console.log("FORM DATAAA ---- ", formDataaa);
      axios({
        method: "post",
        url: "https://ecco.royaldonuts.xyz/api/formSave",
        params: { form: formId },
        data: formDataaa,
      })
        .then((response) => {
          console.log("responsedsss", response);
          if (response.data.success === true) {
            toast.success(trans("successfull"), {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFormData1(null);
            setFormStatus(true);
            lastForm();

            Files.map((f) => f.remove());
          } else {
            toast.error(trans("failed"), {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log("error", error.response.data);
          toast.error(trans(error.response.data.message), {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  console.log("fieldOptions ------ ", fieldOptions);

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Manage Role")} title={trans("Create Lead")} /> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12 p-0">
            {GetForm != null && GetForm == true ? (
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <span>
                    <b>{trans("Form name")}: </b>
                    {Form !== null && Form.name}
                  </span>
                  <span>
                    <b>{trans("Stage")}: </b>{" "}
                    {userStage != null && userStage.name}
                  </span>
                </CardHeader>
                <CardBody>
                  {lastLeadHistory && lastLeadHistory.status == "Pending" && (
                    <div className="mb-4 text-danger">
                      <span>
                        <b>{trans("Notice")}: </b>
                      </span>
                      <span>{trans("Lead From Submit Notice")}</span>
                    </div>
                  )}
                  <form
                    name={Form !== null && Form.name}
                    className="needs-validation d-flex flex-column align-items-center justify-content-center"
                    noValidate=""
                    onSubmit={handleSubmit(saveForm)}
                  >
                    {" "}
                    {formFields !== [] &&
                      formFields
                        .sort((a, b) => a.field_type - b.field_type)
                        .sort((z, x) => z.field_name - x.field_name)
                        .map((field) => {
                          return (
                            <Col md="12 mb-3" key={field.id}>
                              {field.field_type == 5 ||
                              field.field_type == 6 ? (
                                <div style={{ marginLeft: 20 }}>
                                  <Input
                                    name={
                                      field.field_type == 6
                                        ? field.field_name !== null &&
                                          field.field_name
                                        : field.field_name !== null &&
                                          field.field_name
                                    }
                                    type={
                                      (field.field_type !== null &&
                                        field.field_type == 5 &&
                                        "checkbox") ||
                                      (field.field_type == 6 && "radio")
                                    }
                                    key={
                                      field.field_label !== null &&
                                      field.field_type == 5
                                        ? field.field_label +
                                          "/-=-=-=/" +
                                          field.id
                                        : field.field_label
                                    }
                                    value={
                                      field.field_label !== null &&
                                      field.field_type == 5
                                        ? field.field_label +
                                          "/-=-=-=/" +
                                          field.id
                                        : field.field_label
                                    }
                                    innerRef={register({ required: true })}
                                    onChange={onHandleChange}
                                  ></Input>{" "}
                                  <Label htmlFor="validationCustom02">
                                    {field.field_label !== null &&
                                      field.field_label}
                                  </Label>
                                  <br></br>
                                  {field.field_type == 6
                                    ? field.field_name !== null && (
                                        <span>
                                          {errors[field.field_name] &&
                                            trans("field is required")}
                                        </span>
                                      )
                                    : field.field_name !== null && (
                                        <span className="font-danger">
                                          {errors[field.field_name] &&
                                            trans("field is required")}
                                        </span>
                                      )}
                                  <div className="valid-feedback">
                                    {trans("Looks good!")}
                                  </div>
                                </div>
                              ) : (
                                field.field_type != 5 &&
                                field.field_type != 6 &&
                                field.field_type != 7 &&
                                field.field_type != 8 && (
                                  <div>
                                    <Label htmlFor="validationCustom02">
                                      {field.field_label !== null &&
                                        field.field_label}
                                    </Label>
                                    <Input
                                      className={"form-control"}
                                      name={
                                        field.field_name !== null &&
                                        field.field_name
                                      }
                                      type={
                                        (field.field_type !== null &&
                                          field.field_type == 1 &&
                                          "text") ||
                                        (field.field_type == 2 && "email") ||
                                        (field.field_type == 3 && "number") ||
                                        (field.field_type == 4 && "date") ||
                                        (field.field_type == 9 && "textarea") ||
                                        (field.field_type == 10 && "password")
                                      }
                                      innerRef={register({ required: true })}
                                      onChange={onHandleChange}
                                    ></Input>
                                    {field.field_name != null && (
                                      <span>
                                        {errors[field.field_name] &&
                                          trans("field is required")}
                                      </span>
                                    )}
                                    <div className="valid-feedback">
                                      {trans("Looks good!")}
                                    </div>
                                  </div>
                                )
                              )}
                              {field.field_type == 8 && (
                                <div>
                                  <Label htmlFor="validationCustom02">
                                    {field.field_label !== null &&
                                      field.field_label}
                                  </Label>
                                  <Controller
                                    control={control}
                                    name={"image"}
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
                                          dropzone: {
                                            height: 200,
                                          },
                                          dropzoneActive: {
                                            borderColor: "green",
                                          },
                                        }}
                                        accept="image/*"
                                        onChangeStatus={(
                                          file,
                                          status,
                                          allFiles
                                        ) =>
                                          handleChangeStatus(
                                            file,
                                            status,
                                            allFiles,
                                            field.field_type,
                                            field.field_name
                                          )
                                        }
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
                                </div>
                              )}
                              {field.field_type == 7 && (
                                <Col md="12 mb-3 mt-3 p-0">
                                  <Label htmlFor="validationCustom02">
                                    {field.field_label !== null &&
                                      field.field_label}
                                  </Label>
                                  <Input
                                    name={
                                      field.field_name !== null &&
                                      field.field_name
                                    }
                                    type={
                                      field.field_type !== null &&
                                      field.field_type == 7 &&
                                      "select"
                                    }
                                    innerRef={register({ required: true })}
                                    onChange={onHandleChange}
                                  >
                                    <option disabled selected value="">
                                      {trans("Select")}
                                    </option>
                                    {fieldOptions != [] &&
                                      fieldOptions.map((option, i) => {
                                        if (
                                          option.select_field_id == field.id
                                        ) {
                                          return (
                                            <option key={i}>
                                              {option.option_name}
                                            </option>
                                          );
                                        }
                                      })}
                                  </Input>
                                  {field.field_name != null && (
                                    <span>
                                      {errors[field.field_name] &&
                                        trans("field is required")}
                                    </span>
                                  )}
                                </Col>
                              )}

                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </Col>
                          );
                        })}
                    <Row className="d-flex justify-content-start w-100">
                      <button type="submit" className="btn btn-primary ">
                        {trans("Save")}
                      </button>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <div className="mb-4 text-danger">
                    <span>
                      <b>{trans("Notice")}: </b>
                    </span>
                    {UserFormData != null && (
                      <span>
                        {trans("No Form Found For") +
                          " " +
                          trans(
                            UserFormData.progress_status == null
                              ? trans("Lead")
                              : UserFormData.progress_status == 2
                              ? trans("Lead")
                              : UserFormData.progress_status == 3
                              ? trans("Qualified Lead")
                              : UserFormData.progress_status == 4
                              ? trans("Negotiation in progress")
                              : UserFormData.progress_status == 5
                              ? trans("Signup in process")
                              : UserFormData.progress_status == 6
                              ? trans("New Franchise")
                              : UserFormData.progress_status == 7
                              ? trans("Active Franchise")
                              : UserFormData.progress_status == 8 &&
                                trans("Super Franchise")
                          )}
                      </span>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateLeadForm);
