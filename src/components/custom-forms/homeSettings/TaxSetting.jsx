/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
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
import { curserSec, underTitle, Image, Title } from "../../../constant/index";

import { URL } from "../../../env";
import Instagram from "../../Instagram/instagram";

import { useTranslation, } from "react-i18next";

const TaxSetting = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const [TaxData, setTaxData] = useState(null);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const getTax = async () => {
    const response = await axios.post(`${URL}/tax`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    const tax = response.data.data.tax;
    setTaxData(tax);
  };

  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append("tax", data.tax);

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/tax`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    getTax();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Home Settings")} title={trans("Tax")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Tax")}</Label>
                      <Input
                        className="form-control"
                        name="tax"
                        type="number"
                        key={TaxData != null && TaxData}
                        defaultValue={TaxData != null && TaxData}
                        placeholder={trans("Add Tax")}
                        innerRef={register({
                          required: true,
                          min: 1,
                          max: 100,
                        })}
                      />
                      <span>
                        {errors.tax?.type == "required" &&
                          trans("field is required")}
                        {errors.tax?.type == "min" &&
                          trans("Minumum Length: ") + "1"}
                        {errors.tax?.type == "max" &&
                          trans("Maximum Length: ") + "100"}
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

export default TaxSetting;
