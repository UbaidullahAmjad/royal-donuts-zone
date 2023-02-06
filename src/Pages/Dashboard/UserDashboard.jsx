/* eslint-disable no-unused-vars */
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
import "./userDashboard.css";
import StoresRevenueData from "./StoresRevenueData";
import EcommerceDashbaord from "./EcommerceDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, leadLastFormSubmitted } from "../../components";
import Suppliers from "./Suppliers";
import SupplierDashbaord from "./SupplierDashboard";
import { useTranslation, Trans } from "react-i18next";

const UserDashboard = (props) => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const trans = t;

  let userRole = useSelector((state) => state.setDashboardDetails.userRole)
  let user_id = useSelector((state) => state.setDashboardDetails.user_id)

  useEffect(() => {
    dispatch(getDetails());
    (userRole === "Lead" ||
      userRole === "Qualified Lead" ||
      userRole === "Nigotiation in progress" ||
      userRole === "Signup in progress" ||
      userRole === "New Franchise" ||
      userRole === "Active Franchise") &&
      dispatch(leadLastFormSubmitted(user_id));
  }, [])

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
                {userRole === "Lead" ||
                  userRole === "Qualified Lead" ||
                  userRole === "Nigotiation in progress" ||
                  userRole === "Signup in progress" ||
                  userRole === "New Franchise" ||
                  userRole === "Active Franchise" ? (
                  <CardBody>
                    <SupplierDashbaord />
                  </CardBody>
                ) : (
                  <CardBody>
                    <EcommerceDashbaord />
                    <Suppliers />
                  </CardBody>
                )}
              </Card>
            </Col>
            {
              userRole == "SuperAdmin" && (<Col sm="12" md="12">
                <Card>
                  <CardBody>
                    <StoresRevenueData />
                  </CardBody>
                </Card>
              </Col>)
            }
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default UserDashboard;
