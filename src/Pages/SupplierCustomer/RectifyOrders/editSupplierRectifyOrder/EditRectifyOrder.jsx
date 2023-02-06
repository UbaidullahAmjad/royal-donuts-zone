/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../../../layout/breadcrumb";
import {
  PlusCircle,
  MinusCircle,
} from "react-feather";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Media,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import DataTable from "../../../../components/dataTable/dataTable";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { URL, SIMPLE_URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import "./edit_rectify_cart.css";
import { toast } from "react-toastify";
import { Fab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SupplierCustomerCartTotal } from "../../../../redux/supplier_customer/actions";
import { RectifyOrderDataAction } from "../../../../redux/Pages/SupplierCustomer/Rectify/RectifyAction";
import { getSupplierCustomerCartTotalAction } from "../../../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";
import { RectifyAddAction } from "../../../../redux/Pages/SupplierCustomer/editSupplierRectifyOrder/EditRectifyOrderAction"
import { RemoveRectifyAction } from "../../../../redux/Pages/SupplierCustomer/Rectify/RemoveRectifyAction"
import SweetAlert from "sweetalert2";

const EditRectifyOrder = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const params = useParams();
  const params_order_id = params.id;
  // const row_order_id = params.id;

  const getRectifyData = useSelector((state) => state.getRectifyData)
  const RectifyOrderList = getRectifyData.rectifyOrderList;

  // const [RectifyOrderId, setRectifyOrderId] = useState([])
  const [RectifyOrderItemData, setRectifyOrderItemData] = useState([])
  const [SupplierProductData, setSupplierProductData] = useState(null);
  const [SelectedCartData, setSelectedCartData] = useState(null);
  const [SelectedProducts, setSelectedProducts] = useState(null);

  const [ProductCart, setProductCart] = useState([]);

  const [isMinQuantity, setIsMinQuantity] = useState([]);
  const [requiredQty, setRequiredQty] = useState([]);

  const [MinRequiredQty, setMinRequiredQty] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      dispatch(RectifyOrderDataAction())
    } else {
      toast.error(trans("Please Login To Continue"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user_id") != null && RectifyOrderList.length > -1) {
      const filterData = RectifyOrderList.filter(
        (item) => item.order_items.order_id == params_order_id
      );
      setRectifyOrderItemData(filterData);
    }
  }, [getRectifyData])

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    // {
    //   field: "image",
    //   title: "IMAGE",
    //   render: (cellValues) => (
    //     <Media
    //       className="img-100 b-r-8"
    //       src={`${SIMPLE_URL}/images/Product/` + cellValues.image}
    //       height={80}
    //       width={80}
    //       alt="user image"
    //     />
    //   ),
    // },
    { field: "name", title: trans("Name"), minWidth: 200, flex: 2, },
    {
      field: "unit",
      title: trans("Unit"),
      flex: 0.6,
      render: (cellValues) => {
        return (
          <p>{cellValues.unit != undefined && cellValues.unit.name}</p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.unit != undefined && cellValues.unit.name,
    },
    {
      field: "package",
      title: trans("Packing"),
      flex: 0.6,
      minWidth: 70,
      render: (cellValues) => (
        <p>{parseFloat(cellValues.package).toFixed(2) + " "}</p>
      ),
      valueGetter: (cellValues) => cellValues.package,
    },
    {
      field: "price_per_package_peritem",
      title: trans("unit price"),
      flex: 1.2,
      render: (cellValues) => (
        <p>{parseFloat(cellValues.price_per_package_peritem).toFixed(2) + " "}€</p>
      ),
      valueGetter: (cellValues) => cellValues.price_per_package_peritem,
    },
    {
      field: "price_per_package",
      title: trans("price per package"),
      flex: 1.2,
      render: (cellValues) => (
        <p>{parseFloat(cellValues.price_per_package).toFixed(2) + " "}€</p>
      ),
      valueGetter: (cellValues) => cellValues.price_per_package,
    },
    // {
    //   field: "min_req_qty",
    //   title: trans("Min Required Quantity"),
    //   flex: 1,
    //   render: (cellValues) => {
    //     if (cellValues.min_req_qty == "1") {
    //       return (
    //         <Badge color="success" pill>
    //           {trans("Active")}
    //         </Badge>
    //       );
    //     } else {
    //       return (
    //         <Badge color="danger" pill>
    //           {trans("Inactive")}
    //         </Badge>
    //       );
    //     }
    //   },
    // },
    {
      field: "total_price",
      title: trans("Total Price (€)"),
      flex: 1,
      render: (cellValues) => {
        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );
        return (
          <p>
            {product_cart_item_index > -1
              ? parseFloat(ProductCart[product_cart_item_index].total).toFixed(
                2
              ) + " €"
              : 0}
          </p>
        );
      },
      valueGetter: (cellValues) => {
        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );
        return product_cart_item_index > -1
          ? parseFloat(ProductCart[product_cart_item_index].total).toFixed(2) +
          " €"
          : 0;
      },
    },
    {
      field: "required_quantity",
      title: trans("Required Quantity"),
      flex: 2,
      render: (cellValues) => {
        const index = requiredQty.findIndex(
          (item) => item.product_id == cellValues.id
        );
        const is_min_qty = isMinQuantity.findIndex(
          (item) => item.product_id == cellValues.id
        );
        const min_req_qty_index = MinRequiredQty.findIndex(
          (item) => item.product_id == cellValues.id
        );

        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );

        const check_min_qty = isMinQuantity.find(
          (item) => item.product_id == cellValues.id
        );

        return (
          <div style={{ padding: 10, minHeight: 100 }}>
            <Row>
              <div className="rectify_quantity__box">
                <MinusCircle
                  className="quantity__button"
                  onClick={() => {
                    if (index > -1) {
                      if (parseFloat(requiredQty[index].value) > 0) {
                        let products = [...requiredQty];
                        products[index] = {
                          ...products[index],
                          value: parseFloat(products[index].value) - 1,
                        };
                        setRequiredQty(products);

                        if (parseFloat(requiredQty[index].value) - 1 == 0) {
                          const product_filter_zero_quantity =
                            ProductCart.filter(
                              (item) => item.product_id != cellValues.id
                            );
                          const required_product_quatity = requiredQty.filter(
                            (item) => item.product_id != cellValues.id
                          );
                          setRequiredQty(required_product_quatity);
                          setProductCart(product_filter_zero_quantity);
                        } else {
                          let product_cart_item = [...ProductCart];

                          product_cart_item[product_cart_item_index] = {
                            ...product_cart_item[product_cart_item_index],
                            product_quantity:
                              parseFloat(requiredQty[index].value) - 1,
                            total:
                              cellValues.price_per_package != null
                                ? parseFloat(cellValues.price_per_package) *
                                parseFloat(
                                  parseFloat(requiredQty[index].value) - 1
                                )
                                : 0,
                          };
                          setProductCart(product_cart_item);
                        }
                        if (
                          parseFloat(requiredQty[index].value) - 1 <
                          parseFloat(MinRequiredQty[min_req_qty_index].value)
                        ) {
                          let min_req_qty_product = [...MinRequiredQty];
                          min_req_qty_product[min_req_qty_index] = {
                            ...min_req_qty_product[min_req_qty_index],
                            value: parseFloat(requiredQty[index].value) - 1,
                          };
                          setMinRequiredQty(min_req_qty_product);

                          let product_cart_item = [...ProductCart];
                          product_cart_item[product_cart_item_index] = {
                            ...product_cart_item[product_cart_item_index],
                            MinRequiredQty:
                              min_req_qty_product[min_req_qty_index].value,
                          };
                          setProductCart(product_cart_item);
                        }
                      } else {
                        toast.error(trans("Value cannot be less than 0"));
                      }
                    } else {
                      toast.error(trans("Alteast one product is mandatory"));
                    }
                  }}
                ></MinusCircle>
                <p
                  className="rectify_qty_text"
                  key={index > -1 ? parseFloat(requiredQty[index].value) : 0}
                >
                  {index > -1 ? parseFloat(requiredQty[index].value) : 0}
                </p>
                <PlusCircle
                  className="quantity__button"
                  onClick={() => {
                    // setRequiredQty(requiredQty + 1);
                    let products = [...requiredQty];
                    if (index > -1) {
                      products[index] = {
                        ...products[index],

                        value: parseFloat(products[index].value) + 1,
                      };
                      setRequiredQty(products);
                      if (
                        cellValues.price_per_package != null ||
                        cellValues.price_per_package != undefined
                      ) {
                        let product_cart_item = [...ProductCart];

                        product_cart_item[product_cart_item_index] = {
                          ...product_cart_item[product_cart_item_index],
                          product_quantity: parseFloat(
                            parseFloat(requiredQty[index].value) + 1
                          ),
                          total:
                            cellValues.price_per_package != null
                              ? parseFloat(cellValues.price_per_package) *
                              parseFloat(
                                parseFloat(requiredQty[index].value) + 1
                              )
                              : 0,
                        };
                        setProductCart(product_cart_item);
                      }
                    } else {
                      setRequiredQty((prevState) => [
                        ...prevState,
                        { product_id: cellValues.id, value: 1 },
                      ]);
                      if (product_cart_item_index > -1) {
                        let product_cart_item = [...ProductCart];

                        product_cart_item[product_cart_item_index] = {
                          ...product_cart_item[product_cart_item_index],
                          product_quantity: parseFloat(
                            parseFloat(requiredQty[index].value) + 1
                          ),
                          total:
                            cellValues.price_per_package != null
                              ? parseFloat(cellValues.price_per_package) *
                              parseFloat(
                                parseFloat(requiredQty[index].value) + 1
                              )
                              : 0,
                        };
                        setProductCart(product_cart_item);
                      } else {
                        if (
                          cellValues.price_per_package != null ||
                          cellValues.price_per_package != undefined
                        ) {
                          setProductCart((prevState) => [
                            ...prevState,
                            {
                              product_id: cellValues.id,
                              productDetail: cellValues,
                              product_quantity: 1,
                              total:
                                cellValues.price_per_package == null
                                  ? 0
                                  : parseFloat(
                                    cellValues.price_per_package
                                  ) * 1,
                            },
                          ]);
                        }
                      }
                    }
                  }}
                ></PlusCircle>
              </div>
              {(cellValues.min_req_qty == 1 ||
                cellValues.min_req_qty == "1") && (
                  <div className=" ml-3 min__qty__check d-flex">
                    <FormGroup check style={{ marginTop: 8, marginRight: 8 }}>
                      <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        key={check_min_qty != undefined && check_min_qty.value}
                        defaultChecked={
                          check_min_qty != undefined && check_min_qty.value
                        }
                        onClick={() => {
                          // setIsMinQuantity(!isMinQuantity)
                          if (is_min_qty > -1) {
                            let product_min_qty = [...isMinQuantity];
                            product_min_qty[is_min_qty] = {
                              ...product_min_qty[is_min_qty],
                              value: !product_min_qty[is_min_qty].value,
                            };
                            setIsMinQuantity(product_min_qty);
                            let product_cart_item = [...ProductCart];
                            product_cart_item[product_cart_item_index] = {
                              ...product_cart_item[product_cart_item_index],
                              isMinQty:
                                !product_cart_item[product_cart_item_index]
                                  .isMinQty,
                            };

                            setProductCart(product_cart_item);
                          } else {
                            setIsMinQuantity((prevState) => [
                              ...prevState,
                              { product_id: cellValues.id, value: true },
                            ]);
                            if (product_cart_item_index > -1) {
                              let product_cart_item = [...ProductCart];

                              product_cart_item[product_cart_item_index] = {
                                ...product_cart_item[product_cart_item_index],
                                isMinQty: true,
                              };
                              setProductCart(product_cart_item);
                            } else {
                              if (
                                cellValues.price_per_package != null ||
                                cellValues.price_per_package != undefined
                              ) {
                                setProductCart((prevState) => [
                                  ...prevState,
                                  {
                                    product_id: cellValues.id,
                                    productDetail: cellValues,
                                    isMinQty: true,
                                  },
                                ]);
                              }
                            }
                          }
                        }}
                      />
                      <Label check for="exampleCheck">
                        {trans("Min Quantity")}
                      </Label>
                    </FormGroup>
                    <div className="min__qty__box__wrapped">
                      <div
                        className={`quantity__box min__qty__box ${is_min_qty > -1 &&
                          isMinQuantity[is_min_qty].value == true &&
                          "min__qty__box_show"
                          }`}
                      >
                        <MinusCircle
                          className="quantity__button"
                          onClick={() => {
                            if (min_req_qty_index > -1) {
                              if (MinRequiredQty[min_req_qty_index].value > 0) {
                                let min_req_qty_product = [...MinRequiredQty];
                                min_req_qty_product[min_req_qty_index] = {
                                  ...min_req_qty_product[min_req_qty_index],
                                  value:
                                    min_req_qty_product[min_req_qty_index].value -
                                    1,
                                };
                                setMinRequiredQty(min_req_qty_product);
                                let product_cart_item = [...ProductCart];
                                product_cart_item[product_cart_item_index] = {
                                  ...product_cart_item[product_cart_item_index],
                                  MinRequiredQty:
                                    min_req_qty_product[min_req_qty_index].value,
                                };
                                setProductCart(product_cart_item);
                              } else {
                              }
                            } else {
                              toast.error(trans("Value cannot be less than 0"));
                            }
                          }}
                        ></MinusCircle>
                        <p
                          className="rectify_qty_text"
                          key={
                            min_req_qty_index > -1
                              ? MinRequiredQty[min_req_qty_index].value
                              : 0
                          }
                        >
                          {min_req_qty_index > -1
                            ? MinRequiredQty[min_req_qty_index].value
                            : 0}
                        </p>
                        <PlusCircle
                          className="quantity__button"
                          onClick={() => {
                            // if (MinRequiredQty >= requiredQty) {
                            // } else {
                            if (min_req_qty_index > -1) {
                              if (
                                MinRequiredQty[min_req_qty_index].value >=
                                requiredQty[index].value
                              ) {
                                toast.error(trans("Minimum Quantity Error"));
                              } else {
                                let min_req_qty_product = [...MinRequiredQty];
                                min_req_qty_product[min_req_qty_index] = {
                                  ...min_req_qty_product[min_req_qty_index],
                                  value:
                                    min_req_qty_product[min_req_qty_index].value +
                                    1,
                                };
                                setMinRequiredQty(min_req_qty_product);

                                let product_cart_item = [...ProductCart];
                                product_cart_item[product_cart_item_index] = {
                                  ...product_cart_item[product_cart_item_index],
                                  MinRequiredQty:
                                    min_req_qty_product[min_req_qty_index].value,
                                };
                                setProductCart(product_cart_item);
                              }
                            } else {
                              setMinRequiredQty((prevState) => [
                                ...prevState,
                                { product_id: cellValues.id, value: 1 },
                              ]);
                              let product_cart_item = [...ProductCart];
                              product_cart_item[product_cart_item_index] = {
                                ...product_cart_item[product_cart_item_index],
                                MinRequiredQty: 1,
                              };
                              setProductCart(product_cart_item);
                            }
                            // }
                          }}
                        >
                          +
                        </PlusCircle>
                      </div>
                    </div>
                  </div>
                )}
            </Row>
          </div>
        );
      },
    },
    {
      field: "action",
      title: trans("Action"),
      flex: 2,
      render: (cellValues) => {
        return (
          <>
            <Button
              color="danger"
              outline
              onClick={() => DeleteProduct(cellValues)}
            >
              <i className="fa fa-times"></i>
            </Button>
          </>
        );
      },
    },
  ];

  const DeleteProduct = async (row) => {

    if (loc.state != undefined) {
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

          const removeRectifyResponse = await RemoveRectifyAction(loc?.state?.order_id, row.id)
          if (removeRectifyResponse?.data?.success == true) {
            const cart = ProductCart;
            // const supplier_cart = ProductCart.findIndex(
            //   (item) => item.product_id == row.id
            // )
            const delete_product_Cart = ProductCart.filter(
              (item) => item.product_id != row.id
            );
            setProductCart(delete_product_Cart);
            // cart[supplier_cart]["total"] = 0;
            // setProductCart(cart);

            const get_required_qty = requiredQty;
            const get_product_required_qty = requiredQty.filter(
              (item) => item.product_id != row.id
            );
            // get_required_qty[get_product_required_qty_index]["value"] = 0;
            setRequiredQty(get_product_required_qty);
            toast.success(
              trans("Rectify Order Item Is Removed Successfully")
            );
          } else if (removeRectifyResponse?.data?.error == true) {
            toast.error(trans(removeRectifyResponse?.data?.message ?? "failed"));
          }
        }
      });
    }
  };

  // const DeleteCartProduct = (row) => {
  //   const deleted_order_product = [...RectifyOrderData];
  //   const find_order_array_index = deleted_order_product.findIndex(
  //     (item) => item.order.id == row.order_id
  //   );
  //   if (deleted_order_product[find_order_array_index].order_items.length > 1) {
  //     const find_delete_cart_item = deleted_order_product[
  //       find_order_array_index
  //     ].order_items.find((item) => item.id == row.id);
  //     deleted_order_product[find_order_array_index].order.total =
  //       deleted_order_product[find_order_array_index].order.total -
  //       parseFloat(find_delete_cart_item.quantity) *
  //         parseFloat(find_delete_cart_item.unit_price);
  //     deleted_order_product[find_order_array_index].order.grand_total =
  //       deleted_order_product[find_order_array_index].order.grand_total -
  //       parseFloat(find_delete_cart_item.quantity) *
  //         parseFloat(find_delete_cart_item.unit_price);
  //     const delete_cart_item = deleted_order_product[
  //       find_order_array_index
  //     ].order_items.filter((item) => item.id != row.id);
  //     deleted_order_product[find_order_array_index].order_items =
  //       delete_cart_item;
  //   } else {
  //     deleted_order_product.splice(find_order_array_index, 1);
  //   }

  useEffect(() => {
    const getEditCartProducts = async () => {
      const user_id = atob(localStorage.getItem("user_id"));
      const supplier_id = params.supplier_id;
      const concat_ids = supplier_id + "-" + user_id;
      const response = await axios
        .get(`${URL}/modifyrectify/${concat_ids}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          const supplier_product = response.data.products.map(
            (item) => item["product"]
          );
          setSupplierProductData(supplier_product);
          setSelectedCartData(response.data.cart_data);
          setSelectedProducts(response.data.cart_items);
          response.data.cart_items.map((item, index) => {
            setRequiredQty((prevState) => [
              ...prevState,
              { product_id: item.product_id, value: parseFloat(item.quantity) },
            ]);
            setIsMinQuantity((prevState) => [
              ...prevState,
              {
                product_id: item.product_id,
                value: parseFloat(item.min_quantity) == 0 ? false : true,
              },
            ]);
            if (parseFloat(item.min_quantity) > 0) {
              setMinRequiredQty((prevState) => [
                ...prevState,
                {
                  product_id: item.product_id,
                  value: parseFloat(item.min_quantity),
                },
              ]);
            }
            setProductCart((prevState) => [
              ...prevState,
              {
                product_id: item.product_id,
                productDetail: item.product,
                product_quantity: parseFloat(item.quantity),
                total: parseFloat(item.unit_price) * parseFloat(item.quantity),
                isMinQty: parseFloat(item.min_quantity) == 0 ? false : true,
                MinRequiredQty:
                  parseFloat(item.min_quantity) > 0 &&
                  parseFloat(item.min_quantity),
              },
            ]);
          });
        })
        .catch((error) => {
          console.log("ERROR --- ", error);
        });
      // const products = response.data.products;

      // products.map((item, index) => (item["index"] = index + 1));
      // const supplier_product = products.map((item) => item["product"]);
      // products.map((item) => setIsMinQuantity([false]));
      // setProducts(supplier_product);
    };

    getEditCartProducts();
  }, []);

  const dispatch = useDispatch();

  const SubmitCartItems = async () => {
    if (ProductCart.length > 0) {
      var product_id_array = [];
      var product_quantity_array = [];
      var min_product_quantity_array = [];

      ProductCart.map((item) => {
        product_id_array.push(item.product_id);
        product_quantity_array.push(item.product_quantity);
        if (item.isMinQty != undefined) {
          if (item.isMinQty == true) {
            min_product_quantity_array.push(item.MinRequiredQty);
          } else {
            min_product_quantity_array.push(0);
          }
        } else {
          min_product_quantity_array.push(0);
        }
      });
     
      if (localStorage.getItem("user_id") != null) {
        const userId = localStorage.getItem("user_id");
        const formData = new FormData();
        formData.append("user_id", atob(userId));
        formData.append("product_id", JSON.stringify(product_id_array));
        formData.append("quantity", JSON.stringify(product_quantity_array));
        formData.append("min_qty", JSON.stringify(min_product_quantity_array));

        const rectifyAddResponse = await RectifyAddAction(formData, SelectedCartData.supplier_name)
        if (rectifyAddResponse?.data?.success == true) {
          // const GetCartCount = async () => {
          //   const cartResponse = await getSupplierCustomerCartTotalAction()
          //   if (cartResponse?.data?.success == true) {
          //     dispatch(
          //       SupplierCustomerCartTotal(cartResponse?.data?.cart_page_array?.length)
          //     );
          //   }
          // };
          // GetCartCount();

          toast.success(
            trans("Product Updated To Rectify Order Successfully")
          );
          navigate("/supplier_customers/rectify_orders/list");
        } else if (rectifyAddResponse?.data?.error == true) {
          toast.error(trans(rectifyAddResponse?.data?.message ?? "failed"));
        } else {
          toast.error(trans("failed"));
        }

      } else {
        toast.error(trans("Please Login To Continue"));
      }
    } else {
      toast.error("Add Quantity To Add Products To Cart");
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent="Supplier" title="Products" />
      <Container fluid={true}>
        <Card>
          <CardBody>
            {SupplierProductData != null && (
              <DataTable
                columns={columns}
                data={SupplierProductData}
                height={120}
              />
            )}
            {/* <h1>hehre</h1> */}
          </CardBody>
        </Card>

        <Fab
          color="primary"
          style={{
            position: "fixed",
            right: 20,
            bottom: 80,
            backgroundColor: "#fc778f",
            borderRadius: '50%',
          }}
          onClick={SubmitCartItems}
        >
          <i className="fa fa-shopping-basket" id="basket"></i>
        </Fab>
      </Container>
    </Fragment>
  );
};

export default EditRectifyOrder;
