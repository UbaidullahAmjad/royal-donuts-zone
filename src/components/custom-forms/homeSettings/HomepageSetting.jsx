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
import { translate } from "react-switch-lang";
import CKEditors from "react-ckeditor-component";
import Testimonials from "./testimonials";
import Description from "./description";
import ImageLimit from "./imageLimit";
import GalleryImages from "./GalleryImages";
import CarouselSettings from "./CarouselSettings";
import Breadcrumb from "../../../layout/breadcrumb/index";
import './TabsCSS.css'


const HomepageSetting = (props) => {
  const trans = props.t;
  const [BasicLineTab, setBasicLineTab] = useState("1");


  const setLineTab =(value)=>{
    setBasicLineTab(value)
    localStorage.setItem('homepageTab', value)
  }
 useEffect(()=>{
  if(localStorage.getItem('homepageTab') != null){
    setBasicLineTab(localStorage.getItem('homepageTab'))
  }
 },[])

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Home Settings")}
          title={trans("Homepage Settings")}
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
                      <div className = 'col-2 p-0'><i className="fa fa-arrows-h"></i></div>
                      <div className = 'col-10 p-0'>{trans("Carousel Settings")}</div>
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
                      <div className = 'col-2 p-0'> <i className="fa fa-pencil-square"></i></div>
                      <div className = 'col-10 p-0'>{trans("Store Description")}</div>
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
                      <div className = 'col-2 p-0'><i className="fa fa-handshake-o"></i></div>
                      <div className = 'col-10 p-0'>{trans("Testimonials")}</div>
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
                      <div className = 'col-2 p-0'><i className="fa fa-picture-o"></i></div>
                      <div className = 'col-10 p-0'>{trans("Images Limit")}</div>
                      </div>  
                      </NavLink>
                    </NavItem>
                    
                  </Nav>
                  </Col>
                  <Col md='9'>
                  <TabContent activeTab={BasicLineTab}>
                    <TabPane className="fade show" tabId="1">
                    <CarouselSettings />
                    </TabPane>
                    <TabPane className="fade show" tabId="2">
                      <Description />
                    </TabPane>
                    <TabPane className="fade show" tabId="3">
                    <Testimonials /> 
                    </TabPane>
                    <TabPane className="fade show" tabId="4">
                    <ImageLimit />
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

export default translate(HomepageSetting);
