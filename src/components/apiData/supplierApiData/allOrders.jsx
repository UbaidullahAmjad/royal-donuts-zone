import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
} from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";
import { toast } from "react-toastify";
import DataGrid from "../../dataTable/dataTable";

const AllOrders = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [orders, setOrders] = useState([]);
  const [generateMail, setGenerateMail] = useState(false);
  const [JsonData, setJsonData] = useState(null);
  const [ordersAll, setOrdersAll] = useState([]);

  const [RectifyOrderModal, setRectifyOrderModal] = useState(false);
  const [CommentData, setCommentData] = useState(null);

  const [RectifyOrderId, setRectifyOrderId] = useState(null);

  const RectifyOrderModaltoggle = (id) => {
    if (id != null) {
      setRectifyOrderId(id);
    }
    setRectifyOrderModal(!RectifyOrderModal);
  };

  const SubmitRectifyOrder = () => {
    if (RectifyOrderId != null) {
      axios
        .get(URL + "/rectify_orders", {
          params: {
            order_id: RectifyOrderId,
            message: CommentData,
            admin_id: atob(localStorage.getItem("user_id")),
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          if (response.data.success) {
            setRectifyOrderModal(false);
            toast.success(trans("Order Is Rectified Successfully"), {
              position: "top-right",
            });
            const get_all_orders = orders.filter(
              (item) => item.order.id != RectifyOrderId
            );
            setOrders(get_all_orders);
          }
        })
        .catch((error) => {
          if (error.response.data.error == "Unauthorized") {
            toast.success(trans(error.response.data.message), {
              position: "top-right",
            });
          }
        });
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(`${URL}/allorders`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      const orders = response.data.all_orders;
      orders.map((item, index) => (item["index"] = index + 1));
      setOrders(orders);
    };

    getOrders();
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [OrderId, setOrderId] = useState(null);

  const generateMailToggle = (id) => {
    setGenerateMail(!generateMail);
    setOrderId(id);
  };

  const onSubmit = (data) => {
    navigate({
      pathname: `/apiData/supplierApiData/allOrders/${OrderId}`,
      state: { formData: data },
    });
  };

  const GetJsonData = () => setJsonData(!JsonData);

  const OrderStatus = (order_id, order_status) => {
    axios
      .get(URL + "/supplier/order/status", {
        params: {
          order_id: order_id,
          order_status: order_status,
          admin_id: atob(localStorage.getItem("user_id")),
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(trans("Order Status Is Changed Successfully"), {
            position: "top-right",
          });
          const copy_orders = [...orders];
          const find_order_index = copy_orders.findIndex(
            (item) => item.order.id == order_id
          );
          copy_orders[find_order_index].order.order_status =
            order_status.toString();
          setOrders(copy_orders);
        }
      })
      .catch((error) => {
        if (error.response.data.error == "Unauthorized") {
          toast.success(trans(error.response.data.message), {
            position: "top-right",
          });
        }
      });
  };

  const columns = [
    { field: "index", headerName: "#", width: 70 },
    { field: "order_number", headerName: trans("Order"), width: 150 },
    { field: "supplier_name", headerName: trans("Supplier"), width: 160 },
    { field: "user_name", headerName: trans("Customer"), width: 160 },
    { field: "order_status", headerName: trans("Status"), width: 150 },
    { field: "total", headerName: trans("Total"), width: 150 },
    { field: "actions", headerName: trans("Actions"), width: 150 },
  ];

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("Orders")} />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>{trans("Supplier Orders")}</h5>
                </CardHeader>
                <CardBody>
                  {orders.map((orders) => {
                    <>
                      <DataGrid columns={columns} rows={orders.order} />
                    </>;
                  })}
                  {/* <DataGrid columns={columns} rows={orders.order} /> */}
                </CardBody>
                <CardBody className="d-none">
                  {orders.length > 0 ? (
                    orders.map((order) => {
                      return (
                        <Row>
                          <Col sm="12">
                            <Card
                              className="px-2"
                              style={{ border: "1px solid lightgray" }}
                            >
                              <CardHeader>
                                <Table>
                                  <thead className="thead-light">
                                    <tr>
                                      <th scope="col">
                                        {trans("Order") + " #"}
                                      </th>
                                      <th scope="col">{trans("Supplier")}</th>
                                      <th scope="col">{trans("Customer")}</th>
                                      <th scope="col">{trans("Status")}</th>
                                      <th scope="col">{trans("Total")}</th>
                                      <th scope="col">{trans("Actions")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{order.order.order_number}</td>
                                      <td>{order.order.supplier_name}</td>
                                      <td>{order.order.user_name}</td>
                                      <td>
                                        {order.order.order_status === "1" && (
                                          <Badge color="info">
                                            {trans("Confirmed")}
                                          </Badge>
                                        )}
                                        {order.order.order_status === "2" && (
                                          <Badge color="primary">
                                            {trans("Indelivery")}
                                          </Badge>
                                        )}
                                        {order.order.order_status === "3" && (
                                          <Badge color="success">
                                            {trans("Delivered")}
                                          </Badge>
                                        )}
                                        {order.order.order_status === "4" && (
                                          <Badge color="warning">
                                            {trans("Treated")}
                                          </Badge>
                                        )}
                                      </td>
                                      <td>{order.order.total + " €"}</td>
                                      <td className="d-flex justify-content-center">
                                        <Link
                                          to={`/supplier/orders/invoice/${order.order.id}`}
                                        >
                                          <Button color="warning mr-2">
                                            <i className="fa fa-file-text-o"></i>
                                          </Button>
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </CardHeader>
                              <CardBody>
                                <Table>
                                  <thead className="thead-light">
                                    <tr>
                                      <th scope="col">{"#"}</th>
                                      <th scope="col">{trans("Name")}</th>
                                      <th scope="col">{trans("Unit")}</th>
                                      <th scope="col">{trans("Price")}</th>
                                      <th scope="col">
                                        {trans("Required Quantity")}
                                      </th>
                                      <th scope="col">
                                        {trans("Minimum Quantity")}
                                      </th>
                                    </tr>
                                  </thead>
                                  {order.order_items.map((item, ind) => {
                                    return (
                                      <tbody>
                                        <tr>
                                          <th scope="row">{ind + 1}</th>
                                          <td>{item.product_name}</td>
                                          <td>{item.unit_name}</td>
                                          <td>
                                            {item.unit_price} {" " + "€"}
                                          </td>
                                          <td>{item.quantity}</td>
                                          <td>{item.min_quantity}</td>
                                        </tr>
                                      </tbody>
                                    );
                                  })}
                                </Table>
                                <Row className="mt-3">
                                  <Col sm="8" md="8">
                                    <Modal
                                      isOpen={generateMail}
                                      toggle={() =>
                                        generateMailToggle(order.order.id)
                                      }
                                      centered
                                    >
                                      <Form
                                        className="needs-validation"
                                        noValidate=""
                                        onSubmit={handleSubmit((data) =>
                                          onSubmit(data)
                                        )}
                                      >
                                        <ModalHeader
                                          toggle={() =>
                                            generateMailToggle(order.order.id)
                                          }
                                        >
                                          {trans("Comments")}
                                        </ModalHeader>
                                        <ModalBody>
                                          <Input
                                            className="form-control"
                                            name="comments"
                                            type="textarea"
                                            innerRef={register({
                                              required: false,
                                            })}
                                          />
                                          <span>
                                            {errors.comments &&
                                              trans("field is required")}
                                          </span>
                                          <div className="valid-feedback">
                                            {"Looks good!"}
                                          </div>
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button
                                            color="secondary"
                                            onClick={() =>
                                              generateMailToggle(null)
                                            }
                                          >
                                            {trans("Cancel")}
                                          </Button>
                                          <Button color="primary">
                                            {trans("Generate")}
                                          </Button>
                                        </ModalFooter>
                                      </Form>
                                    </Modal>
                                    {(order.email == "" ||
                                      order.email == null) && (
                                        <Button
                                          color="primary"
                                          onClick={() =>
                                            generateMailToggle(order.order.id)
                                          }
                                        >
                                          {trans("Generate")}
                                        </Button>
                                      )}
                                    <Button
                                      className="ml-2"
                                      onClick={GetJsonData}
                                    >
                                      JSON
                                    </Button>
                                    <Modal
                                      isOpen={JsonData}
                                      toggle={GetJsonData}
                                      centered
                                    >
                                      <ModalHeader toggle={GetJsonData}>
                                        {trans("JSON")}
                                      </ModalHeader>
                                      <ModalBody>
                                        <div>
                                          <pre>
                                            {JSON.stringify(order.order)}
                                          </pre>
                                        </div>
                                      </ModalBody>
                                    </Modal>
                                  </Col>
                                  <Col sm="4" md="4">
                                    {order.order.order_status == 4 && (
                                      <div>
                                        <Button className="mr-2">
                                          {trans("Treated")}
                                        </Button>
                                        <i className="fa fa-long-arrow-right"></i>
                                        <Button
                                          className="ml-2"
                                          color="success"
                                          onClick={() =>
                                            OrderStatus(order.order.id, 2)
                                          }
                                        >
                                          {trans("Indelivery")}
                                        </Button>
                                      </div>
                                    )}
                                    {order.order.order_status == 2 && (
                                      <div>
                                        <Button className="mr-2">
                                          {trans("Indelivery")}
                                        </Button>
                                        <i className="fa fa-long-arrow-right"></i>
                                        <Button
                                          className="ml-2"
                                          color="success"
                                          onClick={() =>
                                            OrderStatus(order.order.id, 3)
                                          }
                                        >
                                          {trans("Delivered")}
                                        </Button>
                                      </div>
                                    )}
                                    {order.order.order_status != 3 && (
                                      <div>
                                        <Button
                                          className={
                                            "mr-2 " &&
                                            order.order.order_status != 1 &&
                                            "mt-2"
                                          }
                                          onClick={() =>
                                            RectifyOrderModaltoggle(
                                              order.order.id
                                            )
                                          }
                                        >
                                          {trans("Rectify Order")}
                                        </Button>
                                        <Modal
                                          isOpen={RectifyOrderModal}
                                          toggle={() =>
                                            RectifyOrderModaltoggle(null)
                                          }
                                          centered
                                        >
                                          <ModalHeader
                                            toggle={() =>
                                              RectifyOrderModaltoggle(null)
                                            }
                                          >
                                            {trans("Delivery Information")}
                                          </ModalHeader>
                                          <ModalBody>
                                            <div id="data">
                                              <div style={{ padding: "10px" }}>
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
                                              onClick={RectifyOrderModaltoggle}
                                            >
                                              {trans("Cancel")}
                                            </Button>
                                            <Button
                                              color="primary"
                                              onClick={SubmitRectifyOrder}
                                            >
                                              {trans("Confirmed")}
                                            </Button>
                                          </ModalFooter>
                                        </Modal>
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <h6>{trans("No Data Found")}</h6>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default AllOrders;
