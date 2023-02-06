import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  createRef,
  forwardRef,
} from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  CardHeader,
  Media,
  Form,
  Input,
} from "reactstrap";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import { URL } from "../../env";
import { translate } from "react-switch-lang";
import './orderInvoice.css'

export const OrderInvoice = forwardRef((props, ref) => {
 
  const { id, order_data, order_items, symbol, trans } = props;
  const [JsonData, setJsonData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const GetJsonData = () => setJsonData(!JsonData);

  // const ChangeOrderStatus = async (event) => {
  //   console.log("VALUE", event.target.value);
  // };

  const handleSubmitStatus = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = event.target.order_status.value;
    console.log("handleSubmitStatus", value);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Status !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      console.log("result value", result);
      if (result.value) {
        ChangeOrderStatusClick(value);
      }
    });
  };

  const ChangeOrderStatusClick = async (value) => {
    const res = await axios
      .get(`${URL}/statuschange/${id}/${value}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSSS", response);
        if (response.data.success === true) {
          order_data.order_status = value.toString();
          console.log("ORDERSSSSSSS", order_data);
          SweetAlert.fire({
            icon: "success",
            title: trans("Order") + " " + trans("Status"),
            text:
              trans("Order") +
              " " +
              trans("Status") +
              " " +
              trans("Changed") +
              " " +
              trans("Successfully") +
              " !!",
            confirmButtonText: trans("OK"),
          });
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };


  return (
    <div ref={ref}>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h5>{trans("Invoice")}</h5>
                  </Col>
                  <Col>
                    <Link
                      className="float-right"
                      to={"/ecommerce/orders/list/RD"}
                    >
                      {" "}
                      <Button>{trans("Go Back")}</Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className={trans("Invoice")}>
                  <div>
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
                              {trans("InvoiceHash")}
                              <span className="digits counter">
                                {order_data != null && order_data.order_no}
                              </span>
                            </h3>
                            <p>
                              {trans("Order")} Date:
                              <span className="digits">
                                {order_data != null &&
                                  new Date(order_data.created_at).toUTCString()}
                              </span>
                              <br />
                              {trans("Supplier")}:
                              <span className="digits">
                                {order_data != null && order_data.supplier_name}
                              </span>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr />

                    <Row>
                      <Col md="6">
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
                              {order_data != null && order_data.o_id != null
                                ? order_data.o_first + " " + order_data.o_last
                                : order_data != null &&
                                  order_data.o_id == null &&
                                  order_data.user_name}
                            </h4>
                            <p>
                              {trans("Address")}:
                              <span className="digits">
                                {order_data != null && order_data.o_id == null
                                  ? order_data.address
                                  : order_data != null &&
                                    order_data.o_id != null &&
                                    order_data.custome_address}
                              </span>
                              <br />
                              {trans("Order")} Date:
                              <span className="digits">
                                {order_data != null &&
                                  new Date(order_data.created_at).toUTCString()}
                              </span>
                              <br />
                              {trans("DELIVERY DATE")}:
                              <span className="digits">
                                {order_data != null && order_data.delivery_date}
                              </span>
                            </p>
                          </Media>
                        </Media>
                      </Col>
                      <Col md="1"></Col>
                      <Col md="5">
                        <div className="hide">
                          <Col md="12" style={{ float: "right", padding: 0 }}>
                            <label>{trans("order status")}:</label>
                            <Form onSubmit={handleSubmitStatus}>
                              <div className="row m-0">
                                <div className="col-9 pl-0">
                                  <Input
                                    className="form-control"
                                    type="select"
                                    innerRef={register({ required: true })}
                                    name="order_status"
                                    // onChange={(event) => ChangeOrderStatus(event)}
                                  >
                                    <option
                                      value="0"
                                      defaultValue={
                                        order_data != null &&
                                        order_data.order_status == "0"
                                      }
                                      selected={
                                        order_data != null &&
                                        order_data.order_status == "0"
                                      }
                                    >
                                      {trans("Pending")}
                                    </option>
                                    <option
                                      value="1"
                                      defaultValue={
                                        order_data != null &&
                                        order_data.order_status == "1"
                                      }
                                      selected={
                                        order_data != null &&
                                        order_data.order_status == "1"
                                      }
                                    >
                                      {trans("Confirmed")}
                                    </option>
                                    <option
                                      value="2"
                                      defaultValue={
                                        order_data != null &&
                                        order_data.order_status == "2"
                                      }
                                      selected={
                                        order_data != null &&
                                        order_data.order_status == "2"
                                      }
                                    >
                                      {trans("Indelivery")}
                                    </option>
                                    <option
                                      value="3"
                                      defaultValue={
                                        order_data != null &&
                                        order_data.order_status == "3"
                                      }
                                      selected={
                                        order_data != null &&
                                        order_data.order_status == "3"
                                      }
                                    >
                                      {trans("Delivered")}
                                    </option>
                                  </Input>
                                </div>
                                <div className="col-3">
                                  <Button type="submit">
                                    {trans("Submit")}
                                  </Button>
                                </div>
                              </div>
                            </Form>
                            <Button className="mt-2 mr-2" onClick={GetJsonData}>
                              JSON
                            </Button>
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
                                  <pre>{JSON.stringify(order_data)}</pre>
                                </div>
                              </ModalBody>
                            </Modal>
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
                                <h6 className="p-2 mb-0">{trans("Name")}</h6>
                              </td>
                              <td className="quantity">
                                <h6 className="p-2 mb-0">
                                  {trans("Quantity")}
                                </h6>
                              </td>
                              <td className="Rate">
                                <h6 className="p-2 mb-0">{trans("Price")}</h6>
                              </td>
                              <td className="subtotal">
                                <h6 className="p-2 mb-0">Sub Total</h6>
                              </td>
                            </tr>
                            {order_items != null &&
                              order_items.length > 0 &&
                              order_items.map((item, index) => (
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
                                      {" " + symbol}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="itemtext digits">
                                      {item.unit_price * item.quantity}
                                      {" " + symbol}
                                    </p>
                                  </td>
                                </tr>
                              ))}
                            <tr>
                              <td colSpan={3} className="text-md-right">
                                Sub Total
                              </td>
                              <td className="payment digits">
                                <p className="itemtext digits">
                                  {/* {order_items != null &&
                                    order_items.length > 0 &&
                                  getCartTotal(order_items)} */}
                                  {order_data != null && order_data.total}
                                  {" " + symbol}
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
                                  {order_data != null && order_data.discount}
                                  {" " + symbol}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="text-md-right">
                                Grand Total
                              </td>
                              <td className="payment digits">
                                <p className="itemtext digits">
                                  {order_data != null &&
                                    order_data.grand_total -
                                      order_data.discount}
                                  {" " + symbol}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
});
const PrintComponent = (props) => {
  const trans = props.t;
  // const cart = useSelector((content) => content.Cartdata.cart);
  // const symbol = useSelector((content) => content.data.symbol);
  const componentRef = useRef();

  const params = useParams();

  const [InvoiceOrderData, setInvoiceOrderData] = useState(null);
  const [InvoiceOrderItems, setInvoiceOrderItems] = useState(null);

  useEffect(() => {
    const getInvoiceDataById = async () => {
      axios
        .get(`${URL}/viewinvoice/${params.idd}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("INVOICE ---- ", response);
          setInvoiceOrderData(response.data.order);
          setInvoiceOrderItems(response.data.order_items);
        })
        .catch((error) => {
          console.log("ERROR --- ", error);
        });
    };
    getInvoiceDataById();
  }, []);
  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Invoice")} />
      <OrderInvoice
        id={params.idd}
        order_data={InvoiceOrderData}
        order_items={InvoiceOrderItems}
        symbol={"€"}
        trans={trans}
        ref={componentRef}
      />
      <Col sm="12" className="text-center my-3">
        <ReactToPrint
          trigger={() => (
            <Button color="primary" className="mr-2">
              {trans("Print")}
            </Button>
          )}
          content={() => componentRef.current}
        />
        {/* <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/product`}>
          <Button color="secondary">{trans("Cancel")}</Button>
        </Link> */}
      </Col>
    </Fragment>
  );
};

export default translate(PrintComponent);
