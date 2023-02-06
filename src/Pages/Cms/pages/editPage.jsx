/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { CKEditor } from "ckeditor4-react";
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
import { useTranslation, } from "react-i18next";
import { Trash } from "react-feather";
import { useDispatch, } from "react-redux";
import {
  PageEditAction,
} from "../../../redux/Pages/Cms/Pages/actions";

const CreatePage = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [content_en, setContent_en] = useState(null);
  const [content_fr, setContent_fr] = useState(null);
  const [PageData, setPageData] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const [pageSEO, setPageSEO] = useState(null);

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
  } = useForm({ shouldFocusError: true });

  // const handleChangeStatus = ({ file }, status) => {
  //   if (status == "done") {
  //    setValue("image", file);
  //   }
  // };

  const onSubmit = (data) => {
    const formData = new FormData();
    // if (data.image != undefined) {
    //   formData.append("image", data.image);
    // }
    // formData.append("title_en", data.title_en);
    formData.append("title_fr", data.title_fr);
    formData.append("slug", data.slug);
    formData.append("status", data.status);
    formData.append("content_fr", data.content_fr);

    // formData.append("head", data.head);
    // formData.append("body", data.body);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("robots_meta", data.robots_meta);
    formData.append("canonical_url", data.canonical_url);

    // formData.append("content_en", data.content_en);
    formData.append("_method", "PATCH");

    dispatch(PageEditAction(formData, params.idd, trans, setError))
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/pages/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setPageData(response.data.page);
      setContent_en(response.data.page.content_en);
      setContent_fr(response.data.page.content_fr);
      setPageSEO(response.data.page_seo);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/cms/pages/list`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Edit Page")}
        parent={trans("CMS")}
        title={trans("Page")}
        subtitle={trans("Edit")}
      />

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
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("French title")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="title_fr"
                        type="text"
                        placeholder={trans("Enter the French title")}
                        innerRef={register({
                          required: true,
                          maxLength: 60,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={PageData != null && PageData.title_fr}
                        defaultValue={PageData != null && PageData.title_fr}
                      />
                      <span>
                        {errors.title_fr?.type && trans("field is required")}
                        {errors.title_fr?.type == "maxLength" &&
                          trans("Maximum Length: ") + "60"}
                        {errors.title_fr?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Page Url")}{" "}
                        <span className="text-danger">*</span>
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
                        {trans(Status)} <span className="text-danger">*</span>
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

                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Content in French")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="content_fr"
                        rules={{ required: true }}
                        activeclassName="p10"
                        key={PageData != null ? PageData.content_fr : ""}
                        defaultValue={
                          PageData != null ? PageData.content_fr : ""
                        }
                        render={() => (
                          <CKEditor
                            activeclassName="p10"
                            element={content_fr}
                            initData={PageData != null ? PageData.content_fr : ""}
                            onChange={(e) => onChange(e)}
                          />
                        )}
                      />

                      <span>
                        {errors.content_fr && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Card style={{ border: "1px solid lightgray" }}>
                    <CardHeader>
                      <h4>{trans("SEO")}</h4>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        {/* <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Header")}
                          </Label>
                          <Input
                            className="form-control"
                            name="head"
                            type="textarea"
                            // placeholder={trans("SEO Header")}
                            innerRef={register({
                              required: false,
                              // maxLength: 30,
                            })}
                            key={pageSEO != null && pageSEO.head}
                            defaultValue={pageSEO != null && pageSEO.head}
                            style={{ minHeight: 60 }}
                          />
                          <span className="text-danger">
                            {errors.head && trans("field is required")}
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
                            innerRef={register({
                              required: false,
                            })}
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
                        </Col> */}
                        <Col md="12 mb-3">
                          <Label htmlFor="validationCustom02">
                            {trans("Meta Title")}
                          </Label>
                          <Input
                            className="form-control"
                            name="meta_title"
                            type="text"
                            // placeholder={trans("Meta Title")}
                            innerRef={register({
                              required: false,
                            })}
                            key={pageSEO != null ? pageSEO.meta_title : ""}
                            defaultValue={
                              pageSEO != null ? pageSEO.meta_title : ""
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
                            innerRef={register({
                              required: false,
                            })}
                            key={
                              pageSEO != null ? pageSEO.meta_description : ""
                            }
                            defaultValue={
                              pageSEO != null ? pageSEO.meta_description : ""
                            }
                            style={{ minHeight: 60 }}
                          />
                          <span className="text-danger">
                            {errors.meta_description &&
                              trans("field is required")}
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
                            innerRef={register({
                              required: false,
                            })}
                            key={pageSEO != null ? pageSEO.robots_meta : ""}
                            defaultValue={
                              pageSEO != null ? pageSEO.robots_meta : ""
                            }
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
                            innerRef={register({
                              required: false,
                            })}
                            key={pageSEO != null ? pageSEO.canonical_url : ""}
                            defaultValue={
                              pageSEO != null ? pageSEO.canonical_url : ""
                            }
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

export default CreatePage;
