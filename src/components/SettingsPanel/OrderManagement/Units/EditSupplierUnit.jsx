/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
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
import { unit, unitAbrreviation } from "../../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  UnitEditAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Units/actions";

const EditSupplierUnit = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const id = params.idd;

  const [unitData, setUnit] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("abbreviation", data.abbreviation);
    formData.append("_method", "PATCH");

    dispatch(UnitEditAction(formData, id, trans));
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/unit/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setUnit(response.data.unit);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Edit Unit")}
        parent={trans("Purchases") + " & " + trans("Supplies")}
        title={trans("Units")}
        subtitle={trans("Edit")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(unit)}</h5>
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
                        {trans(unit)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={unitData != null && unitData.name}
                        defaultValue={unitData != null && unitData.name}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" &&
                          trans("Please write alphanumeric values")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("French Abbreviation")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="abbreviation"
                        type="text"
                        key={unitData != null && unitData.abbreviation}
                        defaultValue={unitData != null && unitData.abbreviation}
                        innerRef={register({
                          required: true,
                          maxLength: 2,
                          pattern: /^.*[a-zA-Z]+.*$/,
                        })}
                      />
                      <span>
                        {errors.abbreviation?.type == "required" &&
                          trans("abbreviation is required")}
                        {errors.abbreviation?.type == "maxLength" &&
                          trans("Maximum Length: ") + "2"}
                        {errors.abbreviation?.type == "pattern" &&
                          "Only alphabets are allowed"}
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

export default EditSupplierUnit;
