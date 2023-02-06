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
import { createNewRole, Name } from "../../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, } from "react-redux";
import {
  RoleCreateAction
} from "../../../../redux/SettingsPanel/RolesManagement/Roles/actions";

const CreateRoleManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const [RolePermission, setRolePermission] = useState([]);

  const onSubmit = (data) => {
    const permissions = [];
    const form_data = new FormData();
    data.permission.map((item) => permissions.push(item));
    form_data.append("name", data.name);
    form_data.append("permission", JSON.stringify(permissions));

    dispatch(RoleCreateAction(form_data, trans))
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios
        .get(`${URL}/role/create`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          // setRolePermission(response.data.message);
          setRolePermission(divideArray(response.data.message, 3));
        })
        .catch((error) => {
          console.log("ERROr -------", error);
        });
    };
    getData();
  }, []);

  const goBack = () => {
    navigate("/homeSettings/Role-Management/RoleManagement");
  };

  const divideArray = (arr, size) => {
    return arr.reduce((acc, val, ind) => {
      const subIndex = ind % size;
      if (!Array.isArray(acc[subIndex])) {
        acc[subIndex] = [val];
      } else {
        acc[subIndex].push(val);
      }
      return acc;
    }, []);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create New Role")}
        parent={trans("Manage Role")}
        title={trans("Create Role")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                {/* <h5>{trans("Create New Role")}</h5> */}
                <h5></h5>
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

                      <span>
                        {errors.name?.type == "required" &&
                          trans("name is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="4 mb-3 pl-4 px-2">
                      {RolePermission.length > 0 &&
                        RolePermission[0].map((item) => {
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item.id}
                                type="checkbox"
                                value={item.id}
                                name="permission"
                                innerRef={register({ required: true })}
                              />
                              <Label for={"inline-sqr-" + item.id}>
                                {trans(item.name)}
                              </Label>
                            </div>
                          );
                        })}
                    </Col>
                    <Col md="4 mb-3 pl-4 px-2">
                      {RolePermission.length > 0 &&
                        RolePermission[1].map((item2) => {
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item2.id}
                                type="checkbox"
                                value={item2.id}
                                name="permission"
                                innerRef={register({ required: true })}
                              />
                              <Label for={"inline-sqr-" + item2.id}>
                                {trans(item2.name)}
                              </Label>
                            </div>
                          );
                        })}
                    </Col>
                    <Col md="4 mb-3 pl-4 px-2">
                      {RolePermission.length > 0 &&
                        RolePermission[2].map((item3) => {
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item3.id}
                                type="checkbox"
                                value={item3.id}
                                name="permission"
                                innerRef={register({ required: true })}
                              />
                              <Label for={"inline-sqr-" + item3.id}>
                                {trans(item3.name)}
                              </Label>
                            </div>
                          );
                        })}
                    </Col>
                    {errors.permission?.type == "required" && (
                      <span className="text-danger mt-1 mb-3">
                        {trans("permission is required")}
                      </span>
                    )}
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

export default CreateRoleManagement;
