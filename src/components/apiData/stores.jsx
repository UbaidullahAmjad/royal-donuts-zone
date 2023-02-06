/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumb from "../../layout/breadcrumb";
import logo from '../../assets/images/logo/logoo.png'
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

import { URL, SIMPLE_URL } from "../../env";
import { translate } from "react-switch-lang";

const Stores = (props) => {
  const trans = props.t;
  const [storeList, setStoreList] = useState([]);
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

  const handleIsActive = async (id, message) => {
    await axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/store/status/${id}`,
      // data: "",
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getStores = async () => {
          const response = await axios.get(`${URL}/stores`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("stores", response);
          // setStoreList(response.data.stores)
          const products = response.data.stores;
          products.map((item, index) => (item["index"] = index + 1));
          setStoreList(products);
        };

        getStores();
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
      field: "image",
      headerName: trans("Image"),
      renderCell: (props) => {
        return (
          <div className="avatar ratio">
            <Media
              body
              className="b-r-8"
              style={{ width: "73px", height: "100%", maxHeight:'75px' }}
              src={`${SIMPLE_URL}/images/Store/` + props.row.image}
              alt="User Image"
              onError={e => { e.currentTarget.src = logo}} 
            />
          </div>
        );
      },
    },
    { field: "name_fr", headerName: trans("Name"), flex: 2 },
    { field: "latitude", headerName: trans("Latitude"), flex: 1 },
    { field: "longitude", headerName: trans("Longitude"), flex: 1 },
    {
      field: "isActive",
      flex: 1,
      headerName: trans("Status"),
      sortable: false,
      renderCell: (cellValues) => {
        if (cellValues.value === "1") {
          return (
            <Badge
              color="success"
              pill
              style={{ display: "flex" }}
            // onClick={() =>
            //   handleIsActive(
            //     cellValues.row.id,
            //     `${trans("successfull")} ${trans("changed to")} ${trans(
            //       "Inactive"
            //     )}`
            //   )
            // }
            >
              {trans("Active")}
            </Badge>
          );
        } else if (cellValues.value === "0") {
          return (
            <Badge
              color="danger"
              pill
              style={{ display: "flex", }}
            // onClick={() =>
            //   handleIsActive(
            //     cellValues.row.id,
            //     `${trans("successfull")} ${trans("changed to")} ${trans(
            //       "Inactive"
            //     )}`
            //   )
            // }
            >
              {trans("Inactive")}
            </Badge>
          );
        }
        else if (cellValues.value === "2") {
          return (
            <Badge
              color="warning"
              pill
              style={{ display: "flex" }}
            // onClick={() =>
            //   handleIsActive(
            //     cellValues.row.id,
            //     `${trans("successfull")} ${trans("changed to")} ${trans(
            //       "Coming Soon"
            //     )}`
            //   )
            // }
            >
              {trans("Coming Soon")}
            </Badge>
          );
        }
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      // flex: 1,
      minWidth: 180,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || permissions.match("edit") != null) && <Link
                to={`/stores/edit/${cellValues.row.id}/RD`}
              >
                <Button color="primary mr-2" outline>
                  <i className="fa fa-edit"></i>
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
    const getStores = async () => {
      const response = await axios.get(`${URL}/stores`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("stores", response);
      // setStoreList(response.data.stores)
      const products = response.data.stores;
      products.map((item, index) => (item["index"] = index + 1));
      setStoreList(products);
    };

    getStores();
  }, []);

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/stores/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        // setStoreList(deleted_product);
        const deleted_product = storeList.filter((item) => item.id != id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setStoreList(index_update);
      });
  };

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Stores")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h5>
                  {trans("Ecommerce")} {trans("Stores")}
                </h5>
              </Col>
              {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                <Col className="text-right">
                  <Link to="/stores/create/RD">
                    <Button>
                      <i className="fa fa-plus mr-2"></i>
                      {trans("Create Stores")}{" "}
                    </Button>
                  </Link>
                </Col>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={storeList} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(Stores);
