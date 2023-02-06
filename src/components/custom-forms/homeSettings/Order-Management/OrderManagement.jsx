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
import Breadcrumb from "../../../../layout/breadcrumb/index";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import SupplierUnits from "../../../apiData/supplierApiData/supplierUnits";
import "../TabsCSS.css";
import DeliveryCompanies from "../../../apiData/supplierApiData/deliveryCompanies";
import SupplierList from "../../../apiData/supplierApiData/supplierList";
import SupplierRules from "../../../apiData/supplierApiData/supplierRules";
import SupplierAssociateRules from "../../../apiData/supplierApiData/supplierAssociateRules";
import CustomCalendar from "../../../custom-calendar/customCalendar";

const OrderManagement = (props) => {
  const trans = props.t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("orderTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("orderTab") != null) {
      setBasicLineTab(localStorage.getItem("orderTab"));
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
                      <div className = 'col-2 p-0'><i className="fa fa-usd"></i></div>
                      <div className = 'col-10 p-0'>{trans("Units")}</div>
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
                      <div className = 'col-2 p-0'><i className="fa fa-motorcycle"></i></div>
                      <div className = 'col-10 p-0'>{trans("Shipping Companies")}</div>
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
                      <div className = 'col-2 p-0'><i className="fa fa-user"></i></div>
                      <div className = 'col-10 p-0'>{trans("Suppliers")}</div>
                      </div>
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ cursor: "pointer", display:'flex', alignItems:'center' }}>
                        <NavLink
                        style={{width:'100%'}}
                          className={BasicLineTab === "4" ? "active" : ""}
                          onClick={() => setLineTab("4")}
                        >
                      <div className="d-flex col-12 p-0 align-items-center">
                      <div className = 'col-2 p-0'><i className="fa fa-check-square-o"></i></div>
                      <div className = 'col-10 p-0'>{trans("Rules")}</div>
                      </div>
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ cursor: "pointer", display:'flex', alignItems:'center' }}>
                        <NavLink
                        style={{width:'100%'}}
                          className={BasicLineTab === "5" ? "active" : ""}
                          onClick={() => setLineTab("5")}
                        >
                        <div className="d-flex col-12 p-0 align-items-center">
                      <div className = 'col-2 p-0'><i className="fa fa-check-square"></i></div>
                      <div className = 'col-10 p-0'>{trans("Associate Rules")}</div>
                      </div>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md="9">
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

export default translate(OrderManagement);
