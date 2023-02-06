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
import SupplierEmailFooter from "../../supplier-forms/SupplierEmailFooter";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import "../TabsCSS.css";

const PurchaseModule = (props) => {
  const trans = props.t;
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
                      <div className = 'col-2 p-0'><i className="fa fa-envelope-o"></i></div>
                      <div className = 'col-10 p-0'>{trans("Email Footer")}</div>
                      </div>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col mf="9">
                    <TabContent activeTab={BasicLineTab}>
                      <TabPane className="fade show" tabId="1">
                        <SupplierEmailFooter />
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

export default translate(PurchaseModule);
