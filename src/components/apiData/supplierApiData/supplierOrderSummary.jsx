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
import SweetAlert from "sweetalert2";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReactToPrint from "react-to-print";

const SupplierOrderSummary = (props) => {
  const trans = props.t;
  const params = useParams();

  let id = params.id;
  console.log("id", id);

  const [InvoiceOrderData, setInvoiceOrderData] = useState(null);
  const [InvoiceOrderItems, setInvoiceOrderItems] = useState(null);
  const [user, setUser] = useState(null);
  const [CommentData, setCommentData] = useState(null);
  const [email, setEmail] = useState(null);
  const [JsonData, setJsonData] = useState(null);
  const [generateMail, setGenerateMail] = useState(false);

  const [RectifyOrderModal, setRectifyOrderModal] = useState(false);

  const navigate = useNavigate();
  const text = "hello";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [OrderId, setOrderId] = useState(null);
  const generateMailToggle = (id) => {
    setGenerateMail(!generateMail);
    setOrderId(id);
  };

  const onSubmit = (data) => {
    console.log("this is submitted data", data, " IDDDD --- ", OrderId);
    navigate({
      pathname: `/apiData/supplierApiData/allOrders/${OrderId}/RD`,
      state: { formData: data },
    });
  };

  const GetJsonData = () => setJsonData(!JsonData);

  const RectifyOrderModaltoggle = () => {
    setRectifyOrderModal(!RectifyOrderModal);
  };

  useEffect(() => {
    if (id !== null) {
      getInvoiceDataById();
    }
  }, []);

  const getInvoiceDataById = async () => {
    axios
      .get(`${URL}/new_order/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("INVOICE -Suppplier ---- ", response);
        setInvoiceOrderData(response.data.order);
        setInvoiceOrderItems(response.data.order_items);
        setEmail(response.data.email);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("ERROR --- ", error);
      });
  };

  const SubmitRectifyOrder = (order_id) => {
    axios
      .get(URL + "/rectify_orders", {
        params: {
          order_id: order_id,
          message: CommentData,
          admin_id: atob(localStorage.getItem("user_id")),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("Response ---- ", response);
        if (response.data.success === true) {
          setRectifyOrderModal(false);
          toast.success(trans("Order Is Rectified Successfully"), {
            position: "top-right",
          });
          navigate("/supplier/orders/list/RD");
        }
        if (response.data.error == true) {
          toast.error(trans("failed"), {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error.response.data.related == "supplier") {
          toast.error(trans(error.response.data.data), {
            position: "top-right",
          });
        }
      });
  };

  const ChangeOrderStatus = async (event) => {
    console.log("VALUE", event.target.value);

    const res = axios
      .get(URL + "/supplier/order/status", {
        params: {
          order_id: InvoiceOrderData.id,
          order_status: event.target.value,
          admin_id: atob(localStorage.getItem("user_id")),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSSS", response);
        if (response.data.success === true) {
          InvoiceOrderData.order_status = event.target.value.toString();
          console.log("ORDERSSSSSSS", InvoiceOrderData);
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const handleSubmitStatus = (event) => {
    event.preventDefault();
    const status = event.target.order_status.value;
    console.log("handleSubmitStatus", status);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Status !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      // console.log("result value", result);
      if (result.value) {
        OrderStatus(status);
      }
    });
  };

  const OrderStatus = (order_status) => {
    axios
      .get(URL + "/supplier/order/status", {
        params: {
          order_id: InvoiceOrderData.id,
          order_status: order_status,
          admin_id: atob(localStorage.getItem("user_id")),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((res) => {
        console.log("ORDER STATUS RESS", res);
        if (res.data.success) {
          SweetAlert.fire({
            icon: "success",
            title: trans("Order") + " " + trans("Status"),
            text: trans("Order Status Is Changed Successfully") + " !!",
            confirmButtonText: trans("OK"),
          });
          console.log(
            "ORDER_IDD ---- ",
            InvoiceOrderData.id,
            "RDER STATUS --- ",
            order_status
          );
          // const copy_orders = [...orders];
          // const find_order_index = copy_orders.findIndex(
          //   (item) => item.order.id == order_id
          // );
          // console.log("FIND ORDER INDEx ---- ", find_order_index);
          // copy_orders[find_order_index].order.order_status =
          //   order_status.toString();
          // console.log("COPY ORDERSSSS ---- ", copy_orders);
          // setOrders(copy_orders);
          if (id !== null) {
            getInvoiceDataById();
          }
        }
      })
      .catch((error) => {
        console.log("ERROR ORDER STATUS ---", error);
      });
  };

  let componentRef = useRef();

  const printFunc = () => {
    window.print();
  };

  const goBack = () => {
    navigate(`/supplier/orders/list/RD`);
  };

  console.log("InvoiceOrderData -0---------------------", InvoiceOrderData);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Order Summary")} />
      <div>
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <h5>{trans("Order Summary")}</h5>
                  <Button onClick={goBack}>{trans("Go Back")}</Button>
                </CardHeader>
                <CardBody>
                  <div className="Order Summary">
                    <Row>
                      <Col md="9">
                        <div ref={(el) => (componentRef = el)}>
                          <div>
                            <Row>
                              <Col sm="6">
                                <Media>
                                  {/* <Media left>
                                  <Media
                                    className="media-object img-60"
                                    src={require("../../../assets/images/other-images/coming-soon-Logo.png")}
                                    alt=""
                                  />
                                </Media> */}
                                  <Media body className="m-l-20">
                                    <h4 className="media-heading">
                                      {"Royal Donuts"}
                                    </h4>
                                    <p>
                                      {"Royal Donuts"}
                                      <br />
                                      {/* <span className="digits">{"289-335-6503"}</span> */}
                                    </p>
                                  </Media>
                                </Media>
                              </Col>
                              <Col sm="6">
                                <div className="text-md-right">
                                  <h3>
                                    {trans("Order")} #
                                    <span className="digits counter">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData != undefined &&
                                        InvoiceOrderData.order_no}
                                    </span>
                                  </h3>
                                  <p>
                                    {trans("Order Date")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData != undefined &&
                                        new Date(InvoiceOrderData.created_at)
                                          .toUTCString()
                                          .slice(0, 16)}
                                    </span>
                                    <br />
                                    {trans("Delivery Date")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData != undefined &&
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
                                {/* <Media left>
                              <Media
                                className="media-object rounded-circle img-60"
                                src={require("../../../assets/images/user/1.jpg")}
                                alt=""
                              />
                            </Media> */}
                                <Media body className="m-l-20">
                                  <h4 className="media-heading">
                                    {InvoiceOrderData != null &&
                                      InvoiceOrderData != undefined &&
                                      InvoiceOrderData.user_name}
                                  </h4>
                                  <p>
                                    {trans("Supplier Name")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData != undefined &&
                                        InvoiceOrderData.supplier_name}
                                    </span>
                                    <br />
                                    {trans("Customer Name")}:
                                    <span className="digits">
                                      {InvoiceOrderData != null &&
                                        InvoiceOrderData != undefined &&
                                        InvoiceOrderData.user_name}
                                    </span>
                                    <br />
                                    {trans("Customer")} {trans("Address")}:
                                    <span className="digits">
                                      {user != null &&
                                        user != undefined &&
                                        user.address}
                                      ,{" "}
                                      {user !== null &&
                                        user != undefined &&
                                        user.zip_code}
                                    </span>
                                  </p>
                                </Media>
                              </Media>
                            </Col>
                            <Col md="8">
                              <div>
                                <Col md="4"></Col>
                                <Col
                                  md="8"
                                  style={{ float: "right", padding: 0 }}
                                >
                                  <label>{trans("Order Status")}</label>
                                  <Form onSubmit={handleSubmitStatus}>
                                    <div className="row">
                                      <div className="col-7">
                                        {email === null && (
                                          <Input
                                            className="form-control"
                                            type="select"
                                            innerRef={register({
                                              required: true,
                                            })}
                                            name="order_status"
                                            defaultValue={
                                              InvoiceOrderData != null &&
                                              InvoiceOrderData != undefined &&
                                              InvoiceOrderData.order_status
                                            }
                                            selected={
                                              InvoiceOrderData != null &&
                                              InvoiceOrderData != undefined &&
                                              InvoiceOrderData.order_status
                                            }
                                          // onChange={(event) => ChangeOrderStatus(event)}
                                          >
                                            <option
                                              value="1"
                                              defaultValue={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "1"
                                              }
                                              selected={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "1"
                                              }
                                            >
                                              {trans("Confirmed")}
                                            </option>
                                          </Input>
                                        )}
                                        {email !== null && (
                                          <Input
                                            className="form-control"
                                            type="select"
                                            innerRef={register({
                                              required: true,
                                            })}
                                            name="order_status"
                                            defaultValue={
                                              InvoiceOrderData != null &&
                                              InvoiceOrderData != undefined &&
                                              InvoiceOrderData.order_status
                                            }
                                            selected={
                                              InvoiceOrderData != null &&
                                              InvoiceOrderData != undefined &&
                                              InvoiceOrderData.order_status
                                            }
                                          // onChange={(event) => ChangeOrderStatus(event)}
                                          >
                                            <option
                                              value="4"
                                              defaultValue={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "4"
                                              }
                                              selected={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "4"
                                              }
                                            >
                                              {trans("Treated")}
                                            </option>
                                            <option
                                              value="2"
                                              defaultValue={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "2"
                                              }
                                              selected={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "2"
                                              }
                                            >
                                              {trans("Indelivery")}
                                            </option>
                                            <option
                                              value="3"
                                              defaultValue={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "3"
                                              }
                                              selected={
                                                InvoiceOrderData != null &&
                                                InvoiceOrderData != undefined &&
                                                InvoiceOrderData.order_status ==
                                                "3"
                                              }
                                            >
                                              {trans("Delivered")}
                                            </option>
                                          </Input>
                                        )}
                                      </div>
                                      <div className="col-4">
                                        <button type="submit" className="btn btn-success">
                                          {trans("Submit")}
                                        </button>
                                      </div>
                                    </div>
                                  </Form>
                                  {(email == "" || email == null) && (
                                    <button
                                      style={{background: '#6c757d', color: '#ffff'}}
                                      className="mt-2 mr-2 btn"
                                      onClick={() =>
                                        generateMailToggle(InvoiceOrderData.id)
                                      }
                                    >
                                      {trans("Generate") + " " + trans("Email")}
                                    </button>
                                  )}
                                  <button
                                    className="mt-2 mr-2 btn btn-info"
                                    onClick={GetJsonData}
                                  >
                                    JSON
                                  </button>
                                  {InvoiceOrderData != null &&
                                    InvoiceOrderData != undefined &&
                                    InvoiceOrderData.order_status != "3" && (
                                      <button
                                       style={{background:'#007bff', color:'#ffff'}}
                                        className="mt-2 mr-2 btn"
                                        onClick={() =>
                                          RectifyOrderModaltoggle()
                                        }
                                      >
                                        {trans("Rectify")}
                                      </button>
                                    )}

                                  <Modal
                                    isOpen={generateMail}
                                    toggle={() =>
                                      generateMailToggle(InvoiceOrderData.id)
                                    }
                                    centered
                                  >
                                    <Form
                                      className="needs-validation"
                                      noValidate=""
                                      onSubmit={handleSubmit((data) =>
                                        onSubmit(data)
                                      )}
                                    >
                                      <ModalHeader
                                        toggle={() =>
                                          generateMailToggle(
                                            InvoiceOrderData.id
                                          )
                                        }
                                      >
                                        {trans("Comments")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Input
                                          className="form-control"
                                          name="comments"
                                          type="textarea"
                                          innerRef={register({
                                            required: false,
                                          })}
                                        />
                                        <span>
                                          {errors.comments &&
                                            trans("field is required")}
                                        </span>
                                        <div className="valid-feedback">
                                          {"Looks good!"}
                                        </div>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          color="secondary"
                                          onClick={() =>
                                            generateMailToggle(null)
                                          }
                                        >
                                          {trans("Cancel")}
                                        </Button>
                                        <Button color="primary">
                                          {trans("Generate")}
                                        </Button>
                                      </ModalFooter>
                                    </Form>
                                  </Modal>
                                  <Modal
                                    isOpen={JsonData}
                                    toggle={GetJsonData}
                                    centered
                                  >
                                    <ModalHeader toggle={GetJsonData}>
                                      {trans("JSON")}
                                    </ModalHeader>
                                    <ModalBody>
                                      <div>
                                        <pre>
                                          {JSON.stringify(InvoiceOrderData)}
                                        </pre>
                                      </div>
                                    </ModalBody>
                                  </Modal>
                                  {InvoiceOrderData != null &&
                                    InvoiceOrderData != undefined && (
                                      <Modal
                                        isOpen={RectifyOrderModal}
                                        toggle={RectifyOrderModaltoggle}
                                        centered
                                      >
                                        <ModalHeader
                                          toggle={RectifyOrderModaltoggle}
                                        >
                                          {trans("Delivery Information")}
                                        </ModalHeader>
                                        <ModalBody>
                                          <div id="data">
                                            <div style={{ padding: "10px" }}>
                                              <div>
                                                <label>
                                                  {trans("COMMENTS")}
                                                </label>
                                                <br />
                                                <textarea
                                                  name="comments"
                                                  className="form-control"
                                                  id="comments"
                                                  cols="30"
                                                  rows="3"
                                                  required
                                                  onChange={(event) =>
                                                    setCommentData(
                                                      event.target.value
                                                    )
                                                  }
                                                ></textarea>
                                              </div>
                                            </div>
                                          </div>
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button
                                            color="secondary"
                                            onClick={RectifyOrderModaltoggle}
                                          >
                                            {trans("Cancel")}
                                          </Button>
                                          <Button
                                            color="primary"
                                            onClick={() =>
                                              SubmitRectifyOrder(
                                                InvoiceOrderData.id
                                              )
                                            }
                                          >
                                            {trans("Confirmed")}
                                          </Button>
                                        </ModalFooter>
                                      </Modal>
                                    )}
                                </Col>
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
                                  {InvoiceOrderItems != null &&
                                    InvoiceOrderItems != undefined &&
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
                                        {/* {order_items != null &&
                                      order_items.length > 0 &&
                                      getCartTotal(order_items)} */}
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
                                        {/* {order_items != null &&
                                      order_items.length > 0 &&
                                      getCartTotal(order_items)} */}
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
                      </Col>
                      <Col md="3">
                        <div
                          className="p-2"
                          style={{
                            border: "1px solid rgb(194, 193, 193)",
                            height: "100%",
                          }}
                        >
                          <VerticalTimeline layout={"1-column"}>
                            {InvoiceOrderData != null &&
                              InvoiceOrderData != undefined ? (
                              InvoiceOrderData.order_status == 1 ? (
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--work"
                                  animate={true}
                                  date={InvoiceOrderData.order_confirmed}
                                  iconStyle={
                                    (InvoiceOrderData.order_status === "1" && {
                                      backgroundColor: "#a927f9",
                                    }) ||
                                    (InvoiceOrderData.order_status === "2" && {
                                      backgroundColor: "#1266F1",
                                    }) ||
                                    (InvoiceOrderData.order_status === "3" && {
                                      backgroundColor: "#00B74A",
                                    }) ||
                                    (InvoiceOrderData.order_status === "4" && {
                                      backgroundColor: "#FFA900",
                                    })
                                  }
                                  icon={<AccessTimeIcon />}
                                >
                                  <h4
                                    className="vertical-timeline-element-subtitle"
                                    style={{
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {InvoiceOrderData.order_status === "1" &&
                                      trans("Confirmed")}
                                    {InvoiceOrderData.order_status === "2" &&
                                      trans("Indelivery")}
                                    {InvoiceOrderData.order_status === "3" &&
                                      trans("Delivered")}
                                    {InvoiceOrderData.order_status === "4" &&
                                      trans("Treated")}
                                  </h4>
                                </VerticalTimelineElement>
                              ) : InvoiceOrderData.order_status == 4 ? (
                                Array.from({ length: 2 }, (item, index) => (
                                  <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    animate={true}
                                    date={
                                      index == 0
                                        ? InvoiceOrderData.order_confirmed
                                        : index == 1 &&
                                        InvoiceOrderData.order_treated
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
                                    <h4
                                      className="vertical-timeline-element-subtitle"
                                      style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {index == 0 && trans("Confirmed")}
                                      {index == 1 && trans("Treated")}
                                    </h4>
                                  </VerticalTimelineElement>
                                ))
                              ) : InvoiceOrderData.order_status == 2 ? (
                                Array.from({ length: 3 }, (item, index) => (
                                  <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    animate={true}
                                    date={
                                      index == 0
                                        ? InvoiceOrderData.order_confirmed
                                        : index == 1
                                          ? InvoiceOrderData.order_treated
                                          : index == 2 &&
                                          InvoiceOrderData.order_indelivery
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
                                    <h4
                                      className="vertical-timeline-element-subtitle"
                                      style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {index == 0 && trans("Confirmed")}
                                      {index == 1 && trans("Treated")}
                                      {index == 2 && trans("Indelivery")}
                                    </h4>
                                  </VerticalTimelineElement>
                                ))
                              ) : (
                                InvoiceOrderData.order_status == 3 &&
                                Array.from({ length: 4 }, (item, index) => (
                                  <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    animate={true}
                                    date={
                                      index == 0
                                        ? InvoiceOrderData.order_confirmed
                                        : index == 1
                                          ? InvoiceOrderData.order_treated
                                          : index == 2
                                            ? InvoiceOrderData.order_indelivery
                                            : index == 3 &&
                                            InvoiceOrderData.order_delivered
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
                                    <h4
                                      className="vertical-timeline-element-subtitle"
                                      style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                      }}
                                    >
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
                  </div>
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

export default translate(SupplierOrderSummary);
