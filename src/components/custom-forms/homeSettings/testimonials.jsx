import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import Dropzone from "react-dropzone-uploader";
import logo from '../../../assets/images/logo/logoo.png'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import { CKEditor } from "ckeditor4-react";
import { URL } from "../../../env";

import { translate } from "react-switch-lang";
import SweetAlert from "sweetalert2";


const Testimonials = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const {
    register: register2,
    setValue: setValue2,
    setError: setError2,
    control: control2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({shouldFocusError:true});;

  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonials, setEditTestimonials] = useState(false);
  const [foundItem, setFoundItem] = useState(null);
  const [content, setContent] = useState("");
  const [EditContent, setEditContent] = useState("");
  const [Files, setFiles] = useState(null);
  const [ImageLoadedError, setImageLoadedError] = useState(false);

  
  const editorEvent = (evt) => {
    console.log("ECVEJTRE", evt.editor.getData());
    const newContentEdit = evt.editor.getData();
    if (newContentEdit != "" || newContentEdit != null) {
      setEditContent(newContentEdit);
      setValue2("text2", newContentEdit);
    } else {
      console.log('running')
      setValue2("text2", "");
    }
  };

  const onChangeEvent = (evt) => {
    const newContent = evt.editor.getData();
    console.log("event", evt.editor.getData());
    if (newContent != "" || newContent != null) {
      setContent(newContent);
      setValue("text", newContent);
    } else {
      setValue("text", "");
    }
  };

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


  const handleSubmitImage = ({ file }) => {
    console.log("calledd");
    file.remove();
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

  const onSubmit = (data) => {
    console.log("this is submitted data create", data);
    let dataValues = data;
    const formData = new FormData();
    formData.append("id", "no_id");
    formData.append("file", data.file);
    formData.append("heading", data.heading);
    formData.append("text", data.text);
    formData.append("name", data.name);

    axios({
      method: "post",
      url: `${URL}/client-section-store`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });

        let testimonialCreated = response.data.testimonial;
        let oldArray = [...testimonials];
        oldArray.push(testimonialCreated);
        setTestimonials([...oldArray]);
        reset(data.name);
        reset(data.heading);
        setContent("");
        Files.map((f) => f.remove());
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const onSubmitEdit = (data, id) => {
    console.log("this is submitted data edit", data);
    const formData = new FormData();
    formData.append("id", id);
    if (data.file != undefined) {
      formData.append("file", data.file);
    }

    formData.append("heading", data.heading);
    formData.append("text", data.text2);
    formData.append("name", data.name);
    axios({
      method: "post",
      url: `${URL}/client-section-update/${foundItem.id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      console.log("ress", response);
      if (response.data.success === true) {
        let updatedValue = response.data.testimonial;
        // let newData = [...testimonials];
        // let find = newData.find(d => d.id === itemData.id);
        // Object.assign(find, itemData);
        // console.log('newData', newData)
        // setTestimonials(newData)
        let newList = testimonials.map(function (item) {
          return item.id == id ? updatedValue : item;
        });
        console.log("NEW LISTTT----", newList);
        setTestimonials([...newList]);
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEditTestimonials(!editTestimonials);
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/client-section`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setTestimonials(response.data.testimonials);
    };
    getData();
  }, []);

  const editPricesToggle = (id) => {
    const found = testimonials.find((item) => item.id === id);
    console.log("resp edit", found);
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
          console.log("result value", id);
          deleteTestimonial(id);
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

  const deleteTestimonial = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .get(`${URL}/client-section-delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = testimonials.filter((item) => item.id != id);
        setTestimonials(deleted_product);
      });
  };

  const role = atob(localStorage.getItem("role"))
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
                    <Table borderles style={{overflowX: 'scroll'}}>
                      <thead>
                        <tr>
                          <th scope="col" style={{minWidth: 40,}}>{"#"}</th>
                          <th scope="col" style={{minWidth: 90,}}>{trans("IMAGE")}</th>
                          <th scope="col" style={{minWidth: 120,}}>{trans("TITLE")}</th>
                          <th scope="col" style={{minWidth: 300,}}>{trans("TEXT")}</th>
                          <th scope="col" style={{minWidth: 160,}}>{trans("NAME")}</th>
                          <th scope="col" style={{minWidth: 180,}}>{trans("ACTION")}</th>
                        </tr>
                      </thead>
                      {testimonials !== [] &&
                        testimonials.map((testmonial, ind) => {
                          return (
                            <tbody>
                              <tr>
                                <th className="bd-t-none" scope="row">
                                  {ind + 1}
                                </th>
                                <td>
                                  <img src={`https://ecco.royaldonuts.xyz/storage/${testmonial.file}`} 
                                  alt = {testmonial.file} style = {{width: '70px'}}
                                  onError={e => { e.currentTarget.src = logo}} 
                                  >                                
                                  </img>
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
                                  {
                                    (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Button
                                      color="primary"
                                      outline
                                      className="mr-2 "
                                      onClick={() =>
                                        editPricesToggle(testmonial.id)
                                      }
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Button>
                                  }
                                  {
                                    (role == "SuperAdmin" || (permissions.match("delete") != null)) && <Button
                                      color="danger"
                                      className="sweet-7"
                                      name="alertDanger"
                                      outline
                                      onClick={(e) =>
                                        DeletePackageItem(
                                          e.target.name,
                                          testmonial.id
                                        )
                                      }
                                    >
                                      <i className="fa fa-trash-o" title="alertDanger" onClick={(e) =>  DeletePackageItem(e.target.title, testmonial.id)}></i>
                                    </Button>
                                  }
                                </td>
                              </tr>

                              <Modal
                                isOpen={editTestimonials}
                                toggle={editPricesToggle}
                                centered
                              >
                                <ModalHeader
                                  toggle={() =>
                                    setEditTestimonials(!editTestimonials)
                                  }
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
                                           id = 'form1'
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
                                                    foundItem != null &&
                                                    foundItem.file
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.file
                                                  }
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
                                                {testimonials &&
                                                  testimonials.image !== null &&
                                                  testimonials.image !==
                                                  undefined &&
                                                  testimonials.image !==
                                                  "undefined" && (
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "center",
                                                        paddingTop: 10,
                                                      }}
                                                    >
                                                      <img
                                                        src={`https://ecco.royaldonuts.xyz/images/Testimonials/${testimonials.image}`}
                                                        width={100}
                                                        alt={testimonials.image}
                                                      />
                                                    </div>
                                                  )}
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Title")} *
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
                                                    pattern: /^[a-zA-Z0-9.\s]+$/
                                                  })}
                                                />
                                                <span>
                                                  {errors2.heading?.type == "required" &&
                                                    "title is required"}
                                                  {errors2.heading?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                                                  {errors2.heading?.type == "pattern" && "Please write alphanumeric values"}
                                                </span>
                                                <div className="valid-feedback">
                                                  {"Looks good!"}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Text")} *
                                                </Label>

                                                <Controller                                     
                                                  control={control2}
                                                  content={EditContent}
                                                  name="text2"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.text
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.text
                                                  }
                                                  rules={{ required: true }}
                                                  render={() => (                                                   
                                                    <CKEditor
                                                      initData={EditContent}
                                                      editor={ClassicEditor}
                                                      key={
                                                    foundItem != null &&
                                                    foundItem.text
                                                  }
                                                      defaultValue={
                                                    foundItem != null &&
                                                    foundItem.text
                                                  }
                                                      name="text2"
                                                      onChange={(e) =>
                                                        editorEvent(e)
                                                      }
                                                      {...register("text2")}
                                                    />
                                                  )}
                                                />
                                              

                                                <span>
                                                  {errors2.text2 &&
                                                    "field is required"}
                                                </span>
                                                <div className="valid-feedback">
                                                  {"Looks good!"}
                                                </div>
                                              </Col>
                                              <Col md="12 mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  {trans("Name")} *
                                                </Label>
                                                <Input
                                                  className="form-control"
                                                  name="name"
                                                  type="text"
                                                  key={
                                                    foundItem != null &&
                                                    foundItem.name
                                                  }
                                                  defaultValue={
                                                    foundItem != null &&
                                                    foundItem.name
                                                  }
                                                  innerRef={register2({
                                                    required: true,
                                                    maxLength: 60,
                                                    pattern: /^[a-zA-Z0-9.\s]+$/
                                                  })}
                                                />
                                                <span>
                                                  {errors2.name?.type == "required" &&
                                                    "name is required"}
                                                  {errors2.name?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                                                  {errors2.name?.type == "pattern" && "Please write alphanumeric values"}
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
                                <Button color="primary" type = 'submit' form = 'form1'>
                                              {"update"}
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      setEditTestimonials(!editTestimonials)
                                    }
                                  >
                                    cancel
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
                      <Label htmlFor="validationCustom02">{Image} *</Label>
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
                        {errors.file?.type == 'required' ? trans("field is required")
                        :errors.file && errors.file.message
                        }
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Title")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="heading"
                        type="text"
                        innerRef={
                          register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.heading?.type == "required" && trans("title is required")}
                        {errors.heading?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                        {errors.heading?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Text")} *
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
                            editor={ClassicEditor}
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
                        {trans("Name")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        innerRef={
                          register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span className="text-danger">
                        {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </div>
                  <Button color="primary">{"Save"}</Button>
                </Form>
              {/* </CardBody> */}
            {/* </Card>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(Testimonials);
