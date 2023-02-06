/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Input,
  Col,
} from "reactstrap";
import { useTranslation, } from "react-i18next";
import { SIMPLE_URL, URL } from "../../env";

const FormHistory = (props) => {
  const { formStatus } = props;
  const { t } = useTranslation();
  const trans = t;
  const [formsData, setFormsData] = useState([]);
  const [formDetail, setFormDetail] = useState([]);
  const [Large, setLarge] = useState(false);
  let user_id = atob(localStorage.getItem("user_id"));

  const LargeModalToggle = () => setLarge(!Large);

  const getData = async (id, submission) => {
    setFormDetail([]);
    const response = await axios.get(`${URL}/viewformbylead`, {
      params: { user_id: user_id, form_id: id },
    });
    // headers: {
    //   Authorization: "Bearer " + localStorage.getItem("token123"),
    // },
    const response_data = response.data.data;
    const form_data_response = response.data.data.findIndex((item) =>
      item.field_data.find(
        (item2) =>
          item2.created_at.split(":")[0] + item2.created_at.split(":")[1] ==
          submission.split(":")[0] + submission.split(":")[1]
      )
    );
    const form_data = response.data.data[form_data_response].field_data.find(
      (item) =>
        item.created_at.split(":")[0] + item.created_at.split(":")[1] ==
        submission.split(":")[0] + submission.split(":")[1]
    );
    const form_data_field = [];
    form_data_field.push(form_data);
    response_data[form_data_response].field_data = form_data_field;
    setFormDetail(response_data);
  };

  const getDetails = async () => {
    const response = await axios.get(`${URL}/leadhistory`, {
      params: { id: user_id },
    });
    setFormsData(response.data.data);
  };
  // useEffect(() => {
  //   getDetails();
  // }, [])

  useEffect(() => {
    getDetails();
  }, [formStatus]);

  const viewDetail = (id, submission) => {
    getData(id, submission);
    LargeModalToggle();
  };

  return (
    <>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} scope="col">
              {trans("STAGE")}
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              {trans("STATUS")}
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              {trans("SUBMISSION DATE")}
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              {trans("ACTION")}
            </th>
          </tr>
        </thead>
        <tbody>
          {formsData !== [] &&
            formsData.map((item) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>{item.stage.name}</td>

                  {item.status === "Pending" && (
                    <td style={{ textAlign: "center" }}>{trans("Pending")}</td>
                  )}
                  {item.status === "Approved" && (
                    <td style={{ textAlign: "center" }}>{trans("Approved")}</td>
                  )}
                  {item.status === "Rejected" && (
                    <td style={{ textAlign: "center" }}>{trans("Rejected")}</td>
                  )}

                  <td style={{ textAlign: "center" }}>
                    {item.submission.split("T")[0]}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => viewDetail(item.form_id, item.submission)}
                    >
                      <i className="fa fa-eye"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          <Modal isOpen={Large} toggle={LargeModalToggle}>
            <ModalHeader toggle={LargeModalToggle}>
              {trans("FORM DETAIL")}
            </ModalHeader>
            <ModalBody>
              <form
                // name={Form !== null && Form.name}
                className="needs-validation d-flex flex-column align-items-center justify-content-center"
                noValidate=""
              >
                {" "}
                {formDetail !== [] &&
                  formDetail
                    .sort((a, b) => a.field.field_type - b.field.field_type)
                    .sort((z, x) => z.field.field_name - x.field.field_name)
                    .map((item) => {
                      return item.field.field_type == 5 ||
                        item.field.field_type == 6 ? (
                        <Col
                          md="12 mb-3"
                          key={item.id}
                          style={{ marginLeft: 35 }}
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
                                  src={
                                    SIMPLE_URL +
                                    `/images/CRM/${item.field_data[0].field_value}`
                                  }
                                ></img>
                              </div>
                            </Col>
                          )}
                        </Col>
                      );
                    })}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={LargeModalToggle}>
                {trans("Close")}
              </Button>
            </ModalFooter>
          </Modal>
        </tbody>
      </table>
    </>
  );
};

export default FormHistory;
