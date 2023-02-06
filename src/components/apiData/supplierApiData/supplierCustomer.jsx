import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
} from "reactstrap";
import SweetAlert from "sweetalert2";
import { useState } from "react";
import DataGrid from "../../dataTable/dataTable";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const SupplierCustomr = (props) => {
  const trans = props.t;
  const [customerList, setCustomers] = useState([]);
  const [alert, setalert] = useState(false);

  const Displayalert = (name, id) => {
    setalert(true);
    if (name === "alertDanger") {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Once deleted, you will not be able to recover it!"),
        icon: "error",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          console.log("result value", id);
          DeleteItem(id);
          SweetAlert.fire({
            icon: "success",
            title: (trans("Deleted")),
            text: (trans("Your item has been deleted.")),
            confirmButtonText: trans("OK")
          });
        }
      });
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "name", headerName: trans("Name"), flex: 1.5 },
    { field: "email", headerName: trans("Email"), flex: 1.5 },
    { field: "zip_code", headerName: trans("Zip"), flex: 1 },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1.5,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={
                  "/supplier/customers/edit/" +
                  cellValues.row.id +
                  "/" +
                  "RD"
                }
              >
                <Button outline color="primary" className="mr-2">
                  <i className="fa fa-edit" outline></i>
                </Button>
              </Link>
            }
            {
              (role == "SuperAdmin" || (permissions.match("delete") != null)) && <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.row.id)}
              >
                {" "}
               <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
              </Button>
            }
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getCustomers = async () => {
      const response = await axios.get(`${URL}/supplier_customer`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("customer", response);
      const customer = response.data.customers;
      customer.map((item, index) => (item["index"] = index + 1));
      setCustomers(customer);
    };

    getCustomers();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/supplier_customer/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_customer = customerList.filter((item) => item.id != id);
        const index_update = deleted_customer;
        index_update.map((item, index) => (item["index"] = index + 1));
        setCustomers(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));
  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("Customers")} />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <h5>
                    {trans("Supplier")} {trans("Customers")}
                  </h5>
                </Col>
                {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                  <Col className="text-right">
                    <Link to="/supplier/customers/create/RD">
                      <Button>
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Customers")}{" "}
                      </Button>
                    </Link>
                  </Col>
                )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataGrid columns={columns} rows={customerList} />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(SupplierCustomr);
