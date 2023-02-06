/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,NavItem,NavLink,TabContent,TabPane
} from "reactstrap";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import CreateProduct from "../createProduct";
import Receipe from "../../supplier-forms/supplier_recipe/receipe";
import Breadcrumb from "../../../../layout/breadcrumb/index";


const CreateNewProduct = (props) => {
  const trans = props.t;
  const [BasicLineTab, setBasicLineTab] = useState('1');

  const setLineTab =(value)=>{
    setBasicLineTab(value)
    localStorage.setItem('createProductTab', value)
  }
 useEffect(()=>{
  if(localStorage.getItem('createProductTab') != null){
    setBasicLineTab(localStorage.getItem('createProductTab'))
  }
 },[])

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Products")}
          title={trans("Create Product")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
            <Card>
            <CardBody className="d-flex tabs_main_FR14">
               
               <Col sm="3" className="tabs-responsive-side">
                 <Nav className="flex-column nav-pills border-tab nav-left">
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '1' ? 'active' : ''}  onClick={() => setBasicLineTab('1')}><i className="fa fa-shopping-bag"></i>{trans("Create Product")}</NavLink>
                       </NavItem>
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '2' ? 'active' : ''}  onClick={() => setBasicLineTab('2')}><i className="fa fa-pagelines"></i>{trans("Create Recipe")}</NavLink>
                       </NavItem>
                     </Nav>
                </Col>
                <Col md='9'>
                     <TabContent activeTab={BasicLineTab}>
                       <TabPane  className="fade show" tabId="1">
                        <CreateProduct/>
                       </TabPane>
                       <TabPane  className="fade show" tabId="2">
                        <Receipe/>
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

export default translate(CreateNewProduct);
