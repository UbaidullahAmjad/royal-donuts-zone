import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
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
import { instaUser, frenchInstaUser } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";

const InstaUserName = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${URL}/instauser`,
      data: data,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/instauser`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Form" title={trans("Validation")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{trans(instaUser)}</h5>
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
                        {trans(frenchInstaUser)}
                      </Label>
                      <Input
                        className="form-control"
                        name="text"
                        type="text"
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <div>
                        <span>
                          {errors.text?.type == "required" &&
                            trans("field is required")}
                          {errors.text?.type == "maxLength" &&
                            trans("Maximum Length: ") + "30"}
                          {errors.text?.type == "pattern" &&
                            "Please write alphanumeric values"}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </div>
                      <Input
                        className="form-control"
                        name="id"
                        value="no_id"
                        type="hidden"
                        innerRef={register({ required: true })}
                      >
                        {" "}
                      </Input>
                      <span>
                        {errors.text && trans("username is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
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

export default InstaUserName;
