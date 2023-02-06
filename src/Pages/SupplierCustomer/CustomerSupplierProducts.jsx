/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
import SweetAlert from "sweetalert2";
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
import DataTable from "../../components/dataTable/dataTable";
import { useNavigate, useParams } from "react-router-dom";
import { URL, SIMPLE_URL } from "../../env";
import { useTranslation, } from "react-i18next";
import "./supplier_products.css";
import { toast } from "react-toastify";
import { Fab } from "@mui/material";
import { useDispatch } from "react-redux";
import { SupplierCustomerCartTotal } from "../../redux/supplier_customer/actions";
import { getSupplierCustomerCartTotalAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";
import { AddToCartAction } from "../../redux/Pages/SupplierCustomer/Cart/Add/AddToCartAction";
import { SupplierDetailAction } from "../../redux/Pages/SupplierCustomer/CustomerSuppliersAction"

const CustomerSupplierProducts = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const params = useParams();
  const dispatch = useDispatch();

  const [SupplierProductData, setSupplierProductData] = useState(null);
  const [allProducts, setProducts] = useState([]);
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
    { field: "name", title: trans("Name"), minWidth: 240, flex: 1.5 },
    {
      field: "unit",
      title: trans("Unit"),
      minWidth: 100,
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
      minWidth: 120,
      flex: 0.4,
      render: (cellValues) => <p>{cellValues.package + " "}</p>,
      valueGetter: (cellValues) => cellValues.package,
    },
    {
      field: "price_per_package_peritem",
      title: trans("Unit Price") + " (€)",
      minWidth: 120,
      flex: 0.6,
      render: (cellValues) => <p>{cellValues.price_per_package_peritem + " "}€</p>,
      valueGetter: (cellValues) => cellValues.price_per_package_peritem,
    },
    {
      field: "price_per_package",
      title: trans("Price Per Package") + " (€)",
      minWidth: 140,
      flex: 0.6,
      render: (cellValues) => <p>{cellValues.price_per_package + " "}€</p>,
      valueGetter: (cellValues) => cellValues.price_per_package,
    },
    {
      field: "total_price",
      title: trans("Total Price (€)"),
      minWidth: 160,
      flex: 0.7,
      render: (cellValues) => {
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
      title: trans("Required Quantity"),
      minWidth: 250,
      flex: 3,
      render: (cellValues) => {
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
                              cellValues.price_per_package != null
                                ? cellValues.price_per_package *
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
                          product_quantity:
                            parseFloat(requiredQty[index].value) + 1,
                          total:
                            cellValues.price_per_package != null
                              ? cellValues.price_per_package *
                              (parseFloat(requiredQty[index].value) + 1)
                              : 0,
                        };
                        setProductCart(product_cart_item);
                      }

                      // setProductCart((prevState) => [
                      //   ...prevState,
                      //   {
                      //     product_id: cellValues.id,
                      //     productDetail: cellValues,
                      //     total:
                      //       cellValues.price_per_package == null
                      //         ? 0
                      //         : cellValues.price_per_package * 1,
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
                            cellValues.price_per_package != null
                              ? cellValues.price_per_package *
                              (parseFloat(requiredQty[index].value) + 1)
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
                                  : cellValues.price_per_package * 1,
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
                    <div className="ml-2 min__qty__box__wrapped">
                      <div
                        className={`quantity__box min__qty__box ${is_min_qty > -1 &&
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
      const SupplierDetailResponse = await SupplierDetailAction(params.idd)
      if (SupplierDetailResponse?.data?.success == true) {
        const products = SupplierDetailResponse?.data?.products;

        setSupplierData(SupplierDetailResponse?.data?.supplier);
        // products.map((item, index) => (item["index"] = index + 1));
        const supplier_product = products.map((item) => item["product"]);
        // products.map((item) => setIsMinQuantity([false]));

        setProducts(supplier_product);
      } else if (SupplierDetailResponse?.data?.error == true) {
        toast.error(trans(SupplierDetailResponse?.data?.message ?? "failed"));
      } else {
        toast.error(trans("failed"));
      }
    };

    getProducts();
  }, []);

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

        const addTocartResponse = await AddToCartAction(formData)
        if (addTocartResponse?.data?.success == true) {
          const GetCartCount = async () => {
            const cartResponse = await getSupplierCustomerCartTotalAction()
            if (cartResponse?.data?.success == true) {
              dispatch(
                SupplierCustomerCartTotal(
                  cartResponse?.data?.cart_page_array?.length
                )
              );
            } else if (cartResponse?.data?.error == true) {
              toast.error(trans(cartResponse?.data?.message ?? "failed"));
            } else {
              toast.error(trans("failed"));
            }
          };
          GetCartCount();
          toast.success(trans("Product Added To Cart Successfully"));

          navigate("/supplier_customers/cart/list");
        } else if (addTocartResponse?.data?.error == true) {
          toast.error(trans(addTocartResponse?.data?.message ?? "failed"));
        } else {
          toast.error(trans("failed"));
        }

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
            <DataTable columns={columns} data={allProducts} />
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

export default CustomerSupplierProducts;
