import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  createRef,
  forwardRef,
} from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  CardHeader,
  Media,
  Form,
  Input,
} from "reactstrap";

import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ProductName,
  Sub_total,
  Print,
  Quantity,
  Price,
  Cancel,
} from "../../../constant";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";
import "./CustomerInvoice.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import ReactToPrint from "react-to-print";

const CustomerInvoice = (props) => {
  const trans = props.t;

  const {
    register,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const params = useParams();

  let id = params.id;
  console.log("id", id);

  const [InvoiceOrderData, setInvoiceOrderData] = useState(null);
  const [InvoiceOrderItems, setInvoiceOrderItems] = useState(null);
  const [user, setUser] = useState(null);
  const [CommentData, setCommentData] = useState(null);
  const [email, setEmail] = useState(null);
  const [invoiceTimeline, setInvoiceTimeline] = useState(null);
  const [StoreData, setStoreData] = useState(null);

  const [RectifyOrderModal, setRectifyOrderModal] = useState(false);

  const navigate = useNavigate();

  const RectifyOrderModaltoggle = () => {
    setRectifyOrderModal(!RectifyOrderModal);
  };

  const { color } = useSelector((state) => state.Customizer);

  useEffect(() => {
    if (id !== null) {
      const getInvoiceDataById = async () => {
        axios
          .get(`${URL}/new_order/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            console.log("Customer-INVOICE ---- ", response);
            setInvoiceOrderData(response.data.order);
            setInvoiceOrderItems(response.data.order_items);
            setEmail(response.data.email);
            setUser(response.data.user);
            setStoreData(response.data.store);

            const invoice_order = response.data.order;
            setInvoiceTimeline(invoice_order);
          })
          .catch((error) => {
            console.log("ERROR --- ", error);
          });
      };
      getInvoiceDataById();
    }
  }, []);

  let componentRef = useRef();

  const printFunc = () => {
    console.log("CLICKED");
    var content = document.getElementById("invoice").printElement();
  };

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Supplier")}
        title={trans("Customer Invoice")}
      />
      <div>
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>{trans("Customer Invoice")}</h5>
                </CardHeader>
                <CardBody className="mb-0">
                  <Row className="m-0">
                    <Col sm="12" md="8" className="mb-3 px-2" id="invoice">
                      <div
                        className="Customer Invoice pt-4"
                        ref={(el) => (componentRef = el)}
                        style={{ border: "1px solid rgb(194, 193, 193)" }}
                      >
                        <div>
                          <div>
                            <Row>
                              <Col sm="3">
                                <Media>
                                  <Media body className="m-l-20">
                                    <h4 className="media-heading">
                                      {"Royal Donuts"}
                                    </h4>
                                    {StoreData != null &&
                                     <p>
                                     {StoreData?.name_fr}
                                     <br />
                         
                                   </p>
                                    }
                                   
                                  </Media>
                                </Media>
                              </Col>
                              <Col sm="9">
                                <div className="text-md-right pr-2">
                                  <h3>
                                    {trans("Order")} #
                                    <span className="digits counter">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData.order_number}
                                    </span>
                                  </h3>
                                  <p>
                                    {trans("Order Date")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        new Date(InvoiceOrderData.created_at)
                                          .toUTCString()
                                          .slice(0, 16)}
                                    </span>
                                    <br />
                                    {trans("Delivery Date")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        new Date(InvoiceOrderData.delivery_date)
                                          .toUTCString()
                                          .slice(0, 16)}
                                    </span>
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />

                          <Row>
                            <Col md="4">
                              <Media>
                                <Media body className="m-l-20">
                                  <h4 className="media-heading">
                                    {InvoiceOrderData != null &&
                                      InvoiceOrderData.user_name}
                                  </h4>
                                  <p>
                                    {trans("Supplier Name")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData.supplier_name}
                                    </span>
                                    <br />
                                    {trans("Customer Name")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData.user_name}
                                    </span>
                                    <br />
                                    {trans("Customer")} {trans("Address")}:
                                    <span className="digits">
                                      {user != null && user.address},{" "}
                                      {user !== null && user.zip_code}
                                    </span>
                                  </p>
                                </Media>
                              </Media>
                            </Col>
                            <Col md="8">
                              <div>
                                <Col md="6"></Col>
                              </div>
                            </Col>
                          </Row>
                          <div>
                            <div
                              className="table-responsive invoice-table"
                              id="table"
                            >
                              <Table bordered striped>
                                <tbody>
                                  <tr>
                                    <td className="item">
                                      <h6 className="p-2 mb-0">
                                        {trans("Product")} {trans("Name")}
                                      </h6>
                                    </td>
                                    <td className="quantity">
                                      <h6 className="p-2 mb-0">
                                        {trans("Quantity")}
                                      </h6>
                                    </td>
                                    <td className="Rate">
                                      <h6 className="p-2 mb-0">
                                        {trans("Price")}
                                      </h6>
                                    </td>
                                    <td className="subtotal">
                                      <h6 className="p-2 mb-0">
                                        {trans("Product")} {Sub_total}
                                      </h6>
                                    </td>
                                  </tr>
                                  {InvoiceOrderItems !== null &&
                                    InvoiceOrderItems.map((item, index) => {
                                      return (
                                        <tr key={item.id}>
                                          <td>
                                            <label>{item.product_name}</label>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {item.quantity}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {item.unit_price}
                                              {" " + "€"}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {(
                                                item.unit_price * item.quantity
                                              ).toFixed(2)}
                                              {" " + "€"}
                                            </p>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  <tr>
                                    <td colSpan={3} className="text-md-right">
                                      {trans("SubTotal")}
                                    </td>
                                    <td className="payment digits">
                                      <p className="itemtext digits">
                                        {InvoiceOrderData != null &&
                                          InvoiceOrderData.total}
                                        {" " + "€"}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} className="text-md-right">
                                      {trans("Discount")}
                                    </td>
                                    <td className="payment digits">
                                      <p className="itemtext digits">
                                        {InvoiceOrderData != null &&
                                          InvoiceOrderData.discount}
                                        {" " + "€"}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} className="text-md-right">
                                      {trans("Total")}
                                    </td>
                                    <td className="payment digits">
                                      {InvoiceOrderData != null &&
                                        parseFloat(InvoiceOrderData.total) >=
                                          parseFloat(
                                            InvoiceOrderData.discount
                                          ) && (
                                          <p className="itemtext digits">
                                            {(
                                              InvoiceOrderData.total -
                                              InvoiceOrderData.discount
                                            ).toFixed(2)}
                                            {" " + "€"}
                                          </p>
                                        )}
                                      {InvoiceOrderData != null &&
                                        parseFloat(InvoiceOrderData.total) <
                                          parseFloat(
                                            InvoiceOrderData.discount
                                          ) && (
                                          <p className="itemtext digits">
                                            {(
                                              InvoiceOrderData.total -
                                              InvoiceOrderData.total
                                            ).toFixed(2)}
                                            {" " + "€"}
                                          </p>
                                        )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="12" md="4" className="mb-3 px-2 timeline">
                      <div
                        className="p-2"
                        style={{
                          border: "1px solid rgb(194, 193, 193)",
                          height: "100%",
                        }}
                      >
                        <VerticalTimeline layout={"1-column"}>
                          {invoiceTimeline !== null ? (
                            invoiceTimeline.order_status == 1 ? (
                              <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                animate={true}
                                date={invoiceTimeline.order_confirmed}
                                iconStyle={
                                  (invoiceTimeline.order_status === "1" && {
                                    backgroundColor: "#a927f9",
                                  }) ||
                                  (invoiceTimeline.order_status === "2" && {
                                    backgroundColor: "#1266F1",
                                  }) ||
                                  (invoiceTimeline.order_status === "3" && {
                                    backgroundColor: "#00B74A",
                                  }) ||
                                  (invoiceTimeline.order_status === "4" && {
                                    backgroundColor: "#FFA900",
                                  })
                                }
                                icon={<AccessTimeIcon />}
                              >
                                <h4 className="vertical-timeline-element-subtitle">
                                  {invoiceTimeline.order_status === "1" &&
                                    trans("Confirmed")}
                                  {invoiceTimeline.order_status === "2" &&
                                    trans("Indelivery")}
                                  {invoiceTimeline.order_status === "3" &&
                                    trans("Delivered")}
                                  {invoiceTimeline.order_status === "4" &&
                                    trans("Treated")}
                                </h4>
                              </VerticalTimelineElement>
                            ) : invoiceTimeline.order_status == 4 ? (
                              Array.from({ length: 2 }, (item, index) => (
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--work"
                                  animate={true}
                                  date={
                                    index == 0
                                      ? invoiceTimeline.order_confirmed
                                      : index == 1 &&
                                        invoiceTimeline.order_treated
                                  }
                                  iconStyle={
                                    (index == 0 && {
                                      backgroundColor: "#a927f9",
                                    }) ||
                                    (index == 1 && {
                                      backgroundColor: "#1266F1",
                                    })
                                  }
                                  icon={
                                    index == 0 ? (
                                      <AccessTimeIcon />
                                    ) : (
                                      <MarkEmailReadIcon />
                                    )
                                  }
                                >
                                  <h4 className="vertical-timeline-element-subtitle">
                                    {index == 0 && trans("Confirmed")}
                                    {index == 1 && trans("Treated")}
                                  </h4>
                                </VerticalTimelineElement>
                              ))
                            ) : invoiceTimeline.order_status == 2 ? (
                              Array.from({ length: 3 }, (item, index) => (
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--work"
                                  animate={true}
                                  date={
                                    index == 0
                                      ? invoiceTimeline.order_confirmed
                                      : index == 1
                                      ? invoiceTimeline.order_treated
                                      : index == 2 &&
                                        invoiceTimeline.order_indelivery
                                  }
                                  iconStyle={
                                    (index == 0 && {
                                      backgroundColor: "#a927f9",
                                    }) ||
                                    (index == 1 && {
                                      backgroundColor: "#1266F1",
                                    }) ||
                                    (index == 2 && {
                                      backgroundColor: "#00B74A",
                                    })
                                  }
                                  icon={
                                    index == 0 ? (
                                      <AccessTimeIcon />
                                    ) : index == 1 ? (
                                      <MarkEmailReadIcon />
                                    ) : (
                                      <LocalShippingIcon />
                                    )
                                  }
                                >
                                  <h4 className="vertical-timeline-element-subtitle">
                                    {index == 0 && trans("Confirmed")}
                                    {index == 1 && trans("Treated")}
                                    {index == 2 && trans("Indelivery")}
                                  </h4>
                                </VerticalTimelineElement>
                              ))
                            ) : (
                              invoiceTimeline.order_status == 3 &&
                              Array.from({ length: 4 }, (item, index) => (
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--work"
                                  animate={true}
                                  date={
                                    index == 0
                                      ? invoiceTimeline.order_confirmed
                                      : index == 1
                                      ? invoiceTimeline.order_treated
                                      : index == 2
                                      ? invoiceTimeline.order_indelivery
                                      : index == 3 &&
                                        invoiceTimeline.order_delivered
                                  }
                                  iconStyle={
                                    (index == 0 && {
                                      backgroundColor: "#a927f9",
                                    }) ||
                                    (index == 1 && {
                                      backgroundColor: "#1266F1",
                                    }) ||
                                    (index == 2 && {
                                      backgroundColor: "#00B74A",
                                    }) ||
                                    (index == 3 && {
                                      backgroundColor: "#f73164",
                                    })
                                  }
                                  icon={
                                    index == 0 ? (
                                      <AccessTimeIcon />
                                    ) : index == 1 ? (
                                      <MarkEmailReadIcon />
                                    ) : index == 2 ? (
                                      <LocalShippingIcon />
                                    ) : (
                                      <AssignmentTurnedInIcon />
                                    )
                                  }
                                >
                                  <h4 className="vertical-timeline-element-subtitle">
                                    {index == 0 && trans("Confirmed")}
                                    {index == 1 && trans("Treated")}
                                    {index == 2 && trans("Indelivery")}
                                    {index == 3 && trans("Delivered")}
                                  </h4>
                                </VerticalTimelineElement>
                              ))
                            )
                          ) : (
                            <VerticalTimelineElement
                              iconStyle={{ background: "red" }}
                            >
                              <p className="vertical-timeline-element-subtitle">
                                {trans("Timeline is Empty")}
                              </p>
                            </VerticalTimelineElement>
                          )}
                        </VerticalTimeline>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Col sm="12" className="text-center my-3">
        <ReactToPrint
          trigger={() => (
            <Button color="primary" className="mr-2">
              {trans("Print")}
            </Button>
          )}
          content={() => componentRef}
        />
      </Col>
    </Fragment>
  );
};

export default translate(CustomerInvoice);
