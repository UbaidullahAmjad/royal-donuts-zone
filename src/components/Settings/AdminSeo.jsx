/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  Form,
  CardHeader,
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { translate } from "react-switch-lang";
import { URL } from "../../env";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { display } from "@mui/system";

const AdminSeo = (props) => {
  const trans = props.t;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);

  const [AdminSeoData, setAdminSeoData] = useState(null);
  const [ContentMetaTitle, setContentMetaTitle] = useState(null);
  const [contentMetaDescription, setContentMetaDescription] = useState(null);
  const [contentBodyScript, setContentBodyScript] = useState(null);
  const [contentRobotsMeta, setContentRobotsMeta] = useState(null);
  const [contentCanonicalUrl, setContentCanonicalUrl] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${URL}/admin_seo`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      // data: "",
    }).then((response) => {
      console.log("AdminSeo get Data", response);
      const data = response.data.data;
      setAdminSeoData(data);
      setContentMetaTitle(data.meta_title);
      setContentMetaDescription(data.meta_description);
      setContentBodyScript(data.body_script);
      setContentRobotsMeta(data.robots_meta);
      setContentCanonicalUrl(data.canonical_url);
    });
  }, []);

  const onChangeMetaDescription = (evt) => {
    const newContent = evt.editor.getData();
    setContentMetaDescription(newContent);
    setValue("meta_description", newContent);
  };

  const onChangeBodyScript = (evt) => {
    const newContent = evt.editor.getData();
    setContentBodyScript(newContent);
    setValue("body_script", newContent);
  };

  const onChangeRobotsMeta = (evt) => {
    const newContent = evt.editor.getData();
    setContentRobotsMeta(newContent);
    setValue("robots_meta", newContent);
  };

  const onChangeCanonicalUrl = (evt) => {
    const newContent = evt.editor.getData();
    setContentCanonicalUrl(newContent);
    setValue("canonical_url", newContent);
  };

  const onSubmit = (data) => {
    setLoading(true);
    console.log("AdminSeo Form Submitted", data);

    const form_Data = new FormData();
    form_Data.append("meta_title", data.meta_title);
    form_Data.append("meta_description", data.meta_description);
    form_Data.append("body_script", data.body_script);
    form_Data.append("robots_meta", data.robots_meta);
    form_Data.append("canonical_url", data.canonical_url);

    axios({
      method: "post",
      url: `${URL}/admin_seo`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: form_Data,
    })
      .then((response) => {
        setLoading(false);
        console.log("AdminSeo response", response);
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
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("SEO")} title={trans("Admin SEO")} /> */}
      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
              {/* <CardHeader>
                <div className="d-flex justify-content-between align-items-center w">
                  <h5>{trans("Admin SEO Form")}</h5>
                </div>
              </CardHeader> */}
              {/* <CardBody> */}
              <CardHeader className="p-0 pb-4 mb-4">
                  <h5>{trans("Admin SEO")}</h5>
                </CardHeader>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        <h6 className="mb-0">{trans("Meta Title")} *</h6>
                      </Label>
                      <Input
                        className="form-control"
                        name="meta_title"
                        type="text"
                        // value={ContentMetaTitle}
                        defaultValue={ContentMetaTitle}
                        // placeholder={trans("Enter")+" "+trans("Meta Title")}
                        innerRef={register({ required: true, maxLength: 150 })}
                      />
                      <span className="text-danger">
                        {errors.meta_title?.type == "required" &&
                          trans("Meta Title is required")}
                        {errors.meta_title?.type == "maxLength" &&
                          trans("Maximum Length: ") + "150"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        <h6 className="mb-0">{trans("Meta Description")} *</h6>
                      </Label>
                      <Controller
                        control={control}
                        name="meta_description"
                        rules={{ required: true }}
                        key={
                          AdminSeoData != null && AdminSeoData.meta_description
                        }
                        defaultValue={
                          AdminSeoData != null && AdminSeoData.meta_description
                        }
                        render={({ onChange, value }) => (
                          <textarea
                            className="form-control"
                            placeholder="Meta Description"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.meta_description &&
                          trans("Meta Description is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        <h6 className="mb-0">{trans("Body Script")} *</h6>
                      </Label>
                      <Controller
                        control={control}
                        name="body_script"
                        rules={{ required: true }}
                        key={AdminSeoData != null && AdminSeoData.body_script}
                        defaultValue={
                          AdminSeoData != null && AdminSeoData.body_script
                        }
                        render={({ onChange, value }) => (
                          <textarea
                            className="form-control"
                            placeholder="Body Script"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.body_script && trans("Body Script is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        <h6 className="mb-0">{trans("Robots Meta")} *</h6>
                      </Label>
                      <Controller
                        control={control}
                        name="robots_meta"
                        rules={{ required: true }}
                        key={AdminSeoData != null && AdminSeoData.robots_meta}
                        defaultValue={
                          AdminSeoData != null && AdminSeoData.robots_meta
                        }
                        render={({ onChange, value }) => (
                          <textarea
                            className="form-control"
                            placeholder="Robots Meta Tag"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.robots_meta && trans("Robots Meta is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        <h6 className="mb-0">{trans("Canonical Url")} *</h6>
                      </Label>
                      <Controller
                        control={control}
                        name="canonical_url"
                        rules={{ required: true }}
                        key={AdminSeoData != null && AdminSeoData.canonical_url}
                        defaultValue={
                          AdminSeoData != null && AdminSeoData.canonical_url
                        }
                        render={({ onChange, value }) => (
                          <textarea
                            className="form-control"
                            placeholder="Canonical Url"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.canonical_url &&
                          trans("Canonical Url is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="primary" disabled={loading === true}>
                    {loading === true && (
                      <Spinner
                        animation="border"
                        style={{
                          height: 15,
                          width: 15,
                          marginTop: 2,
                          marginRight: 4,
                        }}
                      />
                    )}
                    {trans("Submit form")}
                  </Button>
                </Form>
              {/* </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(AdminSeo);
