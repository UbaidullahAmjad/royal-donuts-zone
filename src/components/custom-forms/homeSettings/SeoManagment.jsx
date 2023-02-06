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
import { translate } from "react-switch-lang";
import AdminSeo from "../../Settings/AdminSeo";
import EcommerceSeo from "../../Settings/EcommerceSeo";
import "./TabsCSS.css";

const SeoManagement = (props) => {
  const trans = props.t;
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
                      <div className = 'col-2 p-0'><i className="fa fa-cogs"></i></div>
                      <div className = 'col-10 p-0'>{trans("Admin SEO")}</div>
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
                      <div className = 'col-2 p-0'><i className="fa fa-code-fork"></i></div>
                      <div className = 'col-10 p-0'>{trans("Ecommerce SEO")}</div>
                      </div>     
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col md="9">
                    <TabContent activeTab={BasicLineTab}>
                      <TabPane className="fade show" tabId="1">
                        <AdminSeo />
                      </TabPane>
                      <TabPane className="fade show" tabId="2">
                        <EcommerceSeo />
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

export default translate(SeoManagement);
