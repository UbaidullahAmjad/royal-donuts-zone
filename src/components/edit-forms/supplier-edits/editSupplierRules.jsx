import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
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
  Rule,
  deliveryDays,
  AcceptanceTime,
  treatmentDay,
  Name,
  Role,
} from "../../../constant/index";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import { TypeAheadToggleButton } from "../../CustomComponents";

const EditSupplierRules = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const id = params.idd;

  const [deliveryDays, setDeliveryDays] = useState([]);
  const [rules, setRules] = useState();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const TypeHeadChanged = (data_selected) => {
    console.log("data_selecdddddddd", data_selected);
    if (data_selected.length == 0) {
      setValue("delivery", []);
      setDeliveryDays([]);
    } else {
      console.log("not empty");
      setValue("delivery", data_selected);
    }
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    var days_array = [];
    data.delivery.map((item, index) => days_array.push(item));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("acceptance", data.acceptance);
    formData.append("treatment", data.treatment);
    formData.append("delivery", JSON.stringify(days_array));
    formData.append("_method", "PATCH");

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/rule/${id}`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBackBtn(true);
      } else {
        if (
          response.data.error == true &&
          response.data.message == "Name must be unique"
        ) {
          setError(
            "name",
            {
              type: "string",
              message: trans("Name_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Name_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/rule/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setDeliveryDays(response.data.delivery_days_array);
      setRules(response.data.rule);
    };
    getData();
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Edit Rule")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(Rule)}</h5>
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
                        {trans(Name)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={rules != null && rules.name}
                        defaultValue={rules != null && rules.name}
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
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Acceptance Time")} *
                      </Label>
                      <Input
                        className="form-control digits"
                        type="time"
                        name="acceptance"
                        key={rules != null && rules.acceptance_time}
                        defaultValue={rules != null && rules.acceptance_time}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.acceptance && trans("time is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(treatmentDay)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="treatment"
                        type="number"
                        step="any"
                        key={rules != null && rules.treatment_time}
                        defaultValue={rules != null && rules.treatment_time}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.treatment?.type == "required" &&
                          trans("day is required")}
                        {errors.treatment?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
                        {errors.treatment?.type == "pattern" &&
                          trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Delivery Days")} *
                      </Label>
                      <Controller
                        control={control}
                        name="delivery"
                        key={deliveryDays.length > 0 ? deliveryDays : []}
                        rules={{ required: true }}
                        // innerRef={{"delivery", { required: true }}}
                        render={() => (
                          <Typeahead
                            className="typehead_form_control"
                            id="multiple-typeahead"
                            labelKey="name"
                            onChange={(selected) => TypeHeadChanged(selected)}
                            multiple
                            key={
                              deliveryDays.length > 0
                                ? deliveryDays.map((item) => {
                                    return item;
                                  })
                                : []
                            }
                            defaultSelected={
                              deliveryDays.length > 0
                                ? deliveryDays.map((item) => {
                                    return item;
                                  })
                                : []
                            }
                            options={days}
                          >
                            {({ isMenuShown, toggleMenu }) => (
                              <TypeAheadToggleButton
                                isOpen={isMenuShown}
                                onClick={(e) => toggleMenu()}
                              />
                            )}
                          </Typeahead>
                        )}
                      />
                      <span className="text-danger">
                        {errors.delivery && trans("field is required")}
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
export default translate(EditSupplierRules);
