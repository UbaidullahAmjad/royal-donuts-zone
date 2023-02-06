/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Media,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DataTable from "../../dataTable/dataTable";
import { translate } from "react-switch-lang";
import { URL, SIMPLE_URL } from "../../../env";

import { useForm } from "react-hook-form";

import { Controller } from "react-hook-form";

import Dropzone from "react-dropzone-uploader";

const FormLeadView = (props) => {
  const trans = props.t;
  const { leadData } = props;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [formLeadViewData, setFormLeadViewData] = useState([]);

  useEffect(() => {
    leadData.map((data) => console.log("dataaa", data));
    const data = leadData.map((data) => data);
    setFormLeadViewData(leadData);
    console.log("setFormLeadView", data);
  }, []);

  return (
    <div className="form_lead_view mb-3">
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="px-0">
            <Card>
              <CardBody className="px-1 pb-1 pt-2">
                {formLeadViewData !== [] &&
                  formLeadViewData
                    .sort((a, b) => a.field.field_type - b.field.field_type)
                    .sort((z, x) => z.field.field_name - x.field.field_name)
                    .map((item) => {
                      return item.field.field_type == 5 ||
                        item.field.field_type == 6 ? (
                        <Col
                          md="12 mb-3"
                          key={item.id}
                          style={{ marginLeft: 20 }}
                        >
                          <Input
                            readOnly
                            checked={
                              item.field.field_data !== null &&
                              item.field.field_label !== null &&
                              item.field_data.length > 0 &&
                              item.field_data[0].field_value ==
                                item.field.field_label
                                ? true
                                : false
                            }
                            name={
                              item.field.field_name !== null &&
                              item.field.field_name
                            }
                            type={
                              (item.field.field_type !== null &&
                                item.field.field_type === "1" &&
                                "text") ||
                              (item.field.field_type === "2" && "email") ||
                              (item.field.field_type === "3" && "number") ||
                              (item.field.field_type === "4" && "date") ||
                              (item.field.field_type === "5" && "checkbox") ||
                              (item.field.field_type === "6" && "radio") ||
                              (item.field.field_type === "9" && "textarea") ||
                              (item.field.field_type === "10" && "password")
                            }
                            // innerRef={register({ required: true })}
                          ></Input>
                          <Label htmlFor="validationCustom0222">
                            {item.field.field_label !== null &&
                              item.field.field_label}
                          </Label>
                        </Col>
                      ) : (
                        <Col md="12 mb-3" key={item.id}>
                          <Label htmlFor="validationCustom02">
                            {item.field.field_label !== null &&
                              item.field.field_label}
                          </Label>
                          {item.field.field_type !== "8" && (
                            <Input
                              readOnly
                              className={"form-control"}
                              value={
                                item.field.field_data !== null &&
                                item.field_data.length > 0 &&
                                item.field_data[0].field_value
                              }
                              name={
                                item.field.field_name !== null &&
                                item.field.field_name
                              }
                              type={
                                (item.field.field_type !== null &&
                                  item.field.field_type === "1" &&
                                  "text") ||
                                (item.field.field_type === "2" && "email") ||
                                (item.field.field_type === "3" && "number") ||
                                (item.field.field_type === "4" && "date") ||
                                (item.field.field_type === "5" && "checkbox") ||
                                (item.field.field_type === "6" && "radio") ||
                                (item.field.field_type === "9" && "textarea") ||
                                (item.field.field_type === "10" && "password")
                              }
                              // innerRef={register({ required: true })}
                            ></Input>
                          )}
                          {item.field.field_type === "8" && (
                            <Col md="12 mb-3">
                              <div className="d-flex justify-content-center">
                                <img
                                  style={{ width: "100px", height: "100px" }}
                                  src={`https://ecco.royaldonuts.xyz/images/CRM/${item.field_data[0].field_value}`}
                                ></img>
                              </div>
                            </Col>
                          )}
                        </Col>
                      );
                    })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default translate(FormLeadView);
