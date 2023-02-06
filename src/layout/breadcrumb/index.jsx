import React, { Fragment } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../theme-customizer";

const Breadcrumbs = (props) => {
  const id = window.location.pathname.split("/").pop();
  const defaultLayout = Object.keys(DefaultLayout);
  const layout = id ? id : defaultLayout;

  return (
    <Fragment>
      <Container fluid={true}>
        <div className="page-title">
          <Row>
            <Col xs="6">
              {props.breadcrumbtitle && props.breadcrumbtitle != "" ? (
                <h3>{props.breadcrumbtitle}</h3>
              ) : (
                <h3>{props.title}</h3>
              )}
            </Col>
            <Col xs="6">
              <Breadcrumb>
                <BreadcrumbItem>
                  {/* <Link
                    to={`${process.env.PUBLIC_URL}/dashboard/default/${layout}`}
                  >
                    <Home />
                  </Link> */}
                  <a>
                    <Home />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>{props.parent}</BreadcrumbItem>
                {props.subtitle ? (
                  <>
                    <BreadcrumbItem>{props.title}</BreadcrumbItem>
                    <BreadcrumbItem active>{props.subtitle}</BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem active>{props.title}</BreadcrumbItem>
                )}
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;
