import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../layout/breadcrumb";
import { toast } from "react-toastify";
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
import { useLocation } from "react-router-dom";
import { translate } from "react-switch-lang";

const GeneratedMail = (props) => {
  const trans = props.t;
  const params = useParams();
  const id = params.idd;
  const [orders, setOrders] = useState([]);
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();
  const [delivery_date, setDeliveryDate] = useState();
  const [singleOrder, setSingleOrder] = useState();
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [SupplierData, setSupplierData] = useState(null);
  const [orderId, setId] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  let emailData = {
    header: header,
    footer: footer,
    message: message,
    order: singleOrder,
    user_id: userId,
    order_number: orderNumber,
    id: orderId,
  };

  console.log("email data", emailData);

  useEffect(() => {
    const getOrders = async () => {
      axios
        .get(`https://ecco.royaldonuts.xyz/api/email/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("orders", response);
          const orders = response.data.order_items;
          setOrders(orders);
          setSupplierData(response.data.supplier);
          setHeader(response.data.head);
          setFooter(response.data.setting.description);
          setDeliveryDate(response.data.order.delivery_date);
          setSingleOrder(response.data.order.id);
          setOrderNumber(response.data.order.order_number);
          setUserId(response.data.order.user_id);
          setId(response.data.order.id);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getOrders();
  }, []);

  useEffect(() => {
    if (message == null) {
      if (location.state != undefined) {
        localStorage.setItem("OrderMessage", location.state.formData.comments);
        let commentsData = location.state.formData;

        setMessage(commentsData.comments);
      } else {
        setMessage(localStorage.getItem("OrderMessage"));
      }
    }
  }, [location]);
  console.log("MESSAGE --- ", message);
  const sendEmail = () => {
    emailData["admin_id"] = atob(localStorage.getItem("user_id"));
    console.log("ADMIN IDDD 0000 ------ ", emailData);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: "https://ecco.royaldonuts.xyz/api/emailsend",
      data: emailData,
    }).then((response) => {
      console.log("response is", response);
      if (response.data.success == true) {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });

          // navigate("/apiData/supplierApiData/allOrders/RD");
          navigate("/supplier/orders/list/RD");
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  };

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("email")} />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <p dangerouslySetInnerHTML={{ __html: header }}></p>
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">{"#"}</th>
                        <th scope="col">{trans("Name")}</th>
                        <th scope="col">{trans("Unit")}</th>
                        <th scope="col">{trans("Price")}</th>
                        <th scope="col">{trans("Required Quantity")}</th>
                        <th scope="col">{trans("Minimum Quantity")}</th>
                      </tr>
                    </thead>
                    {orders !== [] &&
                      orders.map((item, ind) => {
                        return (
                          <tbody>
                            <tr>
                              <th scope="row">{ind + 1}</th>
                              <td>{item.product_name}</td>
                              <td>{item.unit_name}</td>
                              <td>{item.unit_price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.min_quantity}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </Table>
                  <Row className="mt-4 p-3 d-flex flex-row">
                    <p>
                      {trans("The expected delivery date for your order is")} :
                    </p>{" "}
                    <span>{delivery_date}</span>
                  </Row>
                  <Row className="mt-2 ms-4 p-3 d-flex flex-row">
                    <p dangerouslySetInnerHTML={{ __html: footer }}></p>
                  </Row>
                  <Row>
                    {header === "No header exist" && (
                      <p>
                        {trans("Please Add Header for supplier")}{" "}
                        {SupplierData !== null && SupplierData.name}{" "}
                        {trans("before sending email")}
                      </p>
                    )}
                    {header !== "No header exist" && (
                      <Button color="primary" onClick={sendEmail}>
                        <i className="fa fa-send mr-2"></i>
                        {trans("Send")}
                      </Button>
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

export default translate(GeneratedMail);
