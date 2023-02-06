/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Input,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Button,
  Badge,
  Table,
  CardFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";
import "./rectify_order_cart.css";
import { useTranslation, } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/dataTable/dataTable";
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";
import { SupplierCustomerCartTotal } from "../../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";
import { RectifyOrderDataAction, DeleteRectifyOrderAction } from "../../../redux/Pages/SupplierCustomer/Rectify/RectifyAction";
import { RemoveRectifyAction } from "../../../redux/Pages/SupplierCustomer/Rectify/RemoveRectifyAction"
import { ConfirmRectifyOrderAction } from "../../../redux/Pages/SupplierCustomer/Rectify/ConfirmRectifyOrderAction"

const RectifyOrderCart = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const [myCart, setMyCart] = useState(1);

  const getRectifyData = useSelector((state) => state.getRectifyData)
  const RectifyOrderData = getRectifyData.rectifyOrderList;

  const [Verticalcenter, setVerticalcenter] = useState(false);
  const [DefaultDeliveryDate, setDefaultDeliveryDate] = useState(null);
  const [CommentData, setCommentData] = useState(null);
  const [orderId, setOrderId] = useState();


  const Verticalcentermodaltoggle = () => {
    setVerticalcenter(!Verticalcenter);
    //order_id --- user_id --- message
    // axios
    //   .post(URL + "/get_rule", {
    //     suppliers_id: suppliers_id,
    //     customer_id: atob(localStorage.getItem("user_id")),
    //   })
    //   .then((response) => {});
  };

  const navigate = useNavigate();

  const ChangeDeliveryDate = (event) => {
    setDefaultDeliveryDate(event.target.value);
  };

  const SubmitDeliveryCompanyData = async (order_id) => {
    const user_id = atob(localStorage.getItem("user_id"));

    const ConfirmRectifyOrderResponse = await ConfirmRectifyOrderAction(user_id, order_id, CommentData)
    if (ConfirmRectifyOrderResponse?.data?.success == true) {
      //   const GetCartCount = async () => {
      //     axios
      //       .get(URL + "/supplier_cart_items", {
      //         params: { user_id: atob(localStorage.getItem("user_id")) },
      //       })
      //       .then((response) => {
      //         dispatch(SupplierCustomerCartTotal(response.data));
      //       });
      //   };
      //   GetCartCount();
      //   setVerticalcenter(!Verticalcenter);
      navigate("/customer/suppliers/orders");
    } else if (ConfirmRectifyOrderResponse?.data?.error == true) {
      toast.error(trans(ConfirmRectifyOrderResponse?.data?.message ?? "failed"));
    } else {
      toast.error(trans("failed"));
    }

  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns_2 = [
    {
      field: "index",
      title: trans("#"),
      width: 100,
      flex: 1,
    },
    {
      field: "supplier_name",
      title: trans("Supplier"),
      width: 300,
      flex: 3,
      render: (cellValues) => {
        return <h6>{cellValues.order.supplier_name.split("=====")[0]}</h6>;
      },
    },
    {
      field: "total",
      title: trans("Total") + " " + "€",
      width: 140,
      flex: 1.4,
      render: (cellValues) => {
        return (
          <h6>
            {cellValues.order.total} {"€"}
          </h6>
        );
      },
    },
    {
      field: "actions",
      title: trans("Action"),
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <>
            {/* <div className="modify_button_wrapped">
              <Link
                to={`/supplier_customers/rectify_orders/list/${cellValues.order.id}`}
              >
                <Button
                  className="mr-2 fa fa-eye btn-primary py-2"
                  color="primary"
                >
                  {" "}
                </Button>
              </Link>
            </div> */}
            <span className="modify_button_wrapped">
              <Link
                to={{
                  pathname: `/customer/suppliers/rectify_orders/edit/${cellValues.order.supplier_name.split("=====")[1]
                    }/`,
                  state: { order_id: cellValues.order.id },
                }}
              >
                <Button className="mr-2 fa fa-pencil-square-o btn-secondary py-2"></Button>
              </Link>
            </span>
            <span className="modify_button_wrapped mr-3">
              <Button
                className="fa fa-check py-2 btn-success"
                color="success"
                onClick={Verticalcentermodaltoggle}
              >
                {/* {trans("Confirmed")} */}
              </Button>
              <Modal
                isOpen={Verticalcenter}
                toggle={Verticalcentermodaltoggle}
                centered
              >
                <ModalHeader toggle={Verticalcentermodaltoggle}>
                  {trans("Delivery Information")}
                </ModalHeader>
                <ModalBody>
                  <div id="data">
                    <div style={{ padding: "10px" }}>
                      <div>
                        <label>{trans("COMMENTS")}</label>
                        <br />
                        <textarea
                          name="comments"
                          className="form-control"
                          id="comments"
                          cols="30"
                          rows="3"
                          required
                          onChange={(event) =>
                            setCommentData(event.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={Verticalcentermodaltoggle}>
                    {trans("Cancel")}
                  </Button>
                  <Button
                    color="success"
                    onClick={() =>
                      SubmitDeliveryCompanyData(cellValues.order.id)
                    }
                  >
                    {trans("Confirmed")}
                  </Button>
                </ModalFooter>
              </Modal>
            </span>
          </>
        );
      },
    },
  ];

  const columns = [
    {
      field: "product_name",
      title: trans("Name"),
      // width: 120,
      flex: 2,
      render: (cellValues) => {
        return <h6>{cellValues.product_name}</h6>;
      },
      valueGetter: (cellValues) => cellValues.product_name,
    },
    {
      field: "quantity",
      title: trans("Required Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "min_quantity",
      title: trans("Minimum Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "unit_price",
      title: trans("Price (€)"),
      flex: 1,
    },
    {
      field: "total",
      title: trans("Total (€)"),
      // width: 100,
      flex: 1,
      render: (cellValues) => {
        return (
          <h6>
            {parseFloat(cellValues.unit_price) *
              parseFloat(cellValues.quantity)}
          </h6>
        );
      },
      valueGetter: (cellValues) => {
        return (
          parseFloat(cellValues.unit_price) *
          parseFloat(cellValues.quantity)
        );
      },
    },
    {
      field: "action",
      title: trans("Action"),
      flex: 1,
      render: (cellValues) => {
        return (
          <Button
            color="danger"
            outline
            onClick={() => DeleteProduct(cellValues)}
          >
            <i className="fa fa-times"></i>
          </Button>
        );
      },
    },
  ];

  const DeleteProduct = async (row) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {

        const removeRectifyResponse = await RemoveRectifyAction(row.order_id, row.product_id)
        if (removeRectifyResponse?.data?.success == true) {
          DeleteCartProduct(row);
          //   const GetCartCount = async () => {
          //     axios
          //       .get(URL + "/supplier_cart_items", {
          //         params: { user_id: atob(localStorage.getItem("user_id")) },
          //       })
          //       .then((response) => {
          //         dispatch(SupplierCustomerCartTotal(response.data));
          //       });
          //   };
          //   GetCartCount();
          toast.success(
            trans("Rectify Order Item Is Removed Successfully")
          );
        } else if (removeRectifyResponse?.data?.error == true) {
          toast.error(trans(removeRectifyResponse?.data?.message ?? "failed"));
        } else {
          toast.error(trans("failed"));
        }
      }
    });
  };

  const DeleteCartProduct = (row) => {
    const deleted_order_product = [...RectifyOrderData];
    const find_order_array_index = deleted_order_product.findIndex(
      (item) => item.order.id == row.order_id
    );
    if (deleted_order_product[find_order_array_index].order_items.length > 1) {
      const find_delete_cart_item = deleted_order_product[
        find_order_array_index
      ].order_items.find((item) => item.id == row.id);
      deleted_order_product[find_order_array_index].order.total =
        deleted_order_product[find_order_array_index].order.total -
        parseFloat(find_delete_cart_item.quantity) *
        parseFloat(find_delete_cart_item.unit_price);
      deleted_order_product[find_order_array_index].order.grand_total =
        deleted_order_product[find_order_array_index].order.grand_total -
        parseFloat(find_delete_cart_item.quantity) *
        parseFloat(find_delete_cart_item.unit_price);
      const delete_cart_item = deleted_order_product[
        find_order_array_index
      ].order_items.filter((item) => item.id != row.id);
      deleted_order_product[find_order_array_index].order_items =
        delete_cart_item;
    } else {
      deleted_order_product.splice(find_order_array_index, 1);
    }
    // setRectifyOrderData([]);
    // setRectifyOrderData(deleted_order_product);
    dispatch(DeleteRectifyOrderAction(row))
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      dispatch(RectifyOrderDataAction());
    } else {
      toast.error(trans("Please Login To Continue"));
    }
  }, []);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Supplier Customer")}
          title={trans("Customer Rectify Order")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h5>{trans("Customer Rectify Order")}</h5>
                  </div>
                </CardHeader> */}
                {RectifyOrderData == null || RectifyOrderData.length == 0 ? (
                  <CardBody>
                    <h5>{trans("Cart Empty")}</h5>
                  </CardBody>
                ) : (
                  // <Card className="cust_delivery__company__card">
                  <CardBody>
                    {RectifyOrderData != null && (
                      <DataTable
                        columns={columns_2}
                        data={RectifyOrderData}
                      ></DataTable>
                    )}
                  </CardBody>
                  //   <CardFooter className="confirm__button__wrapped__footer"></CardFooter>
                  // </Card>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default RectifyOrderCart;
