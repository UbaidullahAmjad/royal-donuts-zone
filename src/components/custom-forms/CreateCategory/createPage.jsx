import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { useNavigate } from "react-router-dom";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  CustomStyles,
  ContenuEnFrancais,
  Image,
  ContenuEnAnglais,
  TitreEnAnglais,
  TitreEnFrançais,
  UrlDeLaPage,
  Status,
} from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";

import { translate } from "react-switch-lang";

const CreatePage = (props) => {
  const trans = props.t;

  const [content, setContent] = useState();
  const [contentEn, setContentEn] = useState();
  const onChange = (evt) => {
    const dataContent = evt.editor.getData();
    setContent(dataContent);
    setValue("content_fr", dataContent);
  };
  const onChangeEvent = (evt) => {
    const newContent = evt.editor.getData();
    setContentEn(newContent);
    setValue("content_en", newContent);
  };

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false)
  const {
    register,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const handleChangeStatus = ({ file }, status) => {
    if (status == "done") {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    console.log("createPage - this is submitted data", data);
    const formData = new FormData();
    // formData.append("image", data.image);
    // formData.append("title_en", data.title_en);
    formData.append("title_fr", data.title_fr);
    formData.append("slug", data.slug);
    formData.append("status", data.status);
    formData.append("content_fr", data.content_fr);

    formData.append("head", data.head);
    formData.append("body", data.body );
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("robots_meta", data.robots_meta);
    formData.append("canonical_url", data.canonical_url);

    // formData.append("content_en", data.content_en);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/pages`,
      data: formData,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true)
        } else {
          // toast.error(trans("failed"), {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
          setError(
            "slug",
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
      })
      .catch((error) => {
        console.log(
          "DATA ERROR PAGE CREATE --- ",
          Object.keys(error.response.data.errors)
        );
        // if (Object.keys(error.response.data.errors)[0] == "slug") {
        const value = Object.keys(error.response.data.errors)[0];
        setError(
          "slug",
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
        // }
      });
  };

  const goBack = () => {
    navigate(`/cms/pages/list/RD`);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/pages/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Create Page")} />

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
                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(TitreEnAnglais)}
                      </Label>
                      <Input
                        className="form-control"
                        name="title_en"
                        type="text"
                        placeholder={trans("Enter the English title")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.title_en && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("French title")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="title_fr"
                        type="text"
                        placeholder={trans("Enter title")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span className="text-danger">
                        {errors.title_fr?.type == "required" && trans("field is required")}
                        {errors.title_fr?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                        {errors.title_fr?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Page Url")} *
                      </Label>
                      <InputGroup>
                        <InputGroupText>
                          {window.location.protocol +
                            "/" +
                            window.location.hostname +
                            "/"}
                        </InputGroupText>
                        <Input
                          className="form-control"
                          name="slug"
                          type="text"
                          placeholder={trans("Enter the URL of the page")}
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
                        {errors.slug && errors.slug.type == "required"
                          ? trans("field is required")
                          : errors.slug && errors.slug.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Status)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="status"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected="true" value="" disabled>
                          {trans("Choose")}
                        </option>
                        <option value={1}>{trans("Active")}</option>
                        <option value={0}>{trans("Inactive")}</option>
                      </Input>
                      <span className="text-danger">{errors.status && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Content in English")}
                      </Label>
                      <Controller
                        control={control}
                        name="content_en"
                        rules={{ required: true }}
                        render={() => (
                          <CKEditors
                            activeclassName="p10"
                            content={contentEn}
                            events={{
                              change: onChangeEvent,
                            }}
                          />
                        )}
                      />

                      <span>
                        {errors.content_en && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Content")}
                      </Label>
                      <Controller
                        control={control}
                        name="content_fr"
                        rules={{
                          required: false,
                          // maxLength: 2000,
                          // pattern: /^[a-zA-Z0-9.\s]+$/
                        }}
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

                      <span className="text-danger">
                        {errors.content_fr?.type == "required" && trans("field is required")}
                        {/* {errors.content_fr?.type == "maxLength" && trans("Maximum Length: ") + "2000"} */}
                        {/* {errors.content_fr?.type == "pattern" && "Please write alphanumeric values"} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="12 mb-3">
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
                      <span>{errors.image && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                  </div>
                  <Card style={{ border: '1px solid lightgray' }}>
                    <CardHeader>
                      <h4>{trans("Page SEO")}</h4>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Header")}
                          </Label>
                          <Input
                            className="form-control"
                            name="head"
                            type="textarea"
                            // placeholder={trans("SEO Header")}
                            innerRef={
                              register({
                                required: false,
                                // maxLength: 60,
                              })
                            }
                            style={{minHeight: 60}}
                          />
                          <span className="text-danger">
                            {errors.head && trans("field is required")}
                            {/* {errors.head?.type == "maxLength" && trans("Maximum Length: ") + "60"} */}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Body")}
                          </Label>
                          <Input
                            className="form-control"
                            name="body"
                            type="textarea"
                            // placeholder={trans("SEO Body")}
                            innerRef={
                              register({
                                required: false,
                              })
                            }
                            style={{minHeight: 60}}
                          />
                          <span className="text-danger">
                            {errors.body && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Meta Title")}
                          </Label>
                          <Input
                            className="form-control"
                            name="meta_title"
                            type="text"
                            // placeholder={trans("Meta Title")}
                            innerRef={
                              register({
                                required: false,
                              })
                            }
                          />
                          <span className="text-danger">
                            {errors.meta_title && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Meta Description")}
                          </Label>
                          <Input
                            className="form-control"
                            name="meta_description"
                            type="textarea"
                            // placeholder={trans("Meta Title")}
                            innerRef={
                              register({
                                required: false,
                              })
                            }
                            style={{minHeight: 60}}
                          />
                          <span className="text-danger">
                            {errors.meta_description && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Robots Meta")}
                          </Label>
                          <Input
                            className="form-control"
                            name="robots_meta"
                            type="textarea"
                            // placeholder={trans("Robots Meta")}
                            innerRef={
                              register({
                                required: false,
                              })
                            }
                            style={{minHeight: 60}}
                          />
                          <span className="text-danger">
                            {errors.robots_meta  && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Canonical Url")}
                          </Label>
                          <Input
                            className="form-control"
                            name="canonical_url"
                            type="textarea"
                            // placeholder={trans("Canonical Url")}
                            innerRef={
                              register({
                                required: false,
                              })
                            }
                            style={{minHeight: 60}}
                          />
                          <span className="text-danger">
                            {errors.canonical_url  && trans("field is required")}
                          </span>
                          <div className="valid-feedback">
                            {trans("Looks good!")}
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
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

export default translate(CreatePage);
