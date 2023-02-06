/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CKEditors from "react-ckeditor-component";
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
import { createNewRole, Name } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const EditRoleManagement = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();
  const id = params.idd;
  console.log(" this is id", id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });;

  const [roleHasPermissions, setHasPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState(null);
  const [backBtn, setBackBtn] = useState(false)
  var permissionKeys = Object.keys(roleHasPermissions);

  const onSubmit = (data) => {
    const permissions = [];
    data.permission.map((item) => permissions.push(item));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("permission", JSON.stringify(permissions));
    formData.append("_method", "PATCH");

    console.log("this is submitted data", data);
    axios({
      method: "post",
      url: `${URL}/role/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBackBtn(true)
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const goBack = () => {
    navigate("/homeSettings/Role-Management/RoleManagement/RD");
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/role/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setPermissions(response.data.permission);
      setHasPermissions(response.data.rolehaspermissions);
      setRole(response.data.role);
    };
    getData();
  }, []);

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
                      <Label htmlFor="validationCustom02">{trans(Name)} *</Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={role != null && role.name}
                        defaultValue={role != null && role.name}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />

                      <span>
                        {errors.name?.type == "required" && trans("name is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="4 mb-3 px-2">
                      {permissions !== [] &&
                        permissions.slice(0, 11).map((item) => {
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
                    <Col md="4 mb-3 px-2">
                      {permissions !== [] &&
                        permissions.slice(12, 23).map((item2) => {
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
                    <Col md="4 mb-3 px-2">
                      {permissions !== [] &&
                        permissions.slice(23).map((item3) => {
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
                    {
                      errors.permission?.type == "required" && <span className="text-danger mt-1 mb-3">
                        {trans("permission is required")}
                      </span>
                    }
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

export default translate(EditRoleManagement);
