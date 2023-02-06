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
import { URL } from "../../../../env";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import CreateProduct from "../createProduct";
import Receipe from "../../supplier-forms/supplier_recipe/receipe";
import EditProduct from "../editProduct";
import EditReceipe from "../../supplier-forms/supplier_recipe/edit-receipe";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import ViewProduct from "../ViewProduct";



const EditEcomProduct = (props) => {
  const trans = props.t;
  const [BasicLineTab, setBasicLineTab] = useState('1');


  const setLineTab =(value)=>{
    setBasicLineTab(value)
    localStorage.setItem('editProductTab', value)
  }
 useEffect(()=>{
  if(localStorage.getItem('editProductTab') != null){
    setBasicLineTab(localStorage.getItem('editProductTab'))
  }
 },[])

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Products")}
          title={trans("Edit Product")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
              <CardBody className="d-flex tabs_main_FR14">
               <Col sm="3" className="tabs-responsive-side">
                 <Nav className="flex-column nav-pills border-tab nav-left">
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '1' ? 'active' : ''}  onClick={() => setLineTab('1')}><i className="fa fa-shopping-bag"></i>{trans("Edit Product")}</NavLink>
                       </NavItem>
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '2' ? 'active' : ''}  onClick={() => setLineTab('2')}><i className="fa fa-pagelines"></i>{trans("Edit Recipe")}</NavLink>
                       </NavItem>
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '3' ? 'active' : ''}  onClick={() => setLineTab('3')}><i className="fa fa-eye"></i>{trans("View Product")}</NavLink>
                       </NavItem>
                     </Nav>
                     </Col>
                    <Col md= '9'>
                     <TabContent activeTab={BasicLineTab}>
                       <TabPane  className="fade show" tabId="1">
                        <EditProduct/>
                       </TabPane>
                       <TabPane  className="fade show" tabId="2">
                        <EditReceipe/>
                       </TabPane>
                       <TabPane  className="fade show" tabId="3">
                        <ViewProduct/>
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

export default translate(EditEcomProduct);
