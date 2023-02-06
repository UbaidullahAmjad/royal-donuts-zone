import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

const Products = (props) => {
  const trans = props.t;
  console.log("DATAAAAA");
  const [PageList, setPageList] = useState(null);

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

  const handleIsActive = (id, message) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/pages/status/${id}`,
      // data: "",
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getProducts = async () => {
          const response = await axios.get(`${URL}/pages`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("resp", response);
          const products = response.data.pages;
          products.map((item, index) => (item["index"] = index + 1));
          setPageList(products);
        };
        getProducts();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };
  const handleIsFooter = (id, message) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/pages/position/${id}`,
      // data: "",
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getProducts = async () => {
          const response = await axios.get(`${URL}/pages`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("resp", response);
          const products = response.data.pages;
          products.map((item, index) => (item["index"] = index + 1));
          setPageList(products);
        };
        getProducts();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    {
      field: "title_fr",
      headerName: trans("French Title"),
      flex: 1,
    },
    {
      field: "status",
      flex: 0.5,
      headerName: trans("Status"),
      renderCell: (cellValues) => {
        if (cellValues.value === "1") {
          return (
            <Badge
              color="success"
              pill
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.row.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Inactive"
                  )}`
                )
              }
            >
              {trans("Active")}
            </Badge>
          );
        } else {
          return (
            <Badge
              color="danger"
              pill
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.row.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Active"
                  )}`
                )
              }
            >
              {trans("Inactive")}
            </Badge>
          );
        }
      },
    },
    {
      field: "is_footer",
      flex: 1,
      headerName: trans("Footer"),
      renderCell: (cellValues) => {
        if (cellValues.value == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                handleIsFooter(
                  cellValues.row.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Inactive"
                  )}`
                )
              }
            >
              {trans("Active")}
            </Badge>
          );
        } else {
          return (
            <Badge
              color="danger"
              pill
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                handleIsFooter(
                  cellValues.row.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Active"
                  )}`
                )
              }
            >
              {trans("Inactive")}
            </Badge>
          );
        }
      },
    },
    {
      field: "created_at",
      headerName: trans("Publication Date"),
      flex: 1.5,
      renderCell: (cellValues) => {
        var date = new Date(cellValues.row.created_at);
        return date.toLocaleString();
      },
      valueGetter: (cellValues) => {
        var date = new Date(cellValues.row.created_at);
        return date.toLocaleString();
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      minWidth: 220,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={`/settings/ecommerce/pages/edit/${cellValues.row.id}/RD`}
              >
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

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/pages/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = PageList.filter((item) => item.id != id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setPageList(index_update);
      });
  };
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`${URL}/pages`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      const products = response.data.pages;
      products.map((item, index) => (item["index"] = index + 1));
      setPageList(products);
    };

    getProducts();
  }, []);

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Pages")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h5>
                  {trans("Ecommerce")} {trans("Pages")}
                </h5>
              </Col>
              {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                <Col className="text-right">
                  <Link to="/settings/ecommerce/pages/create/RD">
                    <Button>
                      <i className="fa fa-plus mr-2"></i>
                      {trans("Create Pages")}{" "}
                    </Button>
                  </Link>
                </Col>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            {PageList != null && (
              <DataTable columns={columns} rows={PageList} />
            )}
            {/* <h1>hehre</h1> */}
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(Products);
