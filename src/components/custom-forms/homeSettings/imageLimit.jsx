/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
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
import Instagram from "../../Instagram/instagram";

import { translate } from "react-switch-lang";
import { useNavigate, Redirect } from "react-router-dom";

const ImageLimit = (props) => {
  const trans = props.t;

  const [InstagramToken, setInstagramToken] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const getInstagramToken = async () => {
    const response = await axios.get(`${URL}/gethomeimages`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("response_imageLimit: ", response);
    const token = response.data.data[0].token;
    setInstagramToken(token);
    console.log("response_imageLimit_token: ", token);
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    const formData = new FormData();
    formData.append("token", data.token);
    if (data.token === null) {
      formData.append("token", "");
    } else {
      formData.append("token", data.token);
    }
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/homeimages`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        getInstagramToken();
        window.location.reload();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    getInstagramToken();
  }, [getInstagramToken, onSubmit]);

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Home Settings")} title={trans("HomeImages")} /> */}
      <CardHeader className="p-0 pb-4 mb-4 d-flex" >
                 <Col md='12'>
                  <h5 >
                    {trans("Instagram Images")}
                  </h5>
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
                        key={InstagramToken != null ? InstagramToken : ""}
                        defaultValue={InstagramToken != null ? InstagramToken  : ""}
                        placeholder={trans("Add Instagram Token")}
                        innerRef={register({ required: false })}
                      />
                      <span>
                        {errors.address && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Save")}</Button>
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
                <Instagram instagramToken={InstagramToken} />
              {/* </CardBody>
            </Card> */}
          </Col>
        {/* </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(ImageLimit);
