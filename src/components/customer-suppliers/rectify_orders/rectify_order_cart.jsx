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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import "./rectify_order_cart.css";
import { translate } from "react-switch-lang";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../dataTable/dataTable";
import axios from "axios";
import { URL } from "../../../env";

import SweetAlert from "sweetalert2";

import { SupplierCustomerCartTotal } from "../../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";

const rectify_order_cart = (props) => {
  const trans = props.t;

  const [myCart, setMyCart] = useState(1);

  const [RectifyOrderData, setRectifyOrderData] = useState([]);

  const [Verticalcenter, setVerticalcenter] = useState(false);

  const [DefaultDeliveryDate, setDefaultDeliveryDate] = useState(null);

  const [CommentData, setCommentData] = useState(null);

  const [orderId, setOrderId] = useState();

  const dispatch = useDispatch();

  // const Verticalcentermodaltoggle = (delivery_company_id) => {
  //   setVerticalcenter(!Verticalcenter);
  // };

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
    // console.log("DEF DEVV DATE", event.target.value);
    setDefaultDeliveryDate(event.target.value);
  };

  const SubmitDeliveryCompanyData = (order_id) => {
    console.log("CARTS IDDD SUBMIT ---- ", order_id);
    console.log(
      "CUSTOMER ID SUBMIT --- ",
      atob(localStorage.getItem("user_id"))
    );

    console.log("DELIVERY COMMENT DATA ---- ", CommentData);

    const user_id = atob(localStorage.getItem("user_id"));

    axios
      .get(URL + `/confirm_rectify_orders`, {
        params: { user_id: user_id, order_id: order_id, message: CommentData },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESPONSE ORDER ---", response);
        if (response.data.success) {
          //   const GetCartCount = async () => {
          //     axios
          //       .get(URL + "/supplier_cart_items", {
          //         params: { user_id: atob(localStorage.getItem("user_id")) },
          //       })
          //       .then((response) => {
          //         console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);
          //         dispatch(SupplierCustomerCartTotal(response.data));
          //       });
          //   };
          //   GetCartCount();
          //   setVerticalcenter(!Verticalcenter);
          navigate("/supplierCustomerOrder/RD");
        }
       else{
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
       }
      }).catch((error)=>{
        // toast.error(trans("failed"), {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      })
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns_2 = [
    {
      field: "id",
      headerName: trans("#"),
      width: 100,
    },
    {
      field: "supplier_name",
      headerName: trans("Supplier"),
      width: 300,
      renderCell: (cellValues) => {
        return <h6>{cellValues.row.order.supplier_name.split("=====")[0]}</h6>;
      },
    },
    {
      field: "total",
      headerName: trans("Total") + " " + "€",
      width: 140,
      renderCell: (cellValues) => {
        return (
          <h6>
            {cellValues.row.order.total} {"€"}
          </h6>
        );
      },
    },
    {
      field: "actions",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        console.log("celll values", cellValues)
        return (
          <>
            {/* <div className="modify_button_wrapped">
              <Link
                to={`/supplierCustomerRectifyOrderView/${cellValues.row.order.id}/RD`}
              >
                <Button
                  className="mr-2 fa fa-eye btn-primary py-2"
                  color="primary"
                >
                  {" "}
                </Button>
              </Link>
            </div> */}
            <div className="modify_button_wrapped">
              <Link
                to={{
                  pathname: `/supplierCustomerEditRectifyOrder/${
                    cellValues.row.order.supplier_name.split("=====")[1]
                  }/RD/`,
                  state: { order_id: cellValues.row.order.id },
                }}
              >
                <Button className="mr-2 fa fa-pencil-square-o btn-secondary py-2"></Button>
              </Link>
            </div>
            <div className="modify_button_wrapped mr-3">
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
                  <Button color="secondary" onClick={Verticalcentermodaltoggle}>
                    {trans("Cancel")}
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => SubmitDeliveryCompanyData(cellValues.row.order.id)}
                  >
                    {trans("Confirmed")}
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </>
        );
      },
    },
  ];

  const columns = [
    {
      field: "product_name",
      headerName: trans("Name"),
      // width: 120,
      flex: 2,
      renderCell: (cellValues) => {
        return <h6>{cellValues.row.product_name}</h6>;
      },
      valueGetter: (cellValues) => cellValues.row.product_name,
    },
    {
      field: "quantity",
      headerName: trans("Required Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "min_quantity",
      headerName: trans("Minimum Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "unit_price",
      headerName: trans("Price (€)"),
      flex: 1,
    },
    {
      field: "total",
      headerName: trans("Total (€)"),
      // width: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <h6>
            {parseFloat(cellValues.row.unit_price) *
              parseFloat(cellValues.row.quantity)}
          </h6>
        );
      },
      valueGetter: (cellValues) => {
        return (
          parseFloat(cellValues.row.unit_price) *
          parseFloat(cellValues.row.quantity)
        );
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
            color="danger"
            outline
            onClick={() => DeleteProduct(cellValues.row)}
          >
            <i className="fa fa-times"></i>
          </Button>
        );
      },
    },
  ];

  const DeleteProduct = async (row) => {
    console.log("ROWWW -DELETEDD --- ", row);
    console.log("CART DATAAA ---- default22 ---- ", RectifyOrderData);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then((result) => {
      console.log("CART DATAAAAA ---- ", RectifyOrderData);
      // console.log("RESULTTTT ", result);
      if (result.value) {
        axios
          .get(URL + `/removerectify/${row.order_id}/${row.product_id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            console.log("DELETE PRODUCT RECTIFY RESPONSE ---- ", response);
            if (response.data.success == true) {
              DeleteCartProduct(row);
              //   const GetCartCount = async () => {
              //     axios
              //       .get(URL + "/supplier_cart_items", {
              //         params: { user_id: atob(localStorage.getItem("user_id")) },
              //       })
              //       .then((response) => {
              //         console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

              //         dispatch(SupplierCustomerCartTotal(response.data));
              //       });
              //   };
              //   GetCartCount();
              toast.success(
                trans("Rectify Order Item Is Removed Successfully")
              );
            }
          })
          .catch((error) => {
            console.log("ERROR ---- ", error);
          });
      }
    });
  };

  const DeleteCartProduct = (row) => {
    const deleted_order_product = [...RectifyOrderData];
    console.log("DELETED CART PRODUCYT --- ", deleted_order_product);
    const find_order_array_index = deleted_order_product.findIndex(
      (item) => item.order.id == row.order_id
    );
    console.log("FIND_CART ARRAY INDEX --- ", find_order_array_index);
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
    console.log("DELETED CART PRODUCT ---- ", deleted_order_product);
    // setRectifyOrderData([]);
    setRectifyOrderData(deleted_order_product);
  };

  useEffect(() => {
    const getCustomerCart = async () => {
      if (localStorage.getItem("user_id") != null) {
        axios
          .get(URL + "/rectify", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            console.log("RESPONSE CART ----", response);

            // const delivery_companies_id = response.data.cart_page_array.map(
            //   (item) => item.delivery_company.delivery_company_id
            // );
            // // console.log("DELIVERY COMMM ---- ", delivery_companies_id);
            // const delivery_company_duplication_state =
            //   delivery_companies_id.map(
            //     (item, index) => delivery_companies_id.indexOf(item) != index
            //   );

            response.data.all_data.map(
              (item, index) => (item["id"] = index + 1)
            );
            setRectifyOrderData(response.data.all_data);
          })
          .catch((error) => {
            console.log("ERROR --- ", error);
          });
      } else {
        toast.error(trans("Please Login To Continue"));
      }
    };
    getCustomerCart();
  }, []);

  console.log("CART DATAAA ---- default ---- ", RectifyOrderData);

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
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h5>{trans("Customer Rectify Order")}</h5>
                  </div>
                </CardHeader>
                {RectifyOrderData == null || RectifyOrderData.length == 0 ? (
                  <CardBody>
                    <h5>{trans("Cart Empty")}</h5>
                  </CardBody>
                ) : (
                  <Card className="cust_delivery__company__card">
                    <CardBody>
                      {RectifyOrderData != null && (
                        <DataTable
                          columns={columns_2}
                          rows={RectifyOrderData}
                        ></DataTable>
                      )}
                      {/* {RectifyOrderData.map((item, index) => {
                        return (
                          item.order_items.length > 0 && (
                            <Accordion
                              className="accordion"
                              defaultActiveKey={item.id}
                            >
                              <AccordionSummary
                                className="cust_delivery__company__card__AccordionSummary"
                                expandIcon={
                                  <i
                                    className="fa fa-chevron-down"
                                    style={{ color: "#fff" }}
                                  ></i>
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>
                                  <Row>
                                    <Col md="8">
                                      <h5 style={{ color: "#fff" }}>
                                        {trans("Supplier")}:{" "}
                                        {
                                          item.order.supplier_name.split(
                                            "====="
                                          )[0]
                                        }
                                      </h5>
                                    </Col>
                                    <Col md="4">
                                      <h5 style={{ color: "#fff" }}>
                                        Total:{" "}
                                        <span>
                                          {parseFloat(item.order.total)}
                                        </span>
                                      </h5>
                                    </Col>
                                  </Row>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <div>
                                    <Card className="cust_delevery_supplier_details_table">
                                      <DataTable
                                        columns={columns}
                                        rows={item.order_items}
                                      ></DataTable>
                                      <div className="d-flex flex-direction-row justify-content-end mb-3">
                                        <div className="modify_button_wrapped">
                                          <Link
                                            to={`/supplierCustomerEditRectifyOrder/${item.order.supplier_name.split(
                                              "====="
                                            )[1]
                                              }/RD`}
                                          >
                                            <Button className="mr-2">
                                              {trans("Modify")}
                                            </Button>
                                          </Link>
                                        </div>
                                        <div className="modify_button_wrapped mr-3">
                                          <Button
                                            color="primary"
                                            onClick={Verticalcentermodaltoggle}
                                          >
                                            {trans("Confirmed")}
                                          </Button>
                                          <Modal
                                            isOpen={Verticalcenter}
                                            toggle={Verticalcentermodaltoggle}
                                            centered
                                          >
                                            <ModalHeader
                                              toggle={Verticalcentermodaltoggle}
                                            >
                                              {trans("Delivery Information")}
                                            </ModalHeader>
                                            <ModalBody>
                                              <div id="data">
                                                <div
                                                  style={{ padding: "10px" }}
                                                >
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
                                                onClick={
                                                  Verticalcentermodaltoggle
                                                }
                                              >
                                                {trans("Cancel")}
                                              </Button>
                                              <Button
                                                color="primary"
                                                onClick={() =>
                                                  SubmitDeliveryCompanyData(
                                                    item.order.id
                                                  )
                                                }
                                              >
                                                {trans("Confirmed")}
                                              </Button>
                                            </ModalFooter>
                                          </Modal>
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          )
                        );
                      })} */}
                    </CardBody>
                    <CardFooter className="confirm__button__wrapped__footer"></CardFooter>
                  </Card>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(rectify_order_cart);
