/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
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
import { curserSec, underTitle, Image, Title } from "../../../constant/index";
import { URL } from "../../../env";
import Instagram from "../../../components/Instagram/instagram";
import { useTranslation, } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  InstagramGetDataAction,
  InstagramSaveDataAction
} from "../../../redux/Pages/Cms/HomeSettings/Instagram/actions";

const ImageLimit = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  // const [InstagramToken, setInstagramToken] = useState(null);
  const InstagramToken = useSelector((state) => state.getInstagramToken);

  const navigate = useNavigate();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("token", data.token);
    if (data.token === null) {
      formData.append("token", "");
    } else {
      formData.append("token", data.token);
    }

    dispatch(InstagramSaveDataAction(formData, trans))
  };

  useEffect(() => {
    if (InstagramToken?.instagramToken == null) {
      dispatch(InstagramGetDataAction())
    }
    if (InstagramToken && InstagramToken.instagramTokenLength != InstagramToken.tempArrLength) {
      dispatch(InstagramGetDataAction())
    }
  }, [InstagramToken]);

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Home Settings")} title={trans("HomeImages")} /> */}
      <CardHeader className="p-0 pb-4 mb-4 d-flex">
        <Col md="12">
          <h5>{trans("Instagram Images")}</h5>
        </Col>
      </CardHeader>
      {/* <Container fluid={true}>
        <Row> */}
      <Col sm="12">
        {/* <Card>
              <CardBody> */}
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <Col md="12 mb-3">
              {/* <Label htmlFor="validationCustom02">
                        {trans("Instagram Token")}
                      </Label> */}
              <Input
                className="form-control"
                name="token"
                type="text"
                key={InstagramToken?.instagramToken != null ? InstagramToken?.instagramToken : ""}
                defaultValue={InstagramToken?.instagramToken != null ? InstagramToken?.instagramToken : ""}
                placeholder={trans("Add Instagram Token")}
                innerRef={register({ required: false })}
              />
              <span>{errors.address && trans("field is required")}</span>
              <div className="valid-feedback">{trans("Looks good!")}</div>
            </Col>
          </div>
          <Button color="success">{trans("Save")}</Button>
        </Form>
        {/* </CardBody>
            </Card> */}
      </Col>
      <Col sm="12 my-4">
        {/* <Card>
              <CardBody> */}
        <p style={{ fontWeight: 600, fontSize: 18 }}>
          Instagram {trans("HomeImages")}
        </p>
        <Instagram instagramToken={InstagramToken?.instagramToken} />
        {/* </CardBody>
            </Card> */}
      </Col>
      {/* </Row>
      </Container> */}
    </Fragment>
  );
};

export default ImageLimit;
