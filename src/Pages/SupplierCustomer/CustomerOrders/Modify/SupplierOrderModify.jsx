/* eslint-disable no-unused-vars */
import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
} from "react";
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
  Form,
  Input,
} from "reactstrap";
import SweetAlert from "sweetalert2";
import { Link, useNavigate, } from "react-router-dom";
import {
  Sub_total,
} from "../../../../constant";
import {
  PlusCircle,
  MinusCircle,
} from "react-feather";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import "../customer_orders.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SupplierOrderItemModifyAction,
  SupplierOrderItemRemoveAction,
  SubmitModifiedSupplierOrderItemAction
} from "../../../../redux/Pages/SupplierCustomer/CustomerOrders/Modify/SupplierOrderModifiyAction"
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const SupplierOrderModify = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { color } = useSelector((state) => state.Customizer);

  const SupplierOrderModifiyData = useSelector((state) => state.getSupplierOrderModifiy);
  const SupplierOrder = SupplierOrderModifiyData?.order ?? null;
  const SupplierOrderItems = SupplierOrderModifiyData?.order_items ?? null;
  const user = SupplierOrderModifiyData?.user ?? null;
  const StoreData = SupplierOrderModifiyData?.store ?? null;
  const invoiceTimeline = SupplierOrderModifiyData?.timeline ?? null;

  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [grandTotalPrice, setGrandTotalPrice] = useState(0);

  useEffect(() => {
    if (SupplierOrderItems != null) {
      let tempListSubTotal = 0;
      SupplierOrderItems.map((item) => {
        tempListSubTotal = tempListSubTotal + (parseFloat(item.unit_price) * parseInt(item.quantity))
      })
      setSubTotalPrice(tempListSubTotal.toFixed(2))

      let totalDiscountAmount = 0;
      let tempGrandTotal = 0;

      if (SupplierOrder != null && SupplierOrder.discount != 0) {
        if (SupplierOrder.coupon_symbol == "%") {
          totalDiscountAmount = tempListSubTotal * SupplierOrder.discount / 100;
        } else {
          totalDiscountAmount = SupplierOrder.discount;
        }
      }
      tempGrandTotal = tempListSubTotal - totalDiscountAmount;
      setGrandTotalPrice(tempGrandTotal);
    }

  }, [SupplierOrderItems])

  let componentRef = useRef();
  const printFunc = () => {
    var content = document.getElementById("invoice").printElement();
  };

  const splitNumber = (val) => {
    return val.toString().replaceAll('.', trans("dot"))
  }

  const ModifyProducts = (props) => {
    const { curr_id, curr_quantity, order_items, order_data } = props;

    const ProdDecrement = () => {
      if (curr_quantity > 1) {
        dispatch(SupplierOrderItemModifyAction(curr_id))
      } else {
        if (curr_quantity > 0) {
          SweetAlert.fire({
            title: trans("Are you sure?"),
            text: trans("Do you want to remove this Product?"),
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: trans("Cancel"),
            confirmButtonText: trans("Remove"),
            reverseButtons: true,
          }).then((result) => {
            if (result.value) {
              dispatch(SupplierOrderItemRemoveAction(curr_id))
            }
          });
        }
      }
    }

    return (
      <div className="modifier_box d-flex align-items-center">
        <p className="pl-0 mr-1 mb-0 border_ border-dark_ rounded-0"
          style={{ width: 50 }}>{curr_quantity}</p>
        <span className="btn_quantity_minus px-1 mt-1" onClick={ProdDecrement}>
          <MinusCircle />
        </span>
      </div>
    )
  };

  const handleDeleteProduct = (data) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to remove this Product?"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Remove"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        dispatch(SupplierOrderItemRemoveAction(data.id))
      }
    });
  }

  const onSubmitInvoice = (event) => {
    event.preventDefault();

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to modify the order invoice?"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Modify"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        ModifyOrderInvoice();
      }
    });
  }

  const ModifyOrderInvoice = async () => {

    const order = {
      id: SupplierOrder.id
    };

    const order_items = [];
    SupplierOrderItems.map((item) => order_items.push({ id: item.id, quantity: parseInt(item.quantity) }))

    const formData = new FormData();
    formData.append("order", JSON.stringify(order));
    formData.append("order_items", JSON.stringify(order_items));

    dispatch(SubmitModifiedSupplierOrderItemAction(formData))

  }


  return (
    <Fragment>
      <Container fluid={false} className="mb-5">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                {/* <h5>{trans("Customer Invoice")}</h5> */}
                <h5 style={{ textTransform: 'capitalize' }}>{trans("Supplier Order Modification")}</h5>
              </CardHeader>
              <CardBody className="mb-0 pb-0">
                <Row className="m-0">
                  <Col sm="12" md="12" className="mb-3 px-2" id="invoice">
                    <div
                      className="Customer Invoice pt-4"
                      ref={(el) => (componentRef = el)}
                      style={{ border: "1px solid rgb(194, 193, 193)" }}
                    >
                      <div>
                        <div>
                          <Row>
                            <Col sm="4">
                              <Media>
                                <Media body className="m-l-20">
                                  <h4 className="media-heading">
                                    {"Royal Donuts"}
                                  </h4>
                                  {StoreData != null && (
                                    <p>
                                      {StoreData?.name_fr}
                                      <br />
                                    </p>
                                  )}
                                </Media>
                              </Media>
                            </Col>
                            <Col sm="8">
                              <div className="text-md-right pr-2">
                                <h3 style={{ fontSize: '1.5 rem' }}>
                                  {trans("Order")} {"# "}
                                  <span className="digits counter">
                                    {SupplierOrder != null &&
                                      SupplierOrder.order_number}
                                  </span>
                                </h3>
                                <p>
                                  <span style={{ fontWeight: 700 }}>
                                    {trans("Order Date")}
                                    {":   "}
                                  </span>
                                  <span className="digits">
                                    {SupplierOrder != null &&
                                      new Date(SupplierOrder.created_at)
                                        .toUTCString()
                                        .slice(0, 16)}
                                  </span>
                                  <br />
                                  <span style={{ fontWeight: 700 }}>
                                    {trans("Delivery Date")}
                                    {":   "}
                                  </span>
                                  <span className="digits">
                                    {SupplierOrder != null &&
                                      new Date(SupplierOrder.delivery_date)
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
                          <Col md="12">
                            <Media>
                              <Media body className="m-l-20">
                                <h4 className="media-heading">
                                  {SupplierOrder != null &&
                                    SupplierOrder.user_name}
                                </h4>
                                <p>
                                  <span style={{ fontWeight: 700 }}>
                                    {trans("Supplier Name")}
                                    {":  "}
                                  </span>
                                  <span className="digits">
                                    {SupplierOrder != null &&
                                      SupplierOrder.supplier_name}
                                  </span>
                                  <br />
                                  <span style={{ fontWeight: 700 }}>
                                    {trans("Customer Name")}
                                    {":  "}
                                  </span>
                                  <span className="digits">
                                    {SupplierOrder != null &&
                                      SupplierOrder.user_name}
                                  </span>
                                  <br />
                                  <span style={{ fontWeight: 700 }}>
                                    {trans("Customer")} {trans("Address")}
                                    {":  "}
                                  </span>
                                  <span className="digits">
                                    {user != null && user.address},{" "}
                                    {user !== null && user.city},{" "}
                                    {user !== null && user.zip_code}
                                    {user != null && ",  " && user?.country}
                                  </span>
                                </p>
                              </Media>
                            </Media>
                          </Col>
                          <Col md="3">
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
                                  <td></td>
                                  <td className="item">
                                    <h6 className="py-2 mb-0">
                                      {trans("Product")} {trans("Name")}
                                    </h6>
                                  </td>
                                  <td className="quantity">
                                    <h6 className="py-2 mb-0">
                                      {trans("Quantity")}
                                    </h6>
                                  </td>
                                  <td className="Rate">
                                    <h6 className="py-2 mb-0">
                                      {trans("Price")}
                                    </h6>
                                  </td>
                                  <td className="subtotal">
                                    <h6 className="py-2 mb-0">
                                      {trans("Product")} {Sub_total}
                                    </h6>
                                  </td>
                                </tr>
                                {SupplierOrderItems !== null &&
                                  SupplierOrderItems.map((item, index) => {
                                    if (parseInt(item.quantity) > 0) {
                                      return (
                                        <tr key={item.id}>
                                          <td>
                                            <Button color="danger"
                                              className="px-2 py-1"
                                              onClick={() => handleDeleteProduct(item)}>
                                              <span className="fa fa-trash"></span>
                                            </Button>
                                          </td>
                                          <td>
                                            <label>{item.product_name}</label>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {/* {item.quantity} */}
                                              <ModifyProducts curr_id={item.id}
                                                curr_quantity={item.quantity}
                                                order_items={SupplierOrderItems}
                                                order_data={SupplierOrder} />
                                            </p>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {splitNumber(item.unit_price)}
                                              {" " + "€"}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="itemtext digits">
                                              {splitNumber((
                                                item.unit_price * item.quantity
                                              ).toFixed(2))}
                                              {" " + "€"}
                                            </p>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  })}
                                <tr>
                                  <td colSpan={3} className="text-md-right">
                                    {trans("SubTotal")}
                                  </td>
                                  <td className="payment digits">
                                    <p className="itemtext digits">
                                      {/* {InvoiceOrderData != null &&
                                          splitNumber(parseFloat(InvoiceOrderData.total).toFixed(2))} */}
                                      {parseFloat(subTotalPrice).toFixed(2)}
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
                                      {SupplierOrder != null &&
                                        SupplierOrder.discount}
                                      {" " + "€"}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={3} className="text-md-right">
                                    {trans("Total")}
                                  </td>
                                  <td className="payment digits">
                                    <p>
                                      {/* {
                                          InvoiceOrderData && InvoiceOrderData.grand_total ? splitNumber(parseFloat(InvoiceOrderData.grand_total).toFixed(2)) : 0
                                        } */}
                                      {parseFloat(grandTotalPrice).toFixed(2)}
                                      {" " + "€"}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" className="text-center my-3" style={{ marginBottom: 200 }}>
            <Form onSubmit={onSubmitInvoice}>
              <Button color="primary">
                {trans("Submit")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SupplierOrderModify;
