import React, { Fragment, useEffect, useState } from "react";

import Breadcrumb from "../../../layout/breadcrumb/index";

import { translate } from "react-switch-lang";

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
import Dropzone from "react-dropzone-uploader";
import CKEditors from "react-ckeditor-component";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import * as CarouselAction from "../../../redux/Carousel/Carousel_action";
import { SIMPLE_URL, URL } from "../../../env";
import axios from "axios";

import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";

const CarouselSettings = (props) => {
  const trans = props.t;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const {
    register: EditDeleteRegister,
    handleSubmit: EditDeleteHandleSubmit,
    setError: EditDeleteSetError,
    setValue: EditDeleteSetValue,
    formState: { errors: EditDeleteErrors },
    control: EditDeleteControl,
    reset: EditDeleteReset,
  } = useForm({ shouldFocusError: true });

  const { number_of_slides, slides_array } = useSelector(
    (state) => state.carousel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const GetCarouselContent = () => {
      axios
        .get(URL + `/carousel_setting`)
        .then((response) => {
          const carousel_response_data = response.data.carousel;
          carousel_response_data.forEach((item, index) => {
            console.log("ITEMMMMMMMMMM -----------", item);
            dispatch(CarouselAction.AddCarousel(item, null, false));
          });
        })
        .catch((error) => {
          console.log("ERROR ----------------", error);
        });
    };
    GetCarouselContent();
  }, []);

  const [ImagePath, setImagePath] = useState(null);
  const [AllFiles, setAllFiles] = useState(null);

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
    {
      setError(
        "slider_image",
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
      setValue("slider_image", file);
      setAllFiles(allFiles);
      setImagePath(meta);
      console.log(
        "FILE URL ---------------------",
        file,
        " ------meta ---------",
        meta
      );
      setError("slider_image", {
        shouldFocus: false,
      });
    }
  };

  const [FirstHeading, setFirstHeading] = useState("");
  const [SecondHeading, setSecondHeading] = useState("");

  const FirstHeadingChange = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setFirstHeading(newContent);
      setValue("slider_firstHeading", newContent);
    } else {
      setValue("slider_firstHeading", "");
    }
  };

  const SecondHeadingChange = (evt) => {
    const newContent = evt.editor.getData();
    if (newContent != "" || newContent != null) {
      setSecondHeading(newContent);
      setValue("slider_secondHeading", newContent);
    } else {
      setValue("slider_secondHeading", "");
    }
  };

  console.log("SLIDES ARRAY ----------------", slides_array);

  const onSubmit = (data) => {
    console.log("DATAA ----------------------", data);

    const form = new FormData();
    form.append("image", data.slider_image);
    form.append("first_heading", data.slider_firstHeading);
    form.append("second_heading", data.slider_secondHeading);
    form.append("important_text", data.slider_impText);
    form.append("button_text", data.slider_btnText);

    axios
      .post(URL + "/carousel_setting", form)
      .then((response) => {
        if (response.data.success) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          data["id"] = response.data.carousel?.id;
          dispatch(CarouselAction.AddCarousel(data, ImagePath, true));
          AllFiles.forEach((f) => f.remove());
          setImagePath(null);
          setFirstHeading("");
          setSecondHeading("");
          reset();
        }
      })
      .catch((error) => {
        toast.danger(trans("error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ERROR --------------", error);
      });
  };

  const [EditProductID, setEditProductID] = useState(0);

  const EditSlider = (event, id) => {
    event.stopPropagation();
    console.log("ID --------------", id);
    setEditProductID(id);
  };

  const EdithandleChangeStatus = (meta, file, status, allFiles, id) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
    {
      EditDeleteSetError(
        `slider_${id}_image`,
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
      EditDeleteSetValue(`slider_${id}_image`, file);
      setImagePath(meta);
      // console.log(
      //   "FILE URL ---------------------",
      //   file,
      //   " ------meta ---------",
      //   meta
      // );
      EditDeleteSetError(`slider_${id}_image`, {
        shouldFocus: false,
      });
    }
  };

  const EditFirstHeadingChange = (evt, id) => {
    const newContent = evt.editor.getData();
    const found_slider_item_with_id = slides_array.find(
      (item) => item.id == id
    );
    if (newContent != "" || newContent != null) {
      found_slider_item_with_id["first_heading"] = newContent;
      EditDeleteSetValue(`slider_${id}_firstHeading`, newContent);
    } else {
      found_slider_item_with_id["first_heading"] = "";
      EditDeleteSetValue(`slider_${id}_firstHeading`, "");
    }
  };

  const EditSecondHeadingChange = (evt, id) => {
    const newContent = evt.editor.getData();
    const found_slider_item_with_id = slides_array.find(
      (item) => item.id == id
    );
    if (newContent != "" || newContent != null) {
      found_slider_item_with_id["second_heading"] = newContent;
      EditDeleteSetValue(`slider_${id}_secondHeading`, newContent);
    } else {
      found_slider_item_with_id["second_heading"] = "";
      EditDeleteSetValue(`slider_${id}_secondHeading`, "");
    }
  };

  //   console.log("EditDeleteErrors ------------", EditDeleteErrors);

  const onEditSubmit = (data) => {
    // console.log(
    //   "EDIT SUBIT DATA ----------------------",
    //   data,
    //   " -----------id -------",
    //   EditProductID
    // );
    // throw new Error("GOT ITT");
    const form = new FormData();
    form.append("_method", "PATCH");
    if (data[`slider_${EditProductID}_image`] != undefined) {
      form.append("image", data[`slider_${EditProductID}_image`]);
    }
    form.append("first_heading", data[`slider_${EditProductID}_firstHeading`]);
    form.append(
      "second_heading",
      data[`slider_${EditProductID}_secondHeading`]
    );
    form.append("button_text", data[`slider_${EditProductID}_btnText`]);
    form.append("important_text", data[`slider_${EditProductID}_impText`]);
    axios
      .post(URL + `/carousel_setting/${EditProductID}`, form)
      .then((response) => {
        if (response.data.success) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          data["id"] = EditProductID;
          dispatch(CarouselAction.EditCarousel(data, ImagePath, EditProductID));
          setImagePath(null);
        }
      })
      .catch((error) => {
        toast.danger(trans("Error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ERROR ------------", error);
      });
  };

  const DeleteSlider = (event, id) => {
    event.stopPropagation();
    // console.log("DELETEEEEEEEEEEEEEEEEEEEEEEEee");
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
        DeletedCarousel(id);
        SweetAlert.fire({
          icon: "success",
          title: trans("Deleted"),
          text: trans("Your item has been deleted."),
          confirmButtonText: trans("OK"),
        });
      }
    });
  };

  const DeletedCarousel = (id) => {
    axios
      .delete(URL + `/carousel_setting/${id}`)
      .then((response) => {
        if (response.data.success == true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(CarouselAction.DeleteCarousel(id));
        }
      })
      .catch((error) => {
        toast.success(trans("error"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("ERROR ------------", error);
      });
  };

  return (
    <Fragment>
      {/* <Breadcrumb
        parent={trans("General Settings")}
        title={trans("Carousel Settings")}
      /> */}

      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody> */}
              <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("Carousel Settings")}</h5>
                </CardHeader>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      {slides_array?.length > 0 &&
                        slides_array.map((item) => (
                          <Form
                            id="edit_delete_slider"
                            className="needs-validation"
                            noValidate=""
                            onSubmit={EditDeleteHandleSubmit(onEditSubmit)}
                          >
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <div
                                  className="d-flex justify-content-between"
                                  style={{ width: "100%" }}
                                >
                                  <h3>
                                    {trans("Carousel")} #{item.number}
                                  </h3>
                                  <div
                                    style={{ height: "100%", display: "flex" }}
                                  >
                                    <Button
                                      form="edit_delete_slider"
                                      className="mr-2"
                                      color="primary"
                                      type="submit"
                                      onClick={(event) =>
                                        EditSlider(event, item.id)
                                      }
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Button>
                                    <Button
                                      className="mr-2"
                                      color="danger"
                                      onClick={(event) =>
                                        DeleteSlider(event, item.id)
                                      }
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Button>
                                  </div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="row">
                                  <div className="col-md-8">
                                    <Label for="slider_image">
                                      {trans("Carousel Image")}
                                    </Label>
                                    <Controller
                                      control={EditDeleteControl}
                                      name={`slider_${item.id}_image`}
                                      render={() => (
                                        <Dropzone
                                          maxFiles={1}
                                          multiple={false}
                                          canCancel={false}
                                          minSizeBytes={0}
                                          maxSizeBytes={2000000}
                                          inputContent={trans("Drop A File")}
                                          styles={{
                                            dropzoneActive: {
                                              borderColor: "green",
                                            },
                                          }}
                                          accept="image/*"
                                          onChangeStatus={(
                                            { meta, file },
                                            status,
                                            allFiles
                                          ) =>
                                            EdithandleChangeStatus(
                                              meta,
                                              file,
                                              status,
                                              allFiles,
                                              item.id
                                            )
                                          }
                                        />
                                      )}
                                    />
                                    <span className="text-danger">
                                      {EditDeleteErrors[
                                        `slider_${item.id}_btnText`
                                      ]?.type == "string" &&
                                        EditDeleteErrors[
                                          `slider_${item.id}_btnText`
                                        ]?.message}
                                    </span>
                                  </div>
                                  <div
                                    className="col-md-4"
                                    style={{
                                      height: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Label>{trans("Preview Image")}</Label>
                                    {item?.image_temp_path ? (
                                      <img
                                        src={item?.image_temp_path}
                                        style={{
                                          width: "250px",
                                          height: "120px",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          `${SIMPLE_URL}/images/Carousel/` +
                                          item.image
                                        }
                                        style={{
                                          width: "250px",
                                          height: "120px",
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div className="col-md-6 mt-3">
                                    <Label for="first_heading ">
                                      {trans("First Heading")}
                                    </Label>
                                    <Controller
                                      control={EditDeleteControl}
                                      name={`slider_${item.id}_firstHeading`}
                                      rules={{ required: true }}
                                      defaultValue={item.first_heading}
                                      render={() => (
                                        <CKEditors
                                          activeclassName="p10"
                                          content={item.first_heading}
                                          events={{
                                            change: (event) =>
                                              EditFirstHeadingChange(
                                                event,
                                                item.id
                                              ),
                                          }}
                                        />
                                      )}
                                    />
                                    <span className="text-danger">
                                      {EditDeleteErrors[
                                        `slider_${item.id}_firstHeading`
                                      ]?.type == "required" &&
                                        trans("heading is required")}
                                    </span>
                                  </div>
                                  <div className="col-md-6 mt-3">
                                    <Label for="second_heading">
                                      {trans("Second Heading")}
                                    </Label>
                                    <Controller
                                      control={EditDeleteControl}
                                      name={`slider_${item.id}_secondHeading`}
                                      rules={{ required: true }}
                                      defaultValue={item?.second_heading}
                                      render={() => (
                                        <CKEditors
                                          activeclassName="p10"
                                          content={
                                            item.second_heading != undefined &&
                                            item.second_heading != null
                                              ? item.second_heading
                                              : ""
                                          }
                                          events={{
                                            change: (event) =>
                                              EditSecondHeadingChange(
                                                event,
                                                item.id
                                              ),
                                          }}
                                        />
                                      )}
                                    />
                                    <span className="text-danger">
                                      {EditDeleteErrors[
                                        `slider_${item.id}_secondHeading`
                                      ]?.type == "required" &&
                                        trans("heading is required")}
                                    </span>
                                  </div>
                                  <div className="col-md-12 mt-3">
                                    <Label for="btn_text">
                                      {trans("Text")}
                                    </Label>
                                    <Input
                                      type="text"
                                      defaultValue={item.impText}
                                      innerRef={EditDeleteRegister({
                                        required: false,
                                      })}
                                      name={`slider_${item.id}_impText`}
                                    />
                                    <span className="text-danger">
                                      {EditDeleteErrors[
                                        `slider_${item.id}_impText`
                                      ]?.type == "required" &&
                                        trans("field is required")}
                                    </span>
                                  </div>
                                  <div className="col-md-12 mt-3">
                                    <Label for="btn_text">
                                      {trans("Button Text")}
                                    </Label>
                                    <Input
                                      type="text"
                                      defaultValue={item.button_text}
                                      innerRef={EditDeleteRegister({
                                        required: false,
                                      })}
                                      name={`slider_${item.id}_btnText`}
                                    />
                                    <span className="text-danger">
                                      {EditDeleteErrors[
                                        `slider_${item.id}_btnText`
                                      ]?.type == "required" &&
                                        trans("button text is required")}
                                    </span>
                                  </div>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </Form>
                        ))}
                      <Form
                        className="needs-validation"
                        noValidate=""
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Accordion className="mt-3">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{ width: "100%" }}
                            >
                              <h3>{trans("Add Carousel")}</h3>
                              <div style={{ height: "100%", display: "flex" }}>
                                <Button
                                  className="mr-2"
                                  color="success"
                                  type="submit"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </Button>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="row">
                              <div className="col-md-12">
                                <Label for="slider_image">
                                  {trans("Carousel Image")}
                                </Label>
                                <Controller
                                  control={control}
                                  name={`slider_image`}
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
                                        dropzoneActive: {
                                          borderColor: "green",
                                        },
                                      }}
                                      accept="image/*"
                                      onChangeStatus={handleChangeStatus}
                                    />
                                  )}
                                />
                                <span className="text-danger">
                                  {errors?.slider_image?.type == "required" &&
                                    trans("image is required")}
                                </span>
                              </div>
                              <div className="col-md-6 mt-3">
                                <Label for="first_heading ">
                                  {trans("First Heading")}
                                </Label>
                                <Controller
                                  control={control}
                                  name={`slider_firstHeading`}
                                  rules={{ required: true }}
                                  render={() => (
                                    <CKEditors
                                      activeclassName="p10"
                                      content={FirstHeading}
                                      events={{
                                        change: FirstHeadingChange,
                                      }}
                                    />
                                  )}
                                />
                                <span className="text-danger">
                                  {errors?.slider_firstHeading?.type ==
                                    "required" && trans("heading is required")}
                                </span>
                              </div>
                              <div className="col-md-6 mt-3">
                                <Label for="second_heading">
                                  {trans("Second Heading")}
                                </Label>
                                <Controller
                                  control={control}
                                  name={`slider_secondHeading`}
                                  // defaultValue={" "}
                                  rules={{ required: true }}
                                  render={() => (
                                    <CKEditors
                                      activeclassName="p10"
                                      content={SecondHeading}
                                      events={{
                                        change: SecondHeadingChange,
                                      }}
                                    />
                                  )}
                                />
                                <span className="text-danger">
                                  {errors?.slider_secondHeading?.type ==
                                    "required" && trans("heading is required")}
                                </span>
                              </div>
                              <div className="col-md-12 mt-3">
                                <Label for="btn_text">{trans("Text")}</Label>
                                <Input
                                  type="text"
                                  name={`slider_impText`}
                                  innerRef={register({ required: false })}
                                />
                                <span className="text-danger">
                                  {errors?.slider_impText?.type == "required" &&
                                    trans("field is required")}
                                </span>
                              </div>
                              <div className="col-md-12 mt-3">
                                <Label for="btn_text">
                                  {trans("Button Text")}
                                </Label>
                                <Input
                                  type="text"
                                  name={`slider_btnText`}
                                  innerRef={register({ required: false })}
                                />
                                <span className="text-danger">
                                  {errors?.slider_btnText?.type == "required" &&
                                    trans("button text is required")}
                                </span>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </Form>
                    </div>
                    {/* <div className="col-md-2">
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button className="mr-2" color="success">
                            <i className="fa fa-plus"></i>
                          </Button>
                          <Button color="danger">
                            <i className="fa fa-trash"></i>
                          </Button>
                        </div>
                      </div> */}
                  </div>

                  {/* <Button className="mt-3" color="success">
                    {trans("Save")}
                  </Button> */}
                </div>
              {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(CarouselSettings);
