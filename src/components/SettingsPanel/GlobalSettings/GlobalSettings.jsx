/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import HomeSettings from "./GeneralSettings";
import CarouselSettings from "../../../Pages/Cms/home-settings/CarouselSettings";
import ZeltySetting from "./ZeltySetting";
import StripePayment from "./stripePayment";
import PaypalPayment from "./PaypalPayment";
import "../TabsCSS.css";

const GlobalSettings = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("globelTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("globelTab") != null) {
      setBasicLineTab(localStorage.getItem("globelTab"));
    }
  }, []);

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Home Settings")}
        title={trans("Global Settings")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Col className="tabs-responsive-side">
                  <Nav className="border-tab" tabs>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "1" ? "active" : ""}
                        onClick={() => setLineTab("1")}
                      >
                        <i className="fa fa-wrench"></i>
                        {trans("General Settings")}
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "2" ? "active" : ""}
                        onClick={() => setLineTab("2")}
                      >
                        <i className="fa fa-wrench"></i>
                        {trans("POS Activation")}
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "3" ? "active" : ""}
                        onClick={() => setLineTab("3")}
                      >
                        <i className="fa fa-cc-stripe"></i>
                        {trans("Stripe Payment")}
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "4" ? "active" : ""}
                        onClick={() => setLineTab("4")}
                      >
                        <i className="fa fa-paypal"></i>
                        {trans("Paypal Payment")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col md="12">
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <HomeSettings />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <ZeltySetting />
                    </TabPane>
                    <TabPane className="fade show" tabId="3">
                      <StripePayment />
                    </TabPane>
                    <TabPane className="fade show" tabId="4">
                      <PaypalPayment />
                    </TabPane>
                  </TabContent>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default GlobalSettings;
