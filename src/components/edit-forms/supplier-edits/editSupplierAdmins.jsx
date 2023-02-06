import React, { Fragment, useEffect, useState } from "react";
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
import { Admin, Email, Name, Password, Role } from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const EditSupplierAdmins = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();
  const id = params.idd;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [admin, setAdmin] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [backBtn, setBackBtn] = useState(false)

  const accessAdmin = "adm";
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("adm", "adm");
    if (
      data.password != "" &&
      data.password != undefined &&
      data.password != null
    ) {
      formData.append("password", data.password);
    }
    formData.append("user_type", data.user_type);
    formData.append("_method", "PATCH");

    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/admins/${id}`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBackBtn(true)
      } else {
        if (response.data.type == "email") {
          setError(
            "email",
            {
              type: "string",
              message: trans("Email_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Email_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  };

  const goBack = ()=>{
    navigate(`/homeSettings/Role-Management/RoleManagement/RD`);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/admins/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setAdmin(response.data.admin);
      setRoles(response.data.roles);
      setAdminRole(response.data.role);
    };
    getData();
  }, []);

  console.log("admin", admin);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Manage Role")} title={trans("Edit Admin")} />

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
                        key={admin != null && admin.name}
                        defaultValue={admin != null && admin.name}
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
                      <Label htmlFor="validationCustom02">{trans(Email)} *</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
                        key={admin != null && admin.email}
                        defaultValue={admin != null && admin.email}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                          })
                        }
                      />
                      <span className="text-danger">
                      {errors.email?.type == "required" && trans("field is required")}
                        {errors.email?.type == "maxLength" && trans("Maximum Length: ") + "30. "
                        }
                        {/* { errors.email?.type == "pattern" && trans("Please write numeric values")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <input
                        type="hidden"
                        name={accessAdmin}
                        value={accessAdmin}
                      ></input>
                      <Label htmlFor="validationCustom02">{trans(Role)} *</Label>
                      <Input
                        className="form-control"
                        name="user_type"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected="true" value="" disabled>
                          {trans("Select")}
                        </option>
                        {roles !== [] &&
                          roles.map((item) => {
                            return (
                              <option
                                value={item.id}
                                selected={
                                  adminRole !== null && adminRole.id == item.id
                                }
                              >
                                {item.name}
                              </option>
                            );
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
                        {trans(Password)}
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        innerRef={
                          register({
                            required: false,
                            maxLength: 30,
                          })
                        }
                      />
                       <span>
                       {errors.password?.type == "required" && trans("field is required")}
                        {errors.password?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                  
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

export default translate(EditSupplierAdmins);
