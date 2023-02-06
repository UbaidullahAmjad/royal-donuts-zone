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
import { useTranslation, } from "react-i18next";
import SupplierUnits from "../OrderManagement/Units/SupplierUnits";
import ListStageForms from "./StageForms/ListStageForms";
import FormsListing from "./LeadForms/LeadFormsListing";
import LeadsMap from "../../../Pages/LeadGeneration/LeadsMap/LeadsMap";
import Breadcrumb from "../../../layout/breadcrumb/index";
import "../TabsCSS.css";

const LeadManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("leadTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("leadTab") != null) {
      setBasicLineTab(localStorage.getItem("leadTab"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Lead Management")}
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
                        <i className="fa fa-file-text"></i>
                        {trans("Stage Forms")}
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
                        <i className="fa fa-id-card-o"></i>
                        {trans("Lead Forms")}
                      </NavLink>
                    </NavItem>
                    <NavItem
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        style={{ width: "100%" }}
                        className={BasicLineTab === "3" ? "active" : ""}
                        onClick={() => setLineTab("3")}
                      >
                        <i className="fa fa-map-marker"></i>
                        {trans("Leads Map")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <ListStageForms />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <FormsListing />
                    </TabPane>
                    <TabPane className="fade show" tabId="3">
                      <LeadsMap />
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

export default LeadManagement;
