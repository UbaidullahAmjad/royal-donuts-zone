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
import { Admin, Email, Name, Password, Role } from "../../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  SupplierAdminCreateAction
} from "../../../../redux/SettingsPanel/RolesManagement/SupplierAdmins/actions";

const CreateSupplierAdmin = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [admin, setAdmin] = useState([]);

  const onSubmit = (data) => {
    dispatch(SupplierAdminCreateAction(data, trans, setError));
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/admins/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setAdmin(response.data.roles);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/homeSettings/Role-Management/RoleManagement`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Manage Role")} title={trans("Create Admin")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(Admin)}</h5>
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
                        {trans(Name)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      {errors.name?.type == "required" &&
                        trans("field is required")}
                      {errors.name?.type == "maxLength" &&
                        trans("Maximum Length: ") + "30"}
                      {errors.name?.type == "pattern" &&
                        "Please write alphanumeric values"}
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {Email} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      <span className="text-danger">
                        {errors.email?.type == "required" &&
                          trans("field is required")}
                        {errors.email?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30. "}
                        {/* { errors.email?.type == "pattern" && trans("Please write numeric values")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Role)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="user_type"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected="true" value="" disabled>
                          {trans("Select")}
                        </option>
                        {admin !== [] &&
                          admin.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                      </Input>
                      <span>
                        {errors.user_type && trans("role is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Password)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder={trans("Enter Password")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      <span>
                        {errors.password?.type == "required" &&
                          trans("field is required")}
                        {errors.password?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
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

export default CreateSupplierAdmin;
