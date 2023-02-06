/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse,
} from "reactstrap";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import "./userDashboard.css";
import { translate } from "react-switch-lang";
import CurrentForm from "../inquiry/currentForm";
import { selectedGridRowsCountSelector } from "@mui/x-data-grid";

const UserDashboard = (props) => {
  const trans = props.t;

  const [user_detail, setUserDetail] = useState(null);
  const [userPermissions, setUserPermissions] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [leadLastFromSubmitted_Stage, setLeadLastFromSubmitted_Stage] =
    useState(null);

  let user_id = atob(localStorage.getItem("user_id"));

  const getLead_LastFormSubmitted = async () => {
    const response = await axios.get(
      `https://ecco.royaldonuts.xyz/api/leadhistory`,
      { params: { id: user_id } }
    );

    console.log("data response of history", response);
    const data = response.data.data;
    // const lead_data = data[data.length - 1];
    // console.log("response-history-lead-stage", lead_data);
    setLeadLastFromSubmitted_Stage(response.data.data[0]);
  };

  console.log("lead data", leadLastFromSubmitted_Stage);

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/admin/dashboard`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      console.log("data", response);
      setUserDetail(response.data);
      let rol = localStorage.getItem("role");
      let role = atob(rol);
      setUserRole(role);
      setUserName(localStorage.getItem("Name"));

      let permission = localStorage.getItem("permissions");
      let permissions = atob(permission);
      console.log("permission", permissions);
      console.log("rolleeee", role);
      let single = permissions.split(",").map((text) => text);

      setUserPermissions(single);

      (role === "Lead" ||
        role === "Qualified Lead" ||
        role === "Nigotiation in progress" ||
        role === "Signup in progress" ||
        role === "New Franchise" ||
        role === "Active Franchise") &&
        getLead_LastFormSubmitted();
    };
    getDetails();
  }, []);

  const navigate = useNavigate();
  const setRoute = () => {
    navigate({ pathname: `/inquiry/inquiry/RD`, state: { tabValue: "1" } });
  };

  const setRoute2 = () => {
    navigate({ pathname: `/inquiry/inquiry/RD`, state: { tabValue: "2" } });
  };

  console.log("userRole --------------", userRole);
  console.log("USerPErmission  -----------------", userPermissions);
  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Dashboard")}
          title={trans("User Dashboard")}
        />
        <Container fluid={true}>
          <Row>
            <Col sm="12" xl="12">
              <Card>
                <CardHeader>
                  <Row xl="12" className="d-flex justify-content-between">
                    <Col xl="4" className="d-flex">
                      <h6 style={{ paddingRight: "8px" }}>{trans("Name")}:</h6>
                      {userName !== null && <span>{userName}</span>}
                    </Col>

                    <Col
                      xl="4"
                      className="text-right d-flex justify-content-end"
                    >
                      <h6 style={{ paddingRight: "8px" }}>{trans("Role")}: </h6>
                      {userRole !== null && userRole === "SuperAdmin" && (
                        <span>{trans("SuperAdmin")}</span>
                      )}
                      {userRole !== null && userRole === "Lead" && (
                        <span>{trans("Lead")}</span>
                      )}
                      {userRole !== null && userRole === "Qualified Lead" && (
                        <span>{trans("Qualified Lead")}</span>
                      )}
                      {userRole !== null &&
                        userRole === "Nigotiation in progress" && (
                          <span>{trans("Nigotiation in progress")}</span>
                        )}
                      {userRole !== null &&
                        userRole === "Signup in progress" && (
                          <span>{trans("Signup in progress")}</span>
                        )}
                      {userRole !== null && userRole === "New Franchise" && (
                        <span>{trans("New Franchise")}</span>
                      )}
                      {userRole !== null && userRole === "Active Franchise" && (
                        <span>{trans("Active Franchise")}</span>
                      )}
                      {userRole !== null &&
                        userRole != "SuperAdmin" &&
                        userRole != "Lead" && <span>{userRole}</span>}
                    </Col>
                  </Row>
                </CardHeader>
                {userRole === "Lead" ||
                  userRole === "Qualified Lead" ||
                  userRole === "Nigotiation in progress" ||
                  userRole === "Signup in progress" ||
                  userRole === "New Franchise" ||
                  userRole === "Active Franchise" ? (
                  <CardBody>
                    <Row className="justify-content-center">
                      <Col sm="3">
                        <Card
                          onClick={setRoute}
                          className="shadowClass d-flex justify-content-center align-items-center"
                          style={{ height: "170px", cursor: "pointer" }}
                        >
                          <span style={{ color: "black" }}>
                            <b>{trans("Current Form")}</b>
                          </span>
                        </Card>
                      </Col>
                      <Col sm="3">
                        <Card
                          onClick={setRoute2}
                          className="shadowClass d-flex justify-content-center align-items-center"
                          style={{ height: "170px", cursor: "pointer" }}
                        >
                          <span style={{ color: "black" }}>
                            <b>{trans("Last Form Submitted")}</b>
                            <br />
                            <span
                              className="d-block text-center"
                              style={{ fontSize: 11 }}
                            >
                              {"("}
                              <b>{trans("Stage")}: </b>
                              {leadLastFromSubmitted_Stage != null &&
                                leadLastFromSubmitted_Stage.stage.name}
                              {")"}
                            </span>
                          </span>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                ) : (
                  <CardBody>
                    <Row style={{ marginBottom: "2rem" }}>
                      <Col>
                        <h5>{trans("Ecommerce")}</h5>
                      </Col>
                    </Row>
                    <Row>
                      {userPermissions.includes("Products") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle "
                            to={`${process.env.PUBLIC_URL}/ecommerce/products/list/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Products")}</h6>
                                  <span>{user_detail.Eccom_Product}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("Categories") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`${process.env.PUBLIC_URL}/ecommerce/categories/list/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Categories")}</h6>
                                  <span>{user_detail.Eccom_Category}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("open_order") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/apiData/openOrders/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Open Orders")}</h6>
                                  <span>{user_detail.Eccom_Open_Orders}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("delivered_order") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/apiData/deliveredOrders/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Delivered Orders")}</h6>
                                  <span>
                                    {user_detail.Eccom_Delivered_Orders}
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                    </Row>
                    <Row style={{ marginBottom: "2rem" }}>
                      <Col>
                        <h5> {trans("Suppliers")}</h5>
                      </Col>
                    </Row>
                    <Row>
                      {userPermissions.includes("Suppliers") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/homeSettings/Order-Management/OrderManagement/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Suppliers")}</h6>
                                  <span>{user_detail.Supplier}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("Customers") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/supplier/customers/list/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Customers")}</h6>
                                  <span>{user_detail.Supplier_Client}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("Products") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/supplier/products/list/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Products")}</h6>
                                  <span>{user_detail.Supplier_Product}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                      {userPermissions.includes("Orders") && (
                        <Col xl="3">
                          <Link
                            className="LinkStyle"
                            to={`/supplier/orders/list/RD`}
                          >
                            <Card className="shadowClass">
                              <CardBody>
                                <div className="filter-block d-flex flex-column justify-content-center align-items-center">
                                  <h6>{trans("Orders")}</h6>
                                  <span>{user_detail.Supplier_Orders}</span>
                                </div>
                              </CardBody>
                            </Card>
                          </Link>
                        </Col>
                      )}
                    </Row>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(UserDashboard);
