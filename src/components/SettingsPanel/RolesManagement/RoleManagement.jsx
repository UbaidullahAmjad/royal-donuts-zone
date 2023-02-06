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
import SupplierAdmins from "./SupplierAdmins/SupplierAdmins";
import ManageRolesTable from "./Roles/RolesManagementList";
import Breadcrumb from "../../../layout/breadcrumb/index";

const RoleManagement = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("roleTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("roleTab") != null) {
      setBasicLineTab(localStorage.getItem("roleTab"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Role Management")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Nav className="border-tab" tabs>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "1" ? "active" : ""}
                        onClick={() => setLineTab("1")}
                      >
                        <i className="fa fa-user"></i>
                        {trans("Admins")}
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "2" ? "active" : ""}
                        onClick={() => setLineTab("2")}
                      >
                        <i className="fa fa-briefcase"></i>
                        {trans("Roles")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <SupplierAdmins />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <ManageRolesTable />
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

export default RoleManagement;
