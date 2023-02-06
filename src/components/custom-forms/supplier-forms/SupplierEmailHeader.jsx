import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Accordion, useAccordionButton } from "react-bootstrap";

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

import { useEffect } from "react";
import { useState } from "react";

import CKEditors from "react-ckeditor-component";

import { URL } from "../../../env";
import { useNavigate, useParams } from "react-router-dom";

import { translate } from "react-switch-lang";

const SupplierEmailHeader = (props) => {
  const trans = props.t;
  const params = useParams();

  const navigate = useNavigate();

  const [EmailHeader, setEmailHeader] = useState(null);

  const [content, setContent] = useState(null);
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    // console.log("NEWWWW", newContent);
    setContent(newContent);
    if (newContent == "" || newContent == "" || newContent == null) {
      setValue("description", "");
    } else {
      setValue("description", newContent);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ shouldFocusError: true });;

  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const form_data = new FormData();
    if (params.idd != undefined) {
      form_data.append("id", params.idd);
      form_data.append("description", data.description);
      axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
        url: `${URL}/edithead`,
        data: form_data,
      }).then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/homeSettings/Order-Management/OrderManagement/RD");
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    }

    // e.preventDefault();
    // if (data !== "") {
    //   alert("You submitted the form and stuff!");
    // } else {
    //   errors.showMessages();
    // }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/getheader/${params.idd}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setEmailHeader(response.data.supplier);
      setContent(response.data.supplier.header);
    };
    getData();
  }, []);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <button
        type="button"
        className="btn btn-link"
        color="default"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Email Header")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Email Header")}</h5>
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
                        {trans("Email Header")}
                      </Label>
                      <Controller
                        as={CKEditors}
                        control={control}
                        name="description"
                        rules={{ required: true }}
                        activeclassName="p10"
                        content={content}
                        events={{
                          change: onChange,
                        }}
                        key={EmailHeader != null && EmailHeader.header}
                        defaultValue={EmailHeader != null && EmailHeader.header}
                      />
                      <span>
                        {errors.description && trans("field is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col sm="12" xl="12" className="mb-2">
                      <Accordion defaultActiveKey="0">
                        <div className="default-according" id="accordion">
                          <Card>
                            <CardHeader>
                              <h4 className="mb-0">
                                <CustomToggle eventKey="0">
                                  {trans("Short Codes")}
                                </CustomToggle>
                              </h4>
                            </CardHeader>
                            <Accordion.Collapse eventKey="0">
                              <CardBody>
                                <h6>{trans("Supplier")}</h6>
                                <p>
                                  {"{suplier_name}"} , {"{mobile_number}"} ,{" "}
                                  {"{address}"} , {"{email}"}
                                </p>
                                <h6>{trans("Order")}</h6>
                                <p>
                                  {"{total}"}, {"{order_number}"}
                                </p>
                                <h6>{trans("Customer")}</h6>
                                <p>
                                  {"{customer_name}"} ,{"{customer_city}"}
                                </p>
                              </CardBody>
                            </Accordion.Collapse>
                          </Card>
                        </div>
                      </Accordion>
                    </Col>
                  </div>
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

export default translate(SupplierEmailHeader);
