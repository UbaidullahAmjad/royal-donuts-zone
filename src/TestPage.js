/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import Breadcrumb from "./layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { Accordion } from "react-bootstrap";
import {
  AllCloseAccordian,
  PrimaryColorAccordian,
  SecondaryColorAccordian,
  AccordionWithIcon,
  AccordionWithOpenandCloseIcon,
} from "./components/ui-kits/accordian/accordianComponent";
// import {
//   BasicAccordion,
//   CollapsibleGroupItem,
//   ColorAccordion,
//   Add,
//   AccordionOpenCloseIcon,
//   AccordionWithIconOnTitle,
//   AllCloseAccordion,
// } from "./constant/index";

import { CollapsibleGroupItem } from "./constant/index";

const TestPage = () => {
  return (
    <>
      <h1>TestPage</h1>
      <Fragment>
        <Card>
          <CardHeader>
            <h5 className="mb-0">
              <Accordion.Toggle
                as={Card.Header}
                className="btn btn-link"
                color="default"
                eventKey="0"
              >
                {CollapsibleGroupItem}
                <span className="digits">1</span>
              </Accordion.Toggle>
            </h5>
          </CardHeader>
          <Accordion.Collapse eventKey="0">
            <CardBody>
              {
                "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
              }
            </CardBody>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    </>
  );
};

export default TestPage;
