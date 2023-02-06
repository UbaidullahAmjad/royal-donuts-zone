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
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";


const SupplierAdmin = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const [admin, setAdmin] = useState([]);

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/admins`,
      data: data,
    })
      .then((response) => {
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
      })
      .catch((error) => {
        if (Object.keys(error.response.data.errors)[0] == "email") {
          const value = Object.keys(error.response.data.errors)[0];
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
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/admins/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setAdmin(response.data.roles);
    };
    getData();
  }, []);

  const goBack = ()=>{
    
    navigate(`/homeSettings/Role-Management/RoleManagement/RD`);
  }

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
                        {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{Email} *</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter Email")}
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
                        {trans(Password)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder={trans("Enter Password")}
                        innerRef={
                          register({
                            required: true,
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

export default translate(SupplierAdmin);
