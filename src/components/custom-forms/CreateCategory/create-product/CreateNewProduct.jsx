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
import CreateProduct from "../createProduct";
import Receipe from "../../supplier-forms/supplier_recipe/receipe";
import Breadcrumb from "../../../../layout/breadcrumb/index";

const CreateNewProduct = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [BasicLineTab, setBasicLineTab] = useState("1");

  const setLineTab = (value) => {
    setBasicLineTab(value);
    localStorage.setItem("createProductTab", value);
  };
  useEffect(() => {
    if (localStorage.getItem("createProductTab") != null) {
      setBasicLineTab(localStorage.getItem("createProductTab"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Products Management")}
          title={trans("Product")}
          subtitle={trans("Create")}
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
                        onClick={() => setBasicLineTab("1")}
                      >
                        <i className="fa fa-shopping-bag"></i>
                        {trans("Create Product")}
                      </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: "pointer" }}>
                      <NavLink
                        className={BasicLineTab === "2" ? "active" : ""}
                        onClick={() => setBasicLineTab("2")}
                      >
                        <i className="fa fa-pagelines"></i>
                        {trans("Create Recipe")}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                      <CreateProduct />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <Receipe BasicLineTab={BasicLineTab} />
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

export default CreateNewProduct;
