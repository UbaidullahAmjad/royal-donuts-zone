/* eslint-disable no-unused-vars */
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
import AdminSeo from "./AdminSeo";
import EcommerceSeo from "./EcommerceSeo";
import "../TabsCSS.css";

const SeoManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("SEOTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("SEOTab") != null) {
      setBasicLineTab(localStorage.getItem("SEOTab"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("SEO Management")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Nav className="border-tab" tabs>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        style={{ width: "100%" }}
                        className={BasicLineTab === "1" ? "active" : ""}
                        onClick={() => setLineTab("1")}
                      >
                        <div className="d-flex col-12 p-0 align-items-center">
                          <i className="fa fa-code-fork"></i>
                          {trans("Ecommerce SEO")}
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <EcommerceSeo />
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

export default SeoManagement;
