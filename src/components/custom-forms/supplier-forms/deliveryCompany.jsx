import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import axios from "axios";
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
import {
  minOrderAmount,
  deliveryCompany,
  deliveryFee,
  Name,
} from "../../../constant/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
const DeliveryCompany = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: "https://ecco.royaldonuts.xyz/api/deliverycompany",
      data: data,
    })
      .then((response) => {
        console.log("RESPOJNSE DELIVERY COMP----", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true) 
        } else {
         
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          errors.showMessages();
        }
      })
      .catch((error) => {
        // console.log("DELIVERY COMP ERROR --- ", error.response.data);
     
        if (Object.keys(error.response.data.errors)[0] == "name") {
          setError(
            "name",
            {
              type: "string",
              message: trans(error.response.data.errors.name),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans(error.response.data.errors.name), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/deliverycompany/create`, {
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
      <Breadcrumb
        parent={trans("Supplier")}
        title={trans("Create Delivery Company")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Delivery Companies")}</h5>
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
                      <Label htmlFor="validationCustom02">{trans(Name)} *</Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }

                      />
                      <span>
                       {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(minOrderAmount) + " €"} *
                      </Label>
                      <Input
                        className="form-control"
                        name="minimum_order_amount"
                        type="number"                       
                        step="any"
                        placeholder={trans("Enter amount")}
                        innerRef={register({ required: true, maxLength: 16, pattern: /^[+]?\d+([.]\d+)?$/, })}
                      />
                      <span>
                        {errors.minimum_order_amount?.type == "required" &&
                          trans("field is required")}
                        {errors.minimum_order_amount?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.minimum_order_amount?.type == "pattern" && trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(deliveryFee) + " €"} *
                      </Label>
                      <Input
                        className="form-control"
                        name="delivery_fee"
                        type="number"
                        step="any"
                        placeholder={trans("Enter amount")}
                        innerRef={register({ required: true, maxLength: 16, pattern: /^[+]?\d+([.]\d+)?$/, })}
                      />
                      <span>
                        {errors.delivery_fee?.type == "required" && trans("field is required")}
                        {errors.delivery_fee?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.delivery_fee?.type == "pattern" && trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
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

export default translate(DeliveryCompany);
