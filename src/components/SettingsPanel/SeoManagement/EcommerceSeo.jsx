/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  EcommerceSeoGetDataAction,
  EcommerceSeoSaveDataAction,
} from "../../../redux/SettingsPanel/SeoManagement/EcommerceSeo/actions";

const EcommerceSeo = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);

  const [EccomerceSeoData, setEccomerceSeoData] = useState(null);
  const [ContentMetaHead, setContentMetaHead] = useState(null);
  const [ContentMetaTitle, setContentMetaTitle] = useState(null);
  const [contentMetaDescription, setContentMetaDescription] = useState(null);
  const [contentBodyScript, setContentBodyScript] = useState(null);
  const [contentRobotsMeta, setContentRobotsMeta] = useState(null);
  const [contentCanonicalUrl, setContentCanonicalUrl] = useState(null);

  const EccomSeoData = useSelector((state) => state.getEcommerceSeo);

  useEffect(() => {
    if (EccomSeoData?.ecommerceSeo == null) {
      dispatch(EcommerceSeoGetDataAction())
    }
    if (EccomSeoData.ecommerceSeoLength != EccomSeoData.tempArrLength) {
      dispatch(EcommerceSeoGetDataAction())
    }
  }, [EccomSeoData?.tempArrLength]);

  useEffect(() => {
    setEccomerceSeoData(EccomSeoData?.ecommerceSeo)

    setContentMetaHead(EccomSeoData.ecommerceSeo != null
      && EccomSeoData.ecommerceSeo?.head ? EccomSeoData.ecommerceSeo?.head : "");
    setContentMetaTitle(EccomSeoData.ecommerceSeo != null
      && EccomSeoData.ecommerceSeo?.meta_title ? EccomSeoData.ecommerceSeo?.meta_title : "");
  }, [EccomSeoData?.tempArrLength])

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
    const form_Data = new FormData();
    form_Data.append("head", data.head);
    form_Data.append("meta_title", data.meta_title);
    form_Data.append("meta_description", data.meta_description);
    form_Data.append("body_script", data.body_script);
    form_Data.append("robots_meta", data.robots_meta);
    form_Data.append("canonical_url", data.canonical_url);

    dispatch(EcommerceSeoSaveDataAction(form_Data, trans))
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("SEO")} title={trans("Ecommerce SEO")} /> */}
      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
      {/* <CardHeader>
                <div className="d-flex justify-content-between align-items-center w">
                  <h5>{trans("Ecommerce SEO Form")}</h5>
                </div>
              </CardHeader> */}
      {/* <CardBody> */}
      {/* <CardHeader className="p-0 pb-4 mb-4">
        <h5>{trans("Ecommerce SEO")}</h5>
      </CardHeader> */}
      <Form
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-row">
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Header")} <span className="text-danger">*</span>
              </h6>
            </Label>
            <Input
              className="form-control"
              name="head"
              type="textarea"
              // placeholder={trans("SEO Header")}
              innerRef={register({
                required: true,
                // maxLength: 30,
              })}
              defaultValue={ContentMetaHead ? ContentMetaHead : ""}
              key={ContentMetaHead ? ContentMetaHead : ""}
              style={{ minHeight: 60 }}
            />
            <span className="text-danger">
              {errors.head && trans("field is required")}
              {/* {errors.head?.type == "maxLength" && trans("Maximum Length: ") + "30"} */}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Meta Title")} <span className="text-danger">*</span>
              </h6>
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
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Meta Description")}{" "}
                <span className="text-danger">*</span>
              </h6>
            </Label>
            <Controller
              control={control}
              name="meta_description"
              rules={{ required: true }}
              key={EccomerceSeoData != null && EccomerceSeoData.meta_description}
              defaultValue={
                EccomerceSeoData != null && EccomerceSeoData.meta_description
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
              {errors.meta_description && trans("Meta Description is required")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Body Script")} <span className="text-danger">*</span>
              </h6>
            </Label>
            <Controller
              control={control}
              name="body_script"
              rules={{ required: true }}
              key={EccomerceSeoData != null && EccomerceSeoData.body_script}
              defaultValue={EccomerceSeoData != null && EccomerceSeoData.body_script}
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
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Robots Meta")} <span className="text-danger">*</span>
              </h6>
            </Label>
            <Controller
              control={control}
              name="robots_meta"
              rules={{ required: true }}
              key={EccomerceSeoData != null && EccomerceSeoData.robots_meta}
              defaultValue={EccomerceSeoData != null && EccomerceSeoData.robots_meta}
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
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              <h6 className="mb-0">
                {trans("Canonical Url")} <span className="text-danger">*</span>
              </h6>
            </Label>
            <Controller
              control={control}
              name="canonical_url"
              rules={{ required: true }}
              key={EccomerceSeoData != null && EccomerceSeoData.canonical_url}
              defaultValue={EccomerceSeoData != null && EccomerceSeoData.canonical_url}
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
              {errors.canonical_url && trans("Canonical Url is required")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
        </div>
        <Button color="success" disabled={loading === true}>
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
          {trans("Save")}
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

export default EcommerceSeo;