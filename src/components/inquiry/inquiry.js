import React, { Fragment, useEffect, useState } from "react";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Breadcrumb from "../../layout/breadcrumb";
import { translate } from "react-switch-lang";
import CurrentForm from "./currentForm";
import FormHistory from "./formHistory";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Inquiry = (props) => {
  const trans = props.t;
  const [pillTab, setpillTab] = useState("1");
  const [formStatus, setFormStatus] = useState(false);
  const [formStage, setFormStage] = useState(null);
  const [prevForm, setPrevForm] = useState(null);

  const location = useLocation();
  let user_id = atob(localStorage.getItem("user_id"));

  const lastForm = async () => {
    const response = await axios.get(
      `https://ecco.royaldonuts.xyz/api/leadhistory`,
      { params: { id: user_id } }
    );
    const data = response.data.data;
    const lastHistory = data[0].status;
    console.log("last form status", lastHistory);
    setPrevForm(lastHistory);
  };

  useEffect(() => {
    if (location.state !== undefined) {
      console.log("valuue", location.state);
      setpillTab(location.state.tabValue);
    }
    lastForm();
  }, []);

  const setCurrentForm = () => {
    setpillTab("1");
    lastForm();
  };

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Lead")} title={trans("Current Form")} />

        <Container fluid={true}>
          <Row>
            <Col sm="12 p-0">
              <Card>
                {/* <CardHeader >
                                <Row className = 'd-flex justify-content-between px-2'>
                                    <Col sm='6'>
                                        <span>
                                            <b>Name:</b> username
                                        </span>
                                    </Col>
                                    <Col sm='4'>
                                        <Input 
                                            className="form-control"
                                            // name="ftype"
                                            type="select"
                                            // onChange={onHandleChange}
                                        >
                                            <option selected="true" value="Lead" disabled>
                                                {"Lead"}
                                            </option>
                                        </Input>
                                    </Col>
                                </Row>
                                </CardHeader> */}

                <CardBody>
                  <Nav className="nav-pills d-flex justify-content-center mb-2 align-items-center">
                    <NavItem className="col-6 p-0">
                      <NavLink
                        id="1"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        className={pillTab === "1" ? "active" : ""}
                        onClick={() => setCurrentForm()}
                      >
                        {trans("Current Form")}
                      </NavLink>
                    </NavItem>
                    <NavItem className="col-6 p-0">
                      <NavLink
                        id="2"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        className={pillTab === "2" ? "active" : ""}
                        onClick={() => setpillTab("2")}
                      >
                        {trans("Form History")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={pillTab}>
                    <TabPane className="fade show" tabId="1">
                      {formStatus == true || prevForm == "Pending" ? (
                        <Row>
                          <Col sm="12">
                            <Card className="d-flex justify-content-center">
                              <CardBody>
                                <Row className="justify-content-center">
                                  <Col sm="4">
                                    <Card>
                                      <CardBody className="d-flex justify-content-center">
                                        <span className="text-center">
                                          <b>{trans("Form Submitted")}</b>
                                          <br />
                                          {prevForm != null && trans(prevForm)}
                                          <br />
                                          {trans("Waiting for approval")}
                                        </span>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      ) : (
                        <CurrentForm
                          setFormStatus={setFormStatus}
                          lastForm={lastForm}
                        />
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      <FormHistory formStatus={formStatus} />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(Inquiry);
