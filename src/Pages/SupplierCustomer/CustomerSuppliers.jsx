/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../layout/breadcrumb";
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
} from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RectifyOrderDataAction } from "../../redux/Pages/SupplierCustomer/Rectify/RectifyAction";
import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../redux/supplier_customer/actions";
import { getSupplierCustomerCartTotalAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";
import { SupplierDataAction, SupplierDetailAction } from "../../redux/Pages/SupplierCustomer/CustomerSuppliersAction"
import { URL } from "../../env";

const CustomerSuppliers = (props) => {
 const { t } = useTranslation();
const trans = t;
  const [suppliers, setSuppliers] = useState([]);
  const [generateMail, setGenerateMail] = useState(false);
  const [storeSelected, setStoreSelected] = useState(false);

  const [userStores, setUserStores] = useState([]);
  const [storeData, setStoreData] = useState(null);

  const stores = useSelector((state) => state);

  const getRectifyData = useSelector((state) => state.getRectifyData)
  const RectifyOrderList = getRectifyData.rectifyOrderList;

  const handleLocalStorage = (store) => {
    localStorage.setItem("selected_store", JSON.stringify(store));
    window.dispatchEvent(new Event("storage"));
    localStorage.setItem("isModalOpen", false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getOrders = async () => {
     
      const SupplierDataResponse = await SupplierDataAction()
      if (SupplierDataResponse?.data) {
        setSuppliers(SupplierDataResponse?.data?.alldata);
      }

      const stores = JSON.parse(localStorage.getItem("user_stores"));
      setUserStores(stores);
      if (localStorage.getItem("isModalOpen") == "false") {
        setIsModalOpen(false);
      }

      if (localStorage.getItem("isModalOpen") != "false") {
        setIsModalOpen(true);
      }
    };

    getOrders();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const GetCartCount = async () => {

      const cartResponse = await getSupplierCustomerCartTotalAction()
      if (cartResponse?.data?.success == true) {
        dispatch(
          SupplierCustomerCartTotal(cartResponse?.data?.cart_page_array?.length)
        );
      }
    };

    GetCartCount();
    dispatch(RectifyOrderDataAction());
    let selectedStore = JSON.parse(localStorage.getItem("selected_store"));
    if (selectedStore !== null) {
      setStoreData(selectedStore);
    }
  }, []);

  useEffect(() => {
    if (RectifyOrderList.length > -1) {
      dispatch(
        SupplierCustomerRectifyCartTotal(RectifyOrderList.length)
      );
    }
  }, [getRectifyData])

  const selectStore = (store) => {
    handleLocalStorage(store);
    setStoreSelected(true);
  };

  const navigate = useNavigate();
  const params = useParams();

  const handleSupplierclick = async (id) => {
    const SupplierDetailResponse = await SupplierDetailAction(id)
    if (SupplierDetailResponse?.data?.success == true) {
      navigate(`/suppliers/customer/products/view/${id}`);
    } else if (SupplierDetailResponse?.data?.error == true) {
      toast.error(trans(SupplierDetailResponse?.data?.message ?? "failed"));
      navigate({
        pathname: "/supplier_customers/cart/list",
        state: { error: SupplierDetailResponse?.message },
      });
    } else {
      // toast.error(trans("failed"));
      navigate({
        pathname: "/supplier_customers/cart/list",
        state: { error: "failed" },
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState();
  const setModalStatus = () => {
    localStorage.setItem("isModalOpen", false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Customers")} title={trans("Supplier")} />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>
                    {trans("Customer")} {trans("Suppliers")}
                  </h5>
                </CardHeader>
                <CardBody>
                  {isModalOpen == true && (
                    <Modal centered scrollable={true} isOpen={isModalOpen}>
                      <ModalHeader>{trans("Select Store")}</ModalHeader>
                      <ModalBody>
                        {userStores != [] &&
                          userStores.map((store) => {
                            return (
                              <Row className="mb-2">
                                <Col md="12 d-flex">
                                  <h6 className="col-8">{store.name_fr}</h6>
                                  <div className="col-3">
                                    <Button
                                      color="success"
                                      onClick={() => selectStore(store)}
                                    >
                                      {trans("Select")}
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            );
                          })}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={setModalStatus}>
                          {trans("Cancel")}
                        </Button>
                      </ModalFooter>
                    </Modal>
                  )}
                  <Row>
                    {suppliers.length > 0 ? (
                      suppliers.map((supplier) => {
                        return (
                          <Col sm="4" className="p-2">
                            <Card
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleSupplierclick(supplier.supplier.id)
                              }
                            >
                              <CardHeader className="py-3">
                                <h6>{supplier.supplier.name}</h6>
                              </CardHeader>
                              <CardFooter>
                                <Row>
                                  {supplier != undefined &&
                                    supplier.categories != undefined &&
                                    supplier.categories.length > 0 &&
                                    supplier.categories.map(
                                      (product, index) => (
                                        <Badge color="light">
                                          {product != null && product.name}
                                        </Badge>
                                      )
                                    )}
                                </Row>
                              </CardFooter>
                            </Card>
                          </Col>
                        );
                      })
                    ) : (
                      <h5>{trans("No Data Found")}</h5>
                    )}
                  </Row>{" "}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default CustomerSuppliers;
