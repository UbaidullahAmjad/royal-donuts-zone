/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  DataTable,
} from "../../../components";
import logo from "../../../assets/images/logo/logoo.png";
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
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  StoresListAction,
  DeleteStoreAction,
} from "../../../redux/Pages/Franchise_Store/Stores/actions";

const Stores = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const storesList = useSelector((state) => state.getStores);

  useEffect(() => {
    if (storesList?.storesList.length == 0) {
      dispatch(StoresListAction())
    }
    if (storesList && storesList.storesList.length > 0
      && storesList.tempArrLength != 0
      && storesList.storesList.length != storesList.tempArrLength) {
      dispatch(StoresListAction())
    }
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
          dispatch(DeleteStoreAction(id, trans))
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
          // setStoreList(response.data.stores)
          const products = response.data.stores;
          products.map((item, index) => (item["index"] = index + 1));
          // setStoreList(products);
        };

        getStores();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const splitNumber = (val) => {
    return val.toString().replaceAll('.', trans("dot"))
  }

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    {
      field: "image",
      title: trans("Image"),
      flex: 1,
      minWidth: 110,
      render: (props) => {
        return (
          <div className="avatar ratio">
            <Media
              body
              className="b-r-8"
              style={{ width: "73px", height: "100%", maxHeight: "75px" }}
              src={`${SIMPLE_URL}/images/Store/` + props.image}
              alt="User Image"
              onError={(e) => {
                e.currentTarget.src = logo;
              }}
            />
          </div>
        );
      },
    },
    {
      field: "name_fr",
      title: trans("Name"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "latitude",
      title: trans("Latitude"),
      flex: 1,
      minWidth: 120,
      render: (cellValues) => {
        return splitNumber(cellValues.latitude)
      }
    },
    {
      field: "longitude",
      title: trans("Longitude"),
      flex: 1,
      minWidth: 120,
      render: (cellValues) => {
        return splitNumber(cellValues.longitude)
      }
    },
    {
      field: "isActive",
      title: trans("Status"),
      flex: 1,
      minWidth: 110,
      sortable: false,
      render: (cellValues) => {
        if (cellValues.isActive === "1") {
          return (
            <Badge
              color="success"
              pill
            // style={{ display: "flex" }}
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
        } else if (cellValues.isActive === "0") {
          return (
            <Badge
              color="danger"
              pill
            // style={{ display: "flex" }}
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
        } else if (cellValues.isActive === "2") {
          return (
            <Badge
              color="warning"
              pill
            // style={{ display: "flex" }}
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
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 190,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/stores/edit/${cellValues.id}`}>
                <Button color="warning mr-2">
                  <i className="fa fa-edit"></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.id)}
              >
                {" "}
                <i
                  className="fa fa-trash-o"
                  // title="alertDanger"
                  onClick={(e) =>
                    Displayalert("alertDanger", cellValues.id)
                  }
                ></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Stores")}
        parent={trans("Franchise/Store")}
        title={trans("Stores")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {/* <h5>
                  {trans("Stores")} {trans("List")}
                </h5> */}
              </Col>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Col className="text-right">
                    <Link to="/stores/create" className="mr-2">
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
            <DataTable
              columns={columns}
              data={storesList.storesList}
              isLoading={storesList.loading && storesList.storesList?.length == 0 ? true : false}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Stores;
