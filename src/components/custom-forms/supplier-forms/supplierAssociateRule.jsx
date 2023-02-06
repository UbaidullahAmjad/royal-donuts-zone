import React, { Fragment } from "react";
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
import {
  customerName,
  supplierName,
  RuleName,
  associateRule,
} from "../../../constant/index";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import SweetAlert from "sweetalert2";

const SupplierAssociateRule = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [backBtn, setBackBtn] = useState(false)
  const [supplier, setSupplier] = useState([]);
  const [rules, setRules] = useState([]);
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/associate_rule`,
      data: data,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      setBackBtn(true)
      } else {
        SweetAlert.fire({
          title: false,
          text: trans(response.data.message),
          icon: "error",
          showCancelButton: false,
          confirmButtonText: trans("OK"),
          reverseButtons: true,
        })
        // toast.error(trans("failed"), {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/associate_rule/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("respss", response);
      setCustomer(response.data.customer);
      setRules(response.data.rule);
      setSupplier(response.data.supplier);
    };
    getData();
  }, []);

  const goBack = ()=>{
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  }
  
  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Supplier")}
        title={trans("Create Associated Rule")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className="d-flex justify-content-between">
                <h5>{trans(associateRule)}</h5>
               <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(customerName)}
                      </Label>
                      <Input
                        className="form-control"
                        name="customer"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        {customer !== [] &&
                          customer.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                      </Input>
                      <span>
                        {errors.customer && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(supplierName)}
                      </Label>
                      <Input
                        className="form-control"
                        name="supplier"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        {supplier !== [] &&
                          supplier.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                      </Input>
                      <span>
                        {errors.supplier && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(RuleName)}
                      </Label>
                      <Input
                        className="form-control"
                        name="rule"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        {rules !== [] &&
                          rules.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                      </Input>
                      <span>{errors.rule && trans("field is required")}</span>
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

export default translate(SupplierAssociateRule);
