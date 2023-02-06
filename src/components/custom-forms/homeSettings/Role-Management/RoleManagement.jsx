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
  Nav,NavItem,NavLink,TabContent,TabPane
} from "reactstrap";
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import SupplierUnits from "../../../apiData/supplierApiData/supplierUnits";
import SupplierAdmins from "../../../apiData/supplierApiData/supplierAdmins";
import ManageRolesTable from "../../../apiData/manageRolesTable";
import Breadcrumb from "../../../../layout/breadcrumb/index";


const RoleManagement = (props) => {
  const trans = props.t;
  const [BasicLineTab, setBasicLineTab] = useState('1');

  const setLineTab =(value)=>{
    setBasicLineTab(value)
    localStorage.setItem('roleTab', value)
  }
 useEffect(()=>{
  if(localStorage.getItem('roleTab') != null){
    setBasicLineTab(localStorage.getItem('roleTab'))
  }
 },[])

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
              <CardBody className="d-flex tabs_main_FR14">
              <Col sm="3" className="tabs-responsive-side">
                <Nav className="flex-column nav-pills border-tab nav-left">
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '1' ? 'active' : ''}  onClick={() => setLineTab('1')}><i className="fa fa-user"></i>{trans("Admins")}</NavLink>
                       </NavItem>
                       <NavItem  style={{cursor: 'pointer'}}>
                           <NavLink   className={BasicLineTab === '2' ? 'active' : ''}  onClick={() => setLineTab('2')}><i className="fa fa-briefcase"></i>{trans("Roles")}</NavLink>
                       </NavItem>
                     </Nav>
                    </Col>
                  <Col md = '9'>
                     <TabContent activeTab={BasicLineTab}>
                       <TabPane  className="fade show" tabId="1">
                        <SupplierAdmins/>
                       </TabPane>
                       <TabPane  className="fade show" tabId="2">
                        <ManageRolesTable/>
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

export default translate(RoleManagement);
