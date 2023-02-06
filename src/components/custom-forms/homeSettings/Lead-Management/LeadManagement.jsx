/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import { URL } from "../../../../env";
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
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import SupplierUnits from "../../../apiData/supplierApiData/supplierUnits";
import ListForms from "../../../crm/forms/ListForms";
import FormsListing from "../../roleManagement/FormsListing";
import LeadsMap from "../../../crm/leads-map/leadsMap";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import "../TabsCSS.css";

const LeadManagement = (props) => {
  const trans = props.t;
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
                <CardBody className="d-flex tabs_main_FR14">
                  <Col sm="3" className="tabs-responsive-side">
                    <Nav className="flex-column nav-pills border-tab nav-left">
                      <NavItem style={{ cursor: "pointer", display:'flex', alignItems:'center' }}>
                        <NavLink
                        style={{width:'100%'}}
                          className={BasicLineTab === "1" ? "active" : ""}
                          onClick={() => setLineTab("1")}
                        >
                       <div className="d-flex col-12 p-0 align-items-center">
                       <div className = 'col-2 p-0'><i className="fa fa-file-text"></i></div>
                       <div className = 'col-10 p-0'>{trans("Stage Forms")}</div>
                       </div> 
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ cursor: "pointer", display:'flex', alignItems:'center' }}>
                        <NavLink
                        style={{width:'100%'}}
                          className={BasicLineTab === "2" ? "active" : ""}
                          onClick={() => setLineTab("2")}
                        >
                        <div className="d-flex col-12 p-0 align-items-center">
                       <div className = 'col-2 p-0'><i className="fa fa-id-card-o"></i></div>
                       <div className = 'col-10 p-0'>{trans("Lead Forms")}</div>
                       </div>
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ cursor: "pointer", display:'flex', alignItems:'center' }}>
                        <NavLink
                        style={{width:'100%'}}
                          className={BasicLineTab === "3" ? "active" : ""}
                          onClick={() => setLineTab("3")}
                        >
                         <div className="d-flex col-12 p-0 align-items-center">
                       <div className = 'col-2 p-0'><i className="fa fa-map-marker"></i></div>
                       <div className = 'col-10 p-0'>{trans("Leads Map")}</div>
                       </div>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md="9">
                    <TabContent activeTab={BasicLineTab}>
                      <TabPane className="fade show" tabId="1">
                        <ListForms />
                      </TabPane>
                      <TabPane className="fade show" tabId="2">
                        <FormsListing />
                      </TabPane>
                      <TabPane className="fade show" tabId="3">
                        <LeadsMap />
                      </TabPane>
                    </TabContent>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(LeadManagement);
