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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "./rectify_order_cart.css";
import { translate } from "react-switch-lang";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "../../dataTable/dataTable";
import axios from "axios";
import { URL } from "../../../env";

import SweetAlert from "sweetalert2";

import { SupplierCustomerCartTotal } from "../../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";

const rectify_order_cart_view = (props) => {
  const trans = props.t;

  const params = useParams();
  const params_order_id = params.id

  const [RectifyOrderData, setRectifyOrderData] = useState([]);
  const [RectifyOrderItemData, setRectifyOrderItemData] = useState([]);

  const [Verticalcenter, setVerticalcenter] = useState(false);

  const [DefaultDeliveryDate, setDefaultDeliveryDate] = useState(null);

  const [CommentData, setCommentData] = useState(null);

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
      });
  };

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

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
        )
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            {
              (role == "SuperAdmin" || (permissions.match("delete") != null)) && <Button
                color="danger"
                outline
                onClick={() => DeleteProduct(cellValues.row)}
              >
                <i className="fa fa-times"></i>
              </Button>
            }
          </>
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
            const allData = response.data.all_data;
            setRectifyOrderData(allData);

            const filterData = allData.filter((item) => (item.order_items.order_id == params_order_id))
            setRectifyOrderItemData(filterData)
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
  console.log("RectifyOrderItemData ---- ", RectifyOrderItemData);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Supplier Customer")}
          title={trans("Customer Rectify Order") + " " + trans("View")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h5>{trans("Customer Rectify Order") + " " + trans("View")}</h5>
                    <Link to={`/supplierCustomerRectifyOrder/RD`}>
                      <Button>
                        {trans("Go Back")}
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                {RectifyOrderData == null || RectifyOrderData.length == 0 ? (
                  <CardBody>
                    <h5>{trans("No Order Exist")}</h5>
                  </CardBody>
                ) : (
                  <Card className="cust_delivery__company__card">
                    <CardBody>
                      {RectifyOrderData.map((item, index) => {
                        return (
                          item.order_items.length > 0 && (
                            <Card>
                              <DataTable
                                columns={columns}
                                rows={item.order_items}
                              ></DataTable>
                            </Card>
                          )
                        );
                      })}
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

export default translate(rectify_order_cart_view);
