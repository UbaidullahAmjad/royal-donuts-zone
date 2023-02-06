/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
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
} from "../../../../constant/index";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import SweetAlert from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  AssociateRuleCreateAction,
} from "../../../../redux/SettingsPanel/OrderManagement/AssociateRules/actions";

const CreateSupplierAssociateRule = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [backBtn, setBackBtn] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [rules, setRules] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("store", data.store);
    formData.append("supplier", data.supplier);
    formData.append("rule", data.rule);

    dispatch(AssociateRuleCreateAction(formData, trans))
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/associate_rule/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setStores(response.data.stores)
      setRules(response.data.rule);
      setSupplier(response.data.supplier);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create Associated Rule")}
        parent={trans("Supplier") + " & " + trans("Rules")}
        title={trans("Associated Rules")}
        subtitle={trans("Create")}
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
                        {trans("Name of Store")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="store"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        {stores !== [] &&
                          stores.map((item) => {
                            return <option value={item.id}>{item.name_fr}</option>;
                          })}
                      </Input>
                      <span style={{ color: "#E33545" }}>
                        {errors.store && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(supplierName)}{" "}
                        <span className="text-danger">*</span>
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
                      <span style={{ color: "#E33545" }}>
                        {errors.supplier && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(RuleName)} <span className="text-danger">*</span>
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
                      <span style={{ color: "#E33545" }}>
                        {errors.rule && trans("field is required")}
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

export default CreateSupplierAssociateRule;
