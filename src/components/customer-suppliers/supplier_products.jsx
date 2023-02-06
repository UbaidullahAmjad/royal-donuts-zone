/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Mail,
  Bell,
  Settings,
  Music,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Headphones,
  GitHub,
  Award,
  Activity,
  Heart,
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
import {
  ContextualVariations,
  PillsWithIcon,
  PillsWithNumber,
  TagsWithIcon,
  TagsWithNumber,
  New,
  Messages,
  Notification,
  BadgesExample,
  Primary,
  secondary,
  Success,
  Warning,
  Danger,
  Light,
  Info,
  Dark,
} from "../../constant";
import DataTable from "../dataTable/dataTable";

import { useNavigate, useParams } from "react-router-dom";

import { URL, SIMPLE_URL } from "../../env";
import { translate } from "react-switch-lang";
import "./supplier_products.css";
import { toast } from "react-toastify";

import { Fab } from "@mui/material";
import { useDispatch } from "react-redux";
import { SupplierCustomerCartTotal } from "../../redux/supplier_customer/actions";

const Products = (props) => {
  const trans = props.t;
  console.log("DATAAAAA");

  const params = useParams();

  const [SupplierProductData, setSupplierProductData] = useState(null);
  const [allProducts, setProducts] = useState(null);
  const [allOrders, setOrders] = useState(null);

  const [SupplierData, setSupplierData] = useState(null);

  const [ProductCart, setProductCart] = useState([]);

  const [isMinQuantity, setIsMinQuantity] = useState([]);
  const [requiredQty, setRequiredQty] = useState([]);
  const [minRequiredQty, setMinRequiredQty] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const columns = [
    // {
    //   field: "image",
    //   headerName: "IMAGE",
    //   renderCell: (cellValues) => (
    //     <Media
    //       className="img-100 b-r-8"
    //       src={`${SIMPLE_URL}/images/Product/` + cellValues.row.image}
    //       height={80}
    //       width={80}
    //       alt="user image"
    //     />
    //   ),
    // },
    { field: "name", headerName: trans("Name"), flex: 1.5 },
    {
      field: "unit",
      headerName: trans("Unit"),
      flex: 0.4,
      renderCell: (cellValues) => {
        return (
          <p>{cellValues.row.unit != undefined && cellValues.row.unit.name}</p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.row.unit != undefined && cellValues.row.unit.name,
    },
    {
      field: "package",
      headerName: trans("Packing"),
      flex: 0.4,
      minWidth: 70,
      renderCell: (cellValues) => <p>{cellValues.value + " "}</p>,
      valueGetter: (cellValues) => cellValues.value,
    },

    {
      field: "price_per_package_peritem",
      headerName: trans("unit price"),
      flex: 0.6,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "price_per_package",
      headerName: trans("price per package"),
      flex: 0.6,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "total_price",
      headerName: trans("Total Price (€)"),
      flex: 0.7,
      renderCell: (cellValues) => {
        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );
        return (
          <p>
            {product_cart_item_index > -1 &&
            ProductCart[product_cart_item_index] != undefined &&
            ProductCart[product_cart_item_index].total != undefined
              ? ProductCart[product_cart_item_index].total.toFixed(2) + " €"
              : 0}
          </p>
        );
      },
      valueGetter: (cellValues) => {
        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );
        return product_cart_item_index > -1 &&
          ProductCart[product_cart_item_index] != undefined &&
          ProductCart[product_cart_item_index].total != undefined
          ? ProductCart[product_cart_item_index].total + " €"
          : 0;
      },
    },
    {
      field: "required_quantity",
      headerName: trans("Required Quantity"),
      title: trans("Required Quantity"),
      flex: 3,
      renderCell: (cellValues) => {
        // console.log("CELLVALUESS --- ", cellValues);
        const index = requiredQty.findIndex(
          (item) => item.product_id == cellValues.id
        );
        const is_min_qty = isMinQuantity.findIndex(
          (item) => item.product_id == cellValues.id
        );
        const min_req_qty_index = minRequiredQty.findIndex(
          (item) => item.product_id == cellValues.id
        );

        const product_cart_item_index = ProductCart.findIndex(
          (item) => item.product_id == cellValues.id
        );

        // console.log("REQUIRED QUANTITY CART ---- ", requiredQty);
        // console.log("PRODUCT CART ---- ", ProductCart);

        return (
          <div style={{ padding: 10, minHeight: 100 }}>
            <Row>
              <div className="quantity__box">
                <MinusCircle
                  className="quantity__button"
                  onClick={() => {
                    if (index > -1) {
                      if (requiredQty[index].value > 0) {
                        let products = [...requiredQty];
                        products[index] = {
                          ...products[index],
                          value: products[index].value - 1,
                        };
                        setRequiredQty(products);

                        if (requiredQty[index].value - 1 == 0) {
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
                            product_quantity: requiredQty[index].value - 1,
                            total:
                              cellValues.row.price_per_package != null
                                ? cellValues.row.price_per_package *
                                  (requiredQty[index].value - 1)
                                : 0,
                          };
                          setProductCart(product_cart_item);
                        }
                        if (
                          requiredQty[index].value - 1 <
                          minRequiredQty[min_req_qty_index].value
                        ) {
                          let min_req_qty_product = [...minRequiredQty];
                          min_req_qty_product[min_req_qty_index] = {
                            ...min_req_qty_product[min_req_qty_index],
                            value: requiredQty[index].value - 1,
                          };
                          setMinRequiredQty(min_req_qty_product);
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
                  unselectable="on"
                  className="qty_text"
                  key={index > -1 ? requiredQty[index].value : 0}
                >
                  {index > -1 ? requiredQty[index].value : 0}
                </p>
                <PlusCircle
                  className="quantity__button"
                  onClick={() => {
                    // setRequiredQty(requiredQty + 1);
                    let products = [...requiredQty];
                    // console.log("PRODUCTS ---- ", products);

                    if (index > -1) {
                      products[index] = {
                        ...products[index],

                        value: parseFloat(products[index].value) + 1,
                      };
                      setRequiredQty(products);

                      if (
                        cellValues.row.price_per_package != null ||
                        cellValues.row.price_per_package != undefined
                      ) {
                        let product_cart_item = [...ProductCart];

                        product_cart_item[product_cart_item_index] = {
                          ...product_cart_item[product_cart_item_index],
                          product_quantity:
                            parseFloat(requiredQty[index].value) + 1,
                          total:
                            cellValues.row.price_per_package != null
                              ? cellValues.row.price_per_package *
                                (parseFloat(requiredQty[index].value) + 1)
                              : 0,
                        };
                        setProductCart(product_cart_item);
                      }

                      // setProductCart((prevState) => [
                      //   ...prevState,
                      //   {
                      //     product_id: cellValues.id,
                      //     productDetail: cellValues.row,
                      //     total:
                      //       cellValues.row.price_per_package == null
                      //         ? 0
                      //         : cellValues.row.price_per_package * 1,
                      //   },
                      // ]);

                      // setRequiredQty((prevState) => [
                      //     {
                      //       product_id: cellValues.id,
                      //       value:
                      //         requiredQty.find(
                      //           (item2) => item2.product_id == cellValues.id
                      //         ).value + 1,
                      //     },
                      //   ])
                      // requiredQty.item != null ? (cellValues.id == requiredQty.item && setRequiredQty({item:cellValues.id,value:requiredQty.find((item)=> item.id == cellValues.id).value + 1 })):
                    } else {
                      setRequiredQty((prevState) => [
                        ...prevState,
                        { product_id: cellValues.id, value: 1 },
                      ]);
                      if (product_cart_item_index > -1) {
                        let product_cart_item = [...ProductCart];

                        product_cart_item[product_cart_item_index] = {
                          ...product_cart_item[product_cart_item_index],
                          product_quantity: requiredQty[index].value + 1,
                          total:
                            cellValues.row.price_per_package != null
                              ? cellValues.row.price_per_package *
                                (parseFloat(requiredQty[index].value) + 1)
                              : 0,
                        };
                        setProductCart(product_cart_item);
                      } else {
                        if (
                          cellValues.row.price_per_package != null ||
                          cellValues.row.price_per_package != undefined
                        ) {
                          setProductCart((prevState) => [
                            ...prevState,
                            {
                              product_id: cellValues.id,
                              productDetail: cellValues.row,
                              product_quantity: 1,
                              total:
                                cellValues.row.price_per_package == null
                                  ? 0
                                  : cellValues.row.price_per_package * 1,
                            },
                          ]);
                        }
                      }
                    }
                  }}
                >
                  +
                </PlusCircle>
              </div>
              {(SupplierData.min_req_qty == 1 ||
                SupplierData.min_req_qty == "1") && (
                <div className="ml-3 min_qty_check d-flex">
                  <FormGroup check style={{ marginTop: 8 }}>
                    <Input
                      id="exampleCheck"
                      name="check"
                      type="checkbox"
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
                              cellValues.row.price_per_package != null ||
                              cellValues.row.price_per_package != undefined
                            ) {
                              setProductCart((prevState) => [
                                ...prevState,
                                {
                                  product_id: cellValues.id,
                                  productDetail: cellValues.row,
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
                  <div className="ml-2 min__qty__box__wrapped">
                    <div
                      className={`quantity__box min__qty__box ${
                        is_min_qty > -1 &&
                        isMinQuantity[is_min_qty].value == true &&
                        "min__qty__box_show"
                      }`}
                    >
                      <MinusCircle
                        className="quantity__button"
                        onClick={() => {
                          // toast.error("Value cannot be less than 0");
                          // if (minRequiredQty > 0) {
                          //   setMinRequiredQty(minRequiredQty - 1);
                          // } else {
                          //   toast.error("Value cannot be less than 0");
                          // }
                          if (min_req_qty_index > -1) {
                            if (minRequiredQty[min_req_qty_index].value > 0) {
                              let min_req_qty_product = [...minRequiredQty];
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
                            toast.error("Value cannot be less than 0");
                          }
                        }}
                      ></MinusCircle>
                      <p
                        className="qty_text"
                        key={
                          min_req_qty_index > -1
                            ? minRequiredQty[min_req_qty_index].value
                            : 0
                        }
                      >
                        {min_req_qty_index > -1
                          ? minRequiredQty[min_req_qty_index].value
                          : 0}
                      </p>
                      <PlusCircle
                        className="quantity__button"
                        onClick={() => {
                          // if (minRequiredQty >= requiredQty) {
                          // } else {
                          if (min_req_qty_index > -1) {
                            if (
                              minRequiredQty[min_req_qty_index].value >=
                              requiredQty[index].value
                            ) {
                              toast.error(trans("Minimum Quantity Error"));
                            } else {
                              let min_req_qty_product = [...minRequiredQty];
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
                      ></PlusCircle>
                    </div>
                  </div>
                </div>
              )}
            </Row>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getProducts = async () => {
      const response = axios
        .get(
          `${URL}/supplierdetails/${params.idd}/${atob(
            localStorage.getItem("user_id")
          )}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          }
        )
        .then((response) => {
          console.log("resp", response);
          const products = response.data.products;

          setSupplierData(response.data.supplier);
          // products.map((item, index) => (item["index"] = index + 1));
          const supplier_product = products.map((item) => item["product"]);
          // products.map((item) => setIsMinQuantity([false]));
          setProducts(supplier_product);
        });
    };

    getProducts();
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
      console.log(
        "PRODUCT IDDD ---- ",
        product_id_array,
        " ---- QUAN ----",
        product_quantity_array,
        " --- MIN QUAN ----",
        min_product_quantity_array
      );
      if (localStorage.getItem("user_id") != null) {
        const userId = localStorage.getItem("user_id");

        console.log("USER IDDD", userId);
        console.log("DECRUPT IDD", atob(userId));
        const formData = new FormData();
        formData.append("user_id", atob(userId));
        formData.append("product_id", JSON.stringify(product_id_array));
        formData.append("quantity", JSON.stringify(product_quantity_array));
        formData.append("min_qty", JSON.stringify(min_product_quantity_array));
        axios
          .post(URL + "/cart/add", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            if (response.data.success == true) {
              const GetCartCount = async () => {
                axios
                  .get(URL + "/cart", {
                    params: {
                      user_id: atob(localStorage.getItem("user_id")),
                    },
                    headers: {
                      Authorization:
                        "Bearer " + localStorage.getItem("token123"),
                    },
                  })
                  .then((response) => {
                    console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

                    dispatch(
                      SupplierCustomerCartTotal(
                        response.data.cart_page_array.length
                      )
                    );
                  });
              };
              GetCartCount();
              toast.success(trans("Product Added To Cart Successfully"));

              navigate("/supplierCustomerCart/RD");
            }
          });
      } else {
        toast.error(trans("Please Login To Continue"));
      }
    } else {
      toast.error(trans("Add Quantity To Add Products To Cart"));
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Products")} />
      <Container fluid={true}>
        <Card>
          <CardBody>
            {allProducts != null && (
              <DataTable columns={columns} rows={allProducts} height={120} />
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
          }}
          onClick={SubmitCartItems}
        >
          <i className="fa fa-shopping-basket" id="basket"></i>
        </Fab>
      </Container>
    </Fragment>
  );
};

export default translate(Products);
