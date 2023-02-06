/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
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
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";
import SupplierEmailFooter from "./SupplierEmailFooter";
import Breadcrumb from "../../../layout/breadcrumb/index";
import "../TabsCSS.css";
import GalleryImages from "./GalleryImages";

const PurchaseModule = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("purchaseTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("purchaseTab") != null) {
      setBasicLineTab(localStorage.getItem("purchaseTab"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Purchase Module")}
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
                        style={{ width: "100%" }}
                        className={BasicLineTab === "1" ? "active" : ""}
                        onClick={() => setLineTab("1")}
                      >
                        <i className="fa fa-envelope-o"></i>
                        {trans("Email Footer")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        style={{ width: "100%" }}
                        className={BasicLineTab === "2" ? "active" : ""}
                        onClick={() => setLineTab("2")}
                      >
                        <i class="fa fa-image"></i>
                        {trans("Gallery Images")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <SupplierEmailFooter />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <GalleryImages />
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

export default PurchaseModule;
