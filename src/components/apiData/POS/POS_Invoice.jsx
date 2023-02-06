/* eslint-disable react/jsx-pascal-case */
import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  forwardRef,
} from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  CardHeader,
  Media,
} from "reactstrap";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";

export const POS_Invoice = forwardRef((props, ref) => {
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

  return (
    <div ref={ref}>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h5>{trans("POS Invoice")}</h5>
                  </Col>
                  <Col>
                    <Link className="float-right" to={"/pos/orders/list"}>
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
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr />

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
                                {trans("Sub Total")}
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
                            {/* <tr>
                              <td colSpan={3} className="text-md-right">
                                {trans("Discount")}
                              </td>
                              <td className="payment digits">
                                <p className="itemtext digits">
                                  {order_data != null && order_data.discount}
                                  {" " + symbol}
                                </p>
                              </td>
                            </tr> */}
                            <tr>
                              <td colSpan={3} className="text-md-right">
                                {trans("Customer Pay")}
                              </td>
                              <td className="payment digits">
                                <p className="itemtext digits">
                                  {order_data != null &&
                                    order_data.customer_pay}
                                  {" " + symbol}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="text-md-right">
                                {trans("Return Amount")}
                              </td>
                              <td className="payment digits">
                                <p className="itemtext digits">
                                  {order_data != null && order_data.return}
                                  {" " + symbol}
                                </p>
                              </td>
                            </tr>
                            {/* <tr>
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
                            </tr> */}
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
  const { t } = useTranslation();
  const trans = t;
  // const cart = useSelector((content) => content.Cartdata.cart);
  // const symbol = useSelector((content) => content.data.symbol);
  const componentRef = useRef();

  const params = useParams();

  const [InvoiceOrderData, setInvoiceOrderData] = useState(null);
  const [InvoiceOrderItems, setInvoiceOrderItems] = useState(null);

  useEffect(() => {
    const getInvoiceDataById = async () => {
      axios
        .get(`${URL}/view_sale/${params.idd}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          setInvoiceOrderData(response.data.sale);
          setInvoiceOrderItems(response.data.sale_items);
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
      <POS_Invoice
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

export default PrintComponent;
