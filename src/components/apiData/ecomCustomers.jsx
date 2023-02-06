import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
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
} from "reactstrap";
import DataTable from "../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";

import { URL } from "../../env";
import { translate } from "react-switch-lang";
const EcomCustomers = (props) => {
  const trans = props.t;
  const [customersList, setCustomers] = useState([]);
  const [alert, setalert] = useState(false);

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "name", headerName: trans("Name"), flex: 1 },
    { field: "email", headerName: trans("Email"), flex: 1 },
    { field: "mobilenumber", headerName: trans("Phone"), flex: 1 },
    { field: "address", headerName: trans("Address"), flex: 1 },

    {
      field: "action",
      headerName: trans("Action"),
      flex: 1.5,
      renderCell: (cellValues) => {
        return (
          <div className="text-center w-100">
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={`/ecommerce/customers/edit/${cellValues.row.id}/RD`}>
                <Button color="primary mr-2" outline>
                  <i className="fa fa-edit"></i>
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
      const response = await axios.get(`${URL}/eccom-user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("customers", response);
      // setCustomers(response.data.orders)
      const Customers = response.data.user;
      Customers.map((item, index) => (item["index"] = index + 1));
      setCustomers(Customers);
    };

    getCustomers();
  }, []);


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

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .get(`${URL}/eccom-user-delete`, { params: { id: id } }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = customersList.filter((item) => item.id != id);
        setCustomers(deleted_product);
      });
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Ecommerce Customers")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <h5>{trans("Ecommerce Customers")}</h5>
              {
                (role == "SuperAdmin" || (permissions.match("create") != null)) && <Link
                  to={'/ecommerce/customers/create/RD'}>
                  <Button color="primary mr-2">
                    {trans("Create Customer")}
                  </Button>
                </Link>
              }
            </div>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={customersList} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(EcomCustomers);
