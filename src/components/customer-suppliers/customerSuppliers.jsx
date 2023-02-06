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

import { translate } from "react-switch-lang";
import { useDispatch, useSelector } from "react-redux";

import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../redux/supplier_customer/actions";
import { URL } from "../../env";

const CustomerSuppliers = (props) => {
  const trans = props.t;
  const [suppliers, setSuppliers] = useState([]);
  const [generateMail, setGenerateMail] = useState(false);
  const [storeSelected, setStoreSelected] = useState(false);

  const [userStores, setUserStores] = useState([])
  const [storeData, setStoreData] = useState(null)

  const stores = useSelector((state) => state)


  const handleLocalStorage = (store) => {
    localStorage.setItem('selected_store', JSON.stringify(store))
    window.dispatchEvent(new Event("storage"));
    localStorage.setItem('isModalOpen', false)
    setIsModalOpen(false)


  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/suppliers`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
    console.log('all suppliers', response.data.alldata)
      setSuppliers(response.data.alldata);
      const stores = JSON.parse(localStorage.getItem('user_stores'))
      setUserStores(stores)
      if (localStorage.getItem('isModalOpen') == "false") {
        console.log('here if')
        setIsModalOpen(false)
      }

      if (localStorage.getItem('isModalOpen') != "false") {
        console.log('here else')
        setIsModalOpen(true)
      }

    };

    getOrders();

  }, []);


  const dispatch = useDispatch();

  useEffect(() => {
    const GetCartCount = async () => {
      axios
        .get(URL + "/cart", {
          params: {
            user_id: atob(localStorage.getItem("user_id")),
          },
          header: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

          dispatch(
            SupplierCustomerCartTotal(response.data.cart_page_array.length)
          );
        });
    };

    const GetRectifyOrderCount = async () => {
      axios
        .get(URL + "/rectify", {
          params: { user_id: atob(localStorage.getItem("user_id")) },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("CUSTOMER ORDER RECTIDFY DATA ---- ", response);

          dispatch(
            SupplierCustomerRectifyCartTotal(response.data.all_data.length)
          );
        });
    };
    // if (cartTotal == 0) {
    GetCartCount();
    // }
    GetRectifyOrderCount();
    let selectedStore = JSON.parse(localStorage.getItem('selected_store'))
    if (selectedStore !== null) {
      setStoreData(selectedStore)
    }
  }, []);

  const selectStore = (store) => {
    handleLocalStorage(store)
    setStoreSelected(true)
  }

  const navigate = useNavigate();
  const params = useParams();
  const handleSupplierclick = (id) => {
    const response = axios
      .get(
        `${URL}/supplierdetails/${id}/${atob(localStorage.getItem("user_id"))}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      )
      .then((response) => {
        if (response.data.success == true) {
          navigate(`/supplierProducts/${id}/RD`);
        } else {
          navigate({
            pathname: "/supplierCustomerCart/RD",
            state: { error: response.data.message },
          });
        }
      });
  };

  const [isModalOpen, setIsModalOpen] = useState()
  const setModalStatus = () => {
    localStorage.setItem('isModalOpen', false)
    setIsModalOpen(false)
  }


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

                  {isModalOpen == true &&
                    <Modal
                      centered
                      scrollable={true}
                      isOpen={isModalOpen}

                    >
                      <ModalHeader>
                        {trans("Select Store")}
                      </ModalHeader>
                      <ModalBody>

                        {userStores != [] &&
                          userStores.map((store) => {
                            return <Row className="mb-2">
                              <Col md='12 d-flex'>
                                <h6 className="col-9">{store.name_fr}</h6>
                                <div className='col-3'>
                                  <Button onClick={() => selectStore(store)}>select</Button>
                                </div>
                              </Col>
                            </Row>
                          })
                        }

                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={setModalStatus}>
                          {trans("Cancel")}
                        </Button>
                      </ModalFooter>
                    </Modal>
                  }

                  <Row>
                    {suppliers.length > 0 ? (
                      suppliers.map((supplier) => {
                        return (
                          <Col sm="4" className="p-2">
                            <Card
                              style = {{cursor: 'pointer'}}
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
                  </Row>



                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(CustomerSuppliers);
