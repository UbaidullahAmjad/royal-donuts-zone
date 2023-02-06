import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { useForm, Controller } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import { Trash } from "react-feather";

const CreatePage = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();
  const [content_en, setContent_en] = useState(null);
  const [content_fr, setContent_fr] = useState(null);
  const [PageData, setPageData] = useState(null);
  const [backBtn, setBackBtn] = useState(false)
  const [pageSEO, setPageSEO] = useState(null)

  const onChange = (evt) => {
    const dataContent = evt.editor.getData();
    setContent_fr(dataContent);
    if (dataContent == "" || dataContent == "" || dataContent == null) {
      setValue("content_fr", "");
    } else {
      setValue("content_fr", dataContent);
    }
  };
  const onChangeEvent = (evt) => {
    const newContent = evt.editor.getData();
    setContent_en(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("content_en", "");
    } else {
      setValue("content_en", newContent);
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({shouldFocusError:true});;

  // const handleChangeStatus = ({ file }, status) => {
  //   if (status == "done") {
  //    setValue("image", file);
  //   }
  // };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    const formData = new FormData();
    // if (data.image != undefined) {
    //   formData.append("image", data.image);
    // }
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
    formData.append("_method", "PATCH");

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/pages/` + params.idd,
      data: formData,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true)
        } else {
          console.log("EDIT PAGE RESPONSE --- ", response.data);
          if (response.data.type == "slug") {
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
        }
      })
      .catch((error) => {
        console.log(
          "DATA ERROR PAGE--- ",
          Object.keys(error.response.data.errors)
        );
        if (Object.keys(error.response.data.errors)[0] == "slug") {
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
        }
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/pages/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("editPage - resp", response);
      setPageData(response.data.page);
      setContent_en(response.data.page.content_en);
      setContent_fr(response.data.page.content_fr);
      setPageSEO(response.data.page_seo)
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/cms/pages/list/RD`);
  }


  console.log("PAGE ERRORS --- ", errors);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Page")} />

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
                        key={PageData != null && PageData.title_en}
                        defaultValue={PageData != null && PageData.title_en}
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
                        placeholder={trans("Enter the French title")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 60,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                        key={PageData != null && PageData.title_fr}
                        defaultValue={PageData != null && PageData.title_fr}
                      />
                      <span>
                        {errors.title_fr?.type && trans("field is required")}
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
                          key={PageData != null && PageData.slug}
                          defaultValue={PageData != null && PageData.slug}
                        />
                        <span>
                          {errors.slug && errors.slug.type == "required"
                            ? trans("field is required")
                            : errors.slug && errors.slug.message}
                        </span>
                      </InputGroup>

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
                        <option selected disabled>
                          {trans("Choose")}
                        </option>
                        <option
                          value={1}
                          selected={PageData != null && PageData.status == "1"}
                        >
                          {trans("Active")}
                        </option>
                        <option
                          value={0}
                          selected={PageData != null && PageData.status == "0"}
                        >
                          {trans("Inactive")}
                        </option>
                      </Input>
                      <span>{errors.status && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(ContenuEnAnglais)}
                      </Label>
                      <Controller
                        as={CKEditors}
                        control={control}
                        name="content_en"
                        rules={{ required: true }}
                        activeclassName="p10"
                        content={content_en}
                        events={{
                          change: onChangeEvent,
                        }}
                       key={PageData != null ? PageData.content_en : ""}
                        defaultValue={
                          PageData != null ? PageData.content_en : ""
                        }
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
                        {trans("Content in French")} *
                      </Label>
                      <Controller
                        as={CKEditors}
                        control={control}
                        name="content_fr"
                        rules={{ required: true }}
                        activeclassName="p10"
                        content={content_fr}
                        events={{
                          change: onChange,
                        }}
                        key={PageData != null ? PageData.content_fr : ""}
                        defaultValue={
                          PageData != null ? PageData.content_fr : ""
                        }
                      />

                      <span>
                        {errors.content_fr && trans("field is required")}
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
                        rules={{ required: false }}
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
                            {...register("image")}
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
                                // maxLength: 30,
                              })
                            }
                            key={pageSEO != null ? pageSEO.head : ""}
                            defaultValue={pageSEO != null ? pageSEO.head : ""}
                            style={{ minHeight: 60 }}
                          />
                          <span className="text-danger">
                            {errors.head && trans("field is required")}
                            {/* {errors.head?.type == "maxLength" && trans("Maximum Length: ") + "30"} */}
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
                            key={pageSEO != null ? pageSEO.body : ""}
                            defaultValue={pageSEO != null ? pageSEO.body : ""}
                            style={{ minHeight: 60 }}
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
                            key={pageSEO != null ? pageSEO.meta_title : ""}
                            defaultValue={pageSEO != null ? pageSEO.meta_title : ""}
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
                            key={pageSEO != null ? pageSEO.meta_description : ""}
                            defaultValue={pageSEO != null ? pageSEO.meta_description : ""}
                            style={{ minHeight: 60 }}
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
                            key={pageSEO != null ? pageSEO.robots_meta : ""}
                            defaultValue={pageSEO != null ? pageSEO.robots_meta : ""}
                            style={{ minHeight: 60 }}
                          />
                          <span className="text-danger">
                            {errors.robots_meta && trans("field is required")}
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
                            key={pageSEO != null ? pageSEO.canonical_url : ""}
                            defaultValue={pageSEO != null ? pageSEO.canonical_url : ""}
                            style={{ minHeight: 60 }}
                          />
                          <span className="text-danger">
                            {errors.canonical_url && trans("field is required")}
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
