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
import { useState } from "react";
import DataGrid from "../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const DeliveryCompanies = (props) => {
  const trans = props.t;
  const [deliveryCompny, setCompanies] = useState([]);
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
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };
  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "name", headerName: trans("NAME"), flex: 1 },
    {
      field: "minimum_order_amount",
      headerName: trans("MINIMUM ORDER AMOUNT"),
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
      flex: 1,
    },
    {
      field: "delivery_fee",
      headerName: trans("DELIVERY FEE"),
      flex: 1,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "action",
      headerName: trans("ACTION"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || permissions.match("edit") != null) && <Link
                to={
                  "/delivery/companies/edit/" +
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
              (role == "SuperAdmin" || permissions.match("delete") != null) && <Button
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
    const getCompanies = async () => {
      const response = await axios.get(`${URL}/deliverycompany`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("company", response);
      const companies = response.data.companies;
      companies.map((item, index) => (item["index"] = index + 1));
      setCompanies(companies);
    };

    getCompanies();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/deliverycompany/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_company = deliveryCompny.filter((item) => item.id != id);
        const index_update = deleted_company;
        index_update.map((item, index) => (item["index"] = index + 1));
        setCompanies(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));
  return (
    <>
      <Fragment>
        {/* <Breadcrumb
          parent={trans("Supplier")}
          title={trans("Delivery Companies")}
        />
        <Container fluid={true}>
          <Card> */}
          <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            <h5>
              {trans("Delivery Companies")}
            </h5>
          </Col>
                {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                  <Col md='6' className="text-right">
                    <Link to="/delivery/companies/create/RD">
                      <Button>
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Delivery Companies")}
                      </Button>
                    </Link>
                  </Col>
                )}
          
            </CardHeader>
            {/* <CardBody> */}
              <DataGrid columns={columns} rows={deliveryCompny} />
            {/* </CardBody> */}
          {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(DeliveryCompanies);
