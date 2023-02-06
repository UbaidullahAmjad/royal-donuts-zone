/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import { URL } from "../../../env";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useTranslation, } from "react-i18next";
import SupplierUnits from "./Units/SupplierUnits";
import "../TabsCSS.css";
import DeliveryCompanies from "./ShippingCompanies/DeliveryCompanies";
import SupplierList from "./Suppliers/SupplierList";
import SupplierRules from "./Rules/SupplierRules";
import SupplierAssociateRules from "./AssociateRules/SupplierAssociateRules";
import CustomCalendar from "../../../Pages/PurchaseModule/calendar/customCalendar";
import { useLocation } from "react-router-dom"

const OrderManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("3");

  const location = useLocation();

  const tabValue = location.state?.tabValue;

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("orderTab", value);
  };
  useEffect(() => {
    if (tabValue) {
      localStorage.setItem("orderTab", tabValue);
      setBasicLineTab(tabValue);
    } else {
      if (localStorage.getItem("orderTab") != null) {
        setBasicLineTab(localStorage.getItem("orderTab"));
      }
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Order Management")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Nav className="border-tab" tabs>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        className={BasicLineTab === "1" ? "active" : ""}
                        onClick={() => setLineTab("1")}
                      >
                        <i className="fa fa-usd"></i>
                        {trans("Units")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        className={BasicLineTab === "2" ? "active" : ""}
                        onClick={() => setLineTab("2")}
                      >
                        <i className="fa fa-motorcycle"></i>
                        {trans("Shipping Companies")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        className={BasicLineTab === "3" ? "active" : ""}
                        onClick={() => setLineTab("3")}
                      >
                        <i className="fa fa-user"></i>
                        {trans("Suppliers")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <NavLink
                        className={BasicLineTab === "4" ? "active" : ""}
                        onClick={() => setLineTab("4")}
                      >
                        <i className="fa fa-check-square-o"></i>
                        {trans("Rules")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        className={BasicLineTab === "5" ? "active" : ""}
                        onClick={() => setLineTab("5")}
                      >
                        <i className="fa fa-check-square"></i>
                        {trans("Associate Rules")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <SupplierUnits />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <DeliveryCompanies />
                    </TabPane>
                    <TabPane className="fade show" tabId="3">
                      <SupplierList />
                    </TabPane>
                    <TabPane className="fade show" tabId="4">
                      <SupplierRules />
                    </TabPane>
                    <TabPane className="fade show" tabId="5">
                      <SupplierAssociateRules />
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

export default OrderManagement;
