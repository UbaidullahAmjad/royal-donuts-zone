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
import { unit, unitAbrreviation } from "../../../constant/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL } from "../../../env";

const SupplierUnit = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false)
  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/unit`,
      data: data,
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
    }).catch
    ((error)=>{
      if(error.response.data.errors.abbreviation)
      {
      toast.error(trans(error.response.data.errors.abbreviation[0]), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if(error.response.data.errors.name)
    {
      toast.error(trans(error.response.data.errors.name[0]), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    })
  };

  const goBack = ()=>{
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  }


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/unit/create`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      console.log("resp", response);
    };
    getData();
  }, []);
  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Create Unit")} />

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
                      <Label htmlFor="validationCustom02">{trans(unit)} *</Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter unit")}
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
                        {trans("French Abbreviation")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="abbreviation"
                        type="text"
                        placeholder={trans("Enter abbreviation")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 2,
                            pattern: /^.*[a-zA-Z]+.*$/
                          })
                        }
                      />
                      <span>
                        {errors.abbreviation?.type == "required" && trans("abbreviation is required")}
                        {errors.abbreviation?.type == "maxLength" && trans("Maximum Length: ") + "2"}
                        {errors.abbreviation?.type == "pattern" && "Only alphabets are allowed"}
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

export default translate(SupplierUnit);
