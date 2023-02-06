import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import Dropzone from "react-dropzone-uploader";
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
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  packageSec,
  label,
  Image,
  Title,
  Price,
  badge,
  pricingSection,
} from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";

import { translate } from "react-switch-lang";

import SweetAlert from "sweetalert2";

const PackagesSection = (props) => {
  const trans = props.t;

  const [prices, setPrices] = useState([]);
  const [EditPrices, setEditPrices] = useState(false);
  const [foundItem, setFoundItem] = useState(null);

  const {
    register,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });;

  const {
    register: register2,
    setValue: setValue2,
    setError: setError2,
    control: control2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({ shouldFocusError: true });;

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if(status =='error_file_size')
    allFiles.forEach(f => f.remove())
    {
      setError(
        "file",
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
      setValue("file", file);
      setError(
        "file",
        {
          shouldFocus: false
        },
    )
    }
    
  };
  const handleChangeStatus2 = ({ meta, file }, status, allFiles) => {
    // console.log("dropzone-onchange-status:", file)
    // console.log("dropzone-onchange-meta:", meta)
    // console.log("dropzone-onchange-allFiles:", allFiles)
    if(status =='error_file_size')
    allFiles.forEach(f => f.remove())
    {
      setError2(
        "file",
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
      setValue2("file", file);
      setError2(
        "file",
        {
          shouldFocus: false
        },
    )
    }
    
  };

  const onSubmit = (data, e) => {
    console.log("this is submitted data", data);
    const formData = new FormData();

    console.log("else");
    formData.append("id", "no_id");
    if (data.file != undefined) {
      formData.append("file", data.file);
    }
    formData.append("heading", data.heading);
    formData.append("tag", data.tag);
    formData.append("text", data.text);
    formData.append("b_text", data.b_text);
    axios({
      method: "post",
      url: `${URL}/price-section-store`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        if (
          response.data.message == "You cannot create package more than 4 !"
        ) {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });

          getData();
        }
        e.target.reset();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const onSubmitEdit = (data, id) => {
    console.log("this is submitted data", data);
    const formData = new FormData();
    formData.append("id", id);
    if (data.file != undefined) {
      formData.append("file", data.file);
    }
    formData.append("heading", data.heading);
    formData.append("tag", data.tag);
    formData.append("text", data.text);
    formData.append("b_text", data.b_text);
    axios({
      method: "post",
      url: `${URL}/price-section-update/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEditPrices(!EditPrices);
        getData();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };
  const getData = async () => {
    const response = await axios.get(`${URL}/price-section`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("resp", response);
    setPrices(response.data.prices);
  };
  useEffect(() => {
    getData();
  }, []);

  const editPricesToggle = async (id) => {
    const found = prices.find((item) => item.id === id);
    console.log("resp edit", found);
    setFoundItem(found);
    setEditPrices(!EditPrices);
  };

  const DeletePackageItem = (name, id) => {
    if (name === "alertDanger") {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Once deleted, you will not be able to recover it!"),
        icon: "error",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          console.log("result value", id);
          DeleteItem(id);
          SweetAlert.fire({
            icon: "success",
            title: (trans("Deleted")),
            text: (trans("Your item has been deleted.")),
            confirmButtonText: trans("OK")
          });
        }
      });
    }
  };
  const DeleteItem = async (id) => {
    const res = await axios
      .get(`${URL}/price-section-delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        if (response.data.success == true) {
          console.log("RETURNNN");
          SweetAlert.fire({
            icon: "success",
            title: (trans("Deleted")),
            text: (trans("Your item has been deleted.")),
            confirmButtonText: trans("OK")
          });
          const deleted_product = prices.filter((item) => item.id != id);
          setPrices(deleted_product);
        } else {
          SweetAlert.fire("Error!", "Deletion Error Occurred", "error");
        }
      });
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Site Settings")} title={trans("Package")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{trans("Packages Section")}</h5>
              </CardHeader>
              <Col sm="12">
                <Card>
                  <div className="table-responsive">
                    <Table borderles>
                      <thead>
                        <tr>
                          <th scope="col">{"#"}</th>
                          <th scope="col">{trans("IMAGE")}</th>
                          <th scope="col">{trans("TITLE")}</th>
                          <th scope="col">{trans("PRICE")}</th>
                          <th scope="col">{trans("BADGE")}</th>
                          <th scope="col">{trans("ACTION")}</th>
                        </tr>
                      </thead>
                      {prices !== [] &&
                        prices.map((price, ind) => {
                          return (
                            <tbody>
                              <tr>
                                <th className="bd-t-none" scope="row">
                                  {ind + 1}
                                </th>
                                <td>{price.file}</td>
                                <td>{price.heading}</td>
                                <td>{price.price}</td>
                                <td>{price.brand}</td>
                                <td>
                                  <Button
                                    color="primary"
                                    outline
                                    className="mr-2"
                                    onClick={() => editPricesToggle(price.id)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Button>
                                  <Button
                                    color="danger"
                                    className="sweet-7"
                                    name="alertDanger"
                                    outline
                                    onClick={(e) =>
                                      DeletePackageItem(e.target.name, price.id)
                                    }
                                  >
                                   <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
                                  </Button>
                                </td>
                              </tr>
                              <Modal
                                isOpen={EditPrices}
                                toggle={editPricesToggle}
                                centered
                              >
                                <ModalHeader
                                  toggle={() => setEditPrices(!EditPrices)}
                                >
                                  {trans("Edit Package")}
                                </ModalHeader>
                                <ModalBody>
                                  <Row>
                                    <Col sm="12">
                                      <Card>
                                        <CardBody>
                                          <Form
                                            className="needs-validation"
                                            noValidate=""
                                            onSubmit={handleSubmit2((data) =>
                                              onSubmitEdit(data, foundItem.id)
                                            )}
                                          >
                                            <div className="form-row">
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Image")}
                                                </Label>
                                                <Controller
                                                  control={control2}
                                                  name="file"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.file
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.file
                                                  }
                                                  rules={{ required: true }}
                                                  render={() => (
                                                    <Dropzone
                                                      maxFiles={1}
                                                      multiple={false}
                                                      canCancel={false}
                                                      minSizeBytes={0}
                                                      maxSizeBytes={2000000}
                                                      inputContent={trans(
                                                        "Drop A File"
                                                      )}
                                                      accept="image/*"
                                                      key={
                                                        foundItem != null &&
                                                        foundItem.file
                                                      }
                                                      defaultValue={
                                                        foundItem != null &&
                                                        foundItem.file
                                                      }
                                                      styles={{
                                                        dropzone: {
                                                          height: 200,
                                                        },
                                                        dropzoneActive: {
                                                          borderColor: "green",
                                                        },
                                                      }}
                                                      onChangeStatus={
                                                        handleChangeStatus2
                                                      }
                                                    />
                                                  )}
                                                />
                                                <span className="text-danger">
                        {errors2.file?.type == 'required' ? trans("field is required"):
                        errors2.file && errors2.file.message
                        }
                      </span>
                                                <div className="valid-feedback">
                                                  {trans("Looks good!")}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Title")}
                                                </Label>
                                                <Input
                                                  className="form-control"
                                                  name="heading"
                                                  type="text"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.heading
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.heading
                                                  }
                                                  innerRef={register2({
                                                    required: true,
                                                    maxLength: 30,
                                                    pattern: /^[a-zA-Z0-9.\s]+$/
                                                  })}
                                                />
                                                <span>
                                                  {errors.heading2?.type == "required" &&
                                                    "title is required"}
                                                  {errors.heading2?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                                                  {errors.heading2?.type == "pattern" && "Please write alphanumeric values"}
                                                </span>
                                                <div className="valid-feedback">
                                                  {"Looks good!"}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Tag")}
                                                </Label>
                                                <Input
                                                  className="form-control"
                                                  name="tag"
                                                  type="select"
                                                  innerRef={register2({
                                                    required: true,
                                                  })}
                                                >
                                                  <option
                                                    value=""
                                                    selected="true"
                                                    disabled
                                                  >
                                                    {trans("Select Tag")}
                                                  </option>
                                                  <option
                                                    value={1}
                                                    selected={
                                                      foundItem != null &&
                                                      foundItem.tag == 1 &&
                                                      true
                                                    }
                                                  >
                                                    Top
                                                  </option>
                                                  <option
                                                    value={2}
                                                    selected={
                                                      foundItem != null &&
                                                      foundItem.tag == 2 &&
                                                      true
                                                    }
                                                  >
                                                    Best
                                                  </option>
                                                </Input>
                                                <span>
                                                  {errors2.tag &&
                                                    trans("field is required")}
                                                </span>
                                                <div className="valid-feedback">
                                                  {"Looks good!"}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Price")}
                                                </Label>
                                                <Input
                                                  className="form-control"
                                                  name="text"
                                                  type="text"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.price
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.price
                                                  }
                                                  innerRef={register2({
                                                    required: true,
                                                    maxLength: 12,
                                                  })}
                                                />
                                                <span>
                                                  {errors.text &&
                                                    trans("field is required")}
                                                  {errors.text?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                                                </span>
                                                <div className="valid-feedback">
                                                  {trans("Looks good!")}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("badge")}
                                                </Label>
                                                <Input
                                                  className="form-control"
                                                  name="b_text"
                                                  type="text"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.brand
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.brand
                                                  }
                                                  innerRef={register2({
                                                    required: true,
                                                    maxLength: 30,
                                                  })}
                                                />
                                                <span>
                                                  {errors2.b_text &&
                                                    trans("badge is required")}
                                                  {errors.b_text?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                                                </span>
                                                <div className="valid-feedback">
                                                  {"Looks good!"}
                                                </div>
                                              </Col>
                                            </div>
                                            <Button color="primary">
                                              {"update"}
                                            </Button>
                                          </Form>
                                        </CardBody>
                                      </Card>
                                    </Col>
                                  </Row>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    onClick={() => setEditPrices(!EditPrices)}
                                  >
                                    {trans("cancel")}
                                  </Button>
                                </ModalFooter>
                              </Modal>
                            </tbody>
                          );
                        })}
                    </Table>
                  </div>
                </Card>
              </Col>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{trans("Create Package")}</h5>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Image")}
                      </Label>{" "}
                      <Controller
                        control={control}
                        name="file"
                        rules={{ required: true }}
                        render={() => (
                          <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            minSizeBytes={0}
                            maxSizeBytes={2000000}
                            inputContent="Drop A File"
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
                        {errors.file?.type == 'required' ? trans("field is required"):
                        errors.file && errors.file.message
                        }
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Title)}</Label>
                      <Input
                        className="form-control"
                        name="heading"
                        type="text"
                        innerRef={register({ required: true, maxLength: 30, })}
                      />
                      <span>
                        {errors.heading && trans("title is required")}
                        {errors.heading?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Tag")}</Label>
                      <Input
                        className="form-control"
                        name="tag"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option value="" selected="true" disabled>
                          {trans("Select Tag")}
                        </option>
                        <option value={1}>Top</option>
                        <option value={2}>Best</option>
                      </Input>
                      <span>{errors.tag && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Price)}</Label>
                      <Input
                        className="form-control"
                        name="text"
                        type="text"
                        innerRef={register({ required: true, maxLength: 12, })}
                      />
                      <span>
                        {errors.text && trans("price is required")}
                        {errors.text?.type == "maxLength" && trans("Maximum Length: ") + "12"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(badge)}</Label>
                      <Input
                        className="form-control"
                        name="b_text"
                        type="text"
                        innerRef={register({ required: true, maxLength: 30, })}
                      />
                      <span>
                        {errors.b_text && trans(trans("badge is required"))}
                        {errors.b_text?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
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

export default translate(PackagesSection);
