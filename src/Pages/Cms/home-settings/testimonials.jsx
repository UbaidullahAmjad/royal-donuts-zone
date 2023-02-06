/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import Dropzone from "react-dropzone-uploader";
import logo from "../../../assets/images/logo/logoo.png";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "ckeditor4-react";
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
  Name,
  ResetPassword,
} from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import SweetAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  TestimonialsListAction,
  DeleteTestimonialAction,
  TestimonialCreateAction,
  TestimonialEditAction,
} from "../../../redux/Pages/Cms/HomeSettings/Testimonials/actions";

const Testimonials = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const {
    register: register2,
    setValue: setValue2,
    setError: setError2,
    control: control2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({ shouldFocusError: true });

  // const [testimonials, setTestimonials] = useState([]);
  const testimonials = useSelector((state) => state.getTestimonials);
  const [editTestimonials, setEditTestimonials] = useState(false);
  const [foundItem, setFoundItem] = useState(null);
  const [content, setContent] = useState("");
  const [EditContent, setEditContent] = useState("");
  const [Files, setFiles] = useState(null);
  const [ImageLoadedError, setImageLoadedError] = useState(false);

  useEffect(() => {
    if (testimonials?.testimonialsList.length == 0) {
      dispatch(TestimonialsListAction())
    }
  }, [])

  useEffect(() => {
    if (testimonials && testimonials.testimonialsList.length != testimonials.tempArrLength) {
      dispatch(TestimonialsListAction())

      if (testimonials && testimonials.testimonialsList.length != testimonials.createdLength) {
        reset("name", "");
        reset("heading", "");
        setContent("");

        reset("file", "");
        reset("text", "");
        // Files.map((f) => f.remove());
      }

      if (testimonials && testimonials.testimonialsList.length != testimonials.editedLength) {
        setEditTestimonials(!editTestimonials);
      }
    }
  }, [testimonials]);


  const editorEvent = (evt) => {
    const newContentEdit = evt.editor.getData();
    if (newContentEdit != "" || newContentEdit != null) {
      setEditContent(newContentEdit);
      setValue2("text2", newContentEdit);
    } else {
      setValue2("text2", "");
    }
  };

  const onChangeEvent = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setContent(newContent);
      setValue("text", newContent);
    } else {
      setValue("text", "");
    }
  };

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
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
    if (status == "done") {
      setValue("file", file);
      setError("file", {
        shouldFocus: false,
      });
    }
  };

  const handleSubmitImage = ({ file }) => {
    file.remove();
  };

  const handleChangeStatus2 = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
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
    if (status == "done") {
      setValue2("file", file);
      setError2("file", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    let dataValues = data;
    const formData = new FormData();
    formData.append("id", "no_id");
    formData.append("file", data.file);
    formData.append("heading", data.heading);
    formData.append("text", data.text);
    formData.append("name", data.name);

    dispatch(TestimonialCreateAction(formData, trans))
  };

  const onSubmitEdit = (data, id) => {
    const formData = new FormData();
    formData.append("id", id);
    if (data.file != undefined) {
      formData.append("file", data.file);
    }

    formData.append("heading", data.heading);
    formData.append("text", data.text2);
    formData.append("name", data.name);

    dispatch(TestimonialEditAction(formData, foundItem.id, trans))
  };

  const editPricesToggle = (id) => {
    const found = testimonials.testimonialsList.find((item) => item.id === id);
    if (found != undefined || found != null) {
      setFoundItem(found);
      setEditContent(found.text);
    }
    setEditTestimonials(!editTestimonials);
  };

  const DeletePackageItem = (name, id) => {
    if (name === "alertDanger") {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Once deleted, you will not be able to recover it!"),
        icon: trans("error"),
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          dispatch(DeleteTestimonialAction(id, trans))
          SweetAlert.fire({
            icon: "success",
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      {/* <Breadcrumb
        parent={trans("Site Settings")}
        title={trans("Testimonial")}
      /> */}
      <CardHeader className="p-0 pb-4 mb-4">
        <h5>{trans("Testimonials")}</h5>
      </CardHeader>
      <Container fluid={true}>
        <Row>
          {/* <Col sm="12">
            <Card> */}
          {/* <CardHeader>
                <h5>{trans("Testimonial")}</h5>
              </CardHeader> */}
          {/* <Col sm="12">
                <Card> */}
          <div className="table-responsive">
            <Table borderles style={{ overflowX: "scroll" }}>
              <thead>
                <tr>
                  <th scope="col" style={{ minWidth: 30 }}>
                    {"#"}
                  </th>
                  <th scope="col" style={{ minWidth: 90 }}>
                    {trans("IMAGE")}
                  </th>
                  <th scope="col" style={{ minWidth: 140 }}>
                    {trans("TITLE")}
                  </th>
                  <th scope="col" style={{ minWidth: 240 }}>
                    {trans("TEXT")}
                  </th>
                  <th scope="col" style={{ minWidth: 100 }}>
                    {trans("NAME")}
                  </th>
                  <th scope="col" style={{ minWidth: 180 }}>
                    {trans("ACTION")}
                  </th>
                </tr>
              </thead>
              {testimonials?.testimonialsList !== [] &&
                testimonials.testimonialsList.map((testmonial, ind) => {
                  return (
                    <tbody>
                      <tr>
                        <th className="bd-t-none" scope="row">
                          {ind + 1}
                        </th>
                        <td>
                          <img
                            src={`${SIMPLE_URL}/storage/${testmonial.file}`}
                            alt={testmonial.file}
                            style={{ width: "70px" }}
                            onError={(e) => {
                              e.currentTarget.src = logo;
                            }}
                          ></img>
                        </td>
                        <td>{testmonial.heading}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: testmonial.text,
                          }}
                        ></td>
                        <td>{testmonial.name}</td>
                        <td>
                          {" "}
                          {(role == "SuperAdmin" ||
                            permissions.match("edit") != null) && (
                              <Button
                                color="warning"
                                className="mr-2 "
                                onClick={() => editPricesToggle(testmonial.id)}
                              >
                                <i className="fa fa-edit"></i>
                              </Button>
                            )}
                          {(role == "SuperAdmin" ||
                            permissions.match("delete") != null) && (
                              <Button
                                color="danger"
                                className="sweet-7"
                                name="alertDanger"
                                onClick={(e) =>
                                  DeletePackageItem(e.target.name, testmonial.id)
                                }
                              >
                                <i
                                  className="fa fa-trash-o"
                                  title="alertDanger"
                                  onClick={(e) =>
                                    DeletePackageItem(
                                      e.target.title,
                                      testmonial.id
                                    )
                                  }
                                ></i>
                              </Button>
                            )}
                        </td>
                      </tr>

                      <Modal
                        isOpen={editTestimonials}
                        toggle={editPricesToggle}
                        centered
                        scrollable
                      >
                        <ModalHeader
                          toggle={() => setEditTestimonials(!editTestimonials)}
                        >
                          Edit Testimonials
                        </ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col sm="12">
                              <Card>
                                <CardHeader>
                                  <h5>Testimonials</h5>
                                </CardHeader>
                                <CardBody>
                                  <Form
                                    id="form1"
                                    className="needs-validation"
                                    noValidate=""
                                    onSubmit={handleSubmit2((data) =>
                                      onSubmitEdit(data, foundItem.id)
                                    )}
                                  >
                                    <div className="form-row">
                                      <Col md="12 mb-3">
                                        <Label htmlFor="validationCustom02">
                                          {Image}
                                        </Label>
                                        <Controller
                                          control={control2}
                                          name="file"
                                          rules={{ required: false }}
                                          key={
                                            foundItem != null && foundItem.file
                                          }
                                          defaultValue={
                                            foundItem != null && foundItem.file
                                          }
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
                                              styles={{
                                                dropzone: {
                                                  height: 200,
                                                },
                                                dropzoneActive: {
                                                  borderColor: "green",
                                                },
                                              }}
                                              accept="image/*"
                                              onChangeStatus={
                                                handleChangeStatus2
                                              }
                                            />
                                          )}
                                        />
                                        <span className="text-danger">
                                          {errors2.file?.type == "required"
                                            ? trans("field is required")
                                            : errors2.file &&
                                            errors2.file.message}
                                        </span>
                                        {testimonials &&
                                          testimonials.image !== null &&
                                          testimonials.image !== undefined &&
                                          testimonials.image !==
                                          "undefined" && (
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                paddingTop: 10,
                                              }}
                                            >
                                              <img
                                                src={`${SIMPLE_URL}/images/Testimonials/${testimonials.image}`}
                                                width={100}
                                                alt={testimonials.image}
                                              />
                                            </div>
                                          )}
                                      </Col>
                                      <Col md="12 mb-3">
                                        <Label htmlFor="validationCustom02">
                                          {trans("Title")}{" "}
                                          <span className="text-danger">*</span>
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
                                            maxLength: 60,
                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                          })}
                                        />
                                        <span>
                                          {errors2.heading?.type ==
                                            "required" && "title is required"}
                                          {errors2.heading?.type ==
                                            "maxLength" &&
                                            trans("Maximum Length: ") + "60"}
                                          {errors2.heading?.type == "pattern" &&
                                            "Please write alphanumeric values"}
                                        </span>
                                        <div className="valid-feedback">
                                          {"Looks good!"}
                                        </div>
                                      </Col>
                                      <Col md="12 mb-3">
                                        <Label htmlFor="validationCustom02">
                                          {trans("Text")}{" "}
                                          <span className="text-danger">*</span>
                                        </Label>

                                        <Controller
                                          control={control2}
                                          content={EditContent}
                                          name="text2"
                                          key={
                                            foundItem != null && foundItem.text
                                          }
                                          defaultValue={
                                            foundItem != null && foundItem.text
                                          }
                                          rules={{ required: true }}
                                          render={() => (
                                            <CKEditor
                                              initData={EditContent}
                                              // editor={ClassicEditor}
                                              key={
                                                foundItem != null &&
                                                foundItem.text
                                              }
                                              defaultValue={
                                                foundItem != null &&
                                                foundItem.text
                                              }
                                              name="text2"
                                              onChange={(e) => editorEvent(e)}
                                              {...register("text2")}
                                            />
                                          )}
                                        />

                                        <span>
                                          {errors2.text2 && "field is required"}
                                        </span>
                                        <div className="valid-feedback">
                                          {"Looks good!"}
                                        </div>
                                      </Col>
                                      <Col md="12 mb-3">
                                        <Label htmlFor="validationCustom02">
                                          {trans("Name")}{" "}
                                          <span className="text-danger">*</span>
                                        </Label>
                                        <Input
                                          className="form-control"
                                          name="name"
                                          type="text"
                                          key={
                                            foundItem != null && foundItem.name
                                          }
                                          defaultValue={
                                            foundItem != null && foundItem.name
                                          }
                                          innerRef={register2({
                                            required: true,
                                            maxLength: 60,
                                            pattern: /^[a-zA-Z0-9.\s]+$/,
                                          })}
                                        />
                                        <span>
                                          {errors2.name?.type == "required" &&
                                            "name is required"}
                                          {errors2.name?.type == "maxLength" &&
                                            trans("Maximum Length: ") + "60"}
                                          {errors2.name?.type == "pattern" &&
                                            "Please write alphanumeric values"}
                                        </span>
                                        <div className="valid-feedback">
                                          {"Looks good!"}
                                        </div>
                                      </Col>
                                    </div>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter className="d-flex justify-content-between">
                          <Button color="success" type="submit" form="form1">
                            {trans("Save")}
                          </Button>
                          <Button
                            onClick={() =>
                              setEditTestimonials(!editTestimonials)
                            }
                          >
                            {trans("Cancel")}
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </tbody>
                  );
                })}
            </Table>
          </div>
          {/* </Card>
              </Col>
            </Card>
          </Col> */}
        </Row>
        <Row>
          {/* <Col sm="12">
            <Card> */}

          {/* <CardBody> */}
          <Form
            className="needs-validation"
            noValidate=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-row">
              <Col md="12 mb-3">
                <Label htmlFor="validationCustom02">
                  {Image} <span className="text-danger">*</span>
                </Label>
                <Controller
                  control={control}
                  name="file"
                  rules={{ required: true }}
                  defaultValue={""}
                  render={() => (
                    <Dropzone
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      inputContent={trans("Drop A File")}
                      minSizeBytes={0}
                      maxSizeBytes={2000000}
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
                  {errors.file?.type == "required"
                    ? trans("field is required")
                    : errors.file && errors.file.message}
                </span>
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label htmlFor="validationCustom02">
                  {trans("Title")} <span className="text-danger">*</span>
                </Label>
                <Input
                  className="form-control"
                  name="heading"
                  type="text"
                  innerRef={register({
                    required: true,
                    maxLength: 60,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                />
                <span>
                  {errors.heading?.type == "required" &&
                    trans("title is required")}
                  {errors.heading?.type == "maxLength" &&
                    trans("Maximum Length: ") + "60"}
                  {errors.heading?.type == "pattern" &&
                    "Please write alphanumeric values"}
                </span>
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label htmlFor="validationCustom02">
                  {trans("Text")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  // as={CKEditor}
                  control={control}
                  name="text"
                  key={foundItem != null && foundItem.text}
                  rules={{ required: true }}
                  render={() => (
                    <CKEditor
                      element={content}
                      // editor={ClassicEditor}
                      name="text"
                      onChange={(e) => onChangeEvent(e)}
                      {...register("text")}
                    />
                  )}
                />

                <span>{errors.text && trans("field is required")}</span>
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label htmlFor="validationCustom02">
                  {trans("Name")} <span className="text-danger">*</span>
                </Label>
                <Input
                  className="form-control"
                  name="name"
                  type="text"
                  innerRef={register({
                    required: true,
                    maxLength: 60,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                />
                <span className="text-danger">
                  {errors.name?.type == "required" &&
                    trans("field is required")}
                  {errors.name?.type == "maxLength" &&
                    trans("Maximum Length: ") + "60"}
                  {errors.name?.type == "pattern" &&
                    "Please write alphanumeric values"}
                </span>
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
            </div>
            <Button color="success">{"Save"}</Button>
          </Form>
          {/* </CardBody> */}
          {/* </Card>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Testimonials;
