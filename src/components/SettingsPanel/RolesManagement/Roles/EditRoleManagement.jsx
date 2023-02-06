/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
import { useHistory, useParams, useNavigate } from "react-router-dom";
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
import { useDispatch, } from "react-redux";
import {
  RoleEditAction
} from "../../../../redux/SettingsPanel/RolesManagement/Roles/actions";

const EditRoleManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const id = params.idd;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [roleHasPermissions, setHasPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  var permissionKeys = Object.keys(roleHasPermissions);

  const onSubmit = (data) => {
    const permissions = [];
    data.permission.map((item) => permissions.push(item));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("permission", JSON.stringify(permissions));
    formData.append("_method", "PATCH");

    dispatch(RoleEditAction(formData, id, trans))
  };

  const goBack = () => {
    navigate("/homeSettings/Role-Management/RoleManagement");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/role/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setPermissions(divideArray(response.data.permission, 3));
      setHasPermissions(response.data.rolehaspermissions);
      setRole(response.data.role);
    };
    getData();
  }, []);

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
      <Breadcrumb parent={trans("Manage Role")} title={trans("Edit Role")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Create New Role")}</h5>
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
                        key={role != null ? role.name : ""}
                        defaultValue={role != null ? role.name : ""}
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
                      {permissions.length > 0 &&
                        permissions[0].map((item) => {
                          let checkedStatus = false;
                          {
                            permissionKeys.map((key) => {
                              if (item.id == parseInt(key)) {
                                return (checkedStatus = true);
                              } else {
                                return false;
                              }
                            });
                          }
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item.id}
                                type="checkbox"
                                value={item.id}
                                key={checkedStatus}
                                defaultChecked={checkedStatus}
                                onChange={() => {
                                  checkedStatus = !checkedStatus;
                                }}
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
                      {permissions.length > 0 &&
                        permissions[1].map((item2) => {
                          let checkedStatus = false;
                          {
                            permissionKeys.map((key) => {
                              if (item2.id == parseInt(key)) {
                                return (checkedStatus = true);
                              } else {
                                return false;
                              }
                            });
                          }
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item2.id}
                                type="checkbox"
                                value={item2.id}
                                defaultChecked={checkedStatus}
                                key={checkedStatus}
                                onChange={() => {
                                  checkedStatus = !checkedStatus;
                                }}
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
                      {permissions.length > 0 &&
                        permissions[2].map((item3) => {
                          let checkedStatus = false;
                          {
                            permissionKeys.map((key) => {
                              if (item3.id == parseInt(key)) {
                                return (checkedStatus = true);
                              } else {
                                return false;
                              }
                            });
                          }
                          return (
                            <div className="checkbox checkbox-dark m-squar">
                              <Input
                                id={"inline-sqr-" + item3.id}
                                type="checkbox"
                                value={item3.id}
                                defaultChecked={checkedStatus}
                                key={checkedStatus}
                                onChange={() => {
                                  checkedStatus = !checkedStatus;
                                }}
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

export default EditRoleManagement;
