import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

const SupplierUnits = (props) => {
  const trans = props.t;
  const [supplierUnits, setUnits] = useState([]);
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

  const handleIsActive = (id, message) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/unit/status/${id}`,
      // data: "",
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getUnits = async () => {
          const response = await axios.get(`${URL}/unit`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("unit", response);
          const units = response.data.units;
          units.map((item, index) => (item["index"] = index + 1));
          setUnits(units);
        };
        getUnits();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const columns = [
    { field: "index", headerName: "#", flex: 1 },
    { field: "name", headerName: trans("Name"), flex: 2 },
    { field: "abbreviation", headerName: trans("Abbreviation"), flex: 1 },
    {
      field: "isActive",
      headerName: trans("Status"),
      flex: 1,
      renderCell: (cellValues) => {
        if (cellValues.value === 1) {
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
      field: "action",
      headerName: trans("Action"),
      flex: 2,
      renderCell: (cellValues) => {
        return (
          <div className="text-center d-flex w-100">
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={
                  "/units/edit/" +
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
    const getUnits = async () => {
      const response = await axios.get(`${URL}/unit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("unit", response);
      const units = response.data.units;
      units.map((item, index) => (item["index"] = index + 1));
      setUnits(units);
    };

    getUnits();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/unit/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_units = supplierUnits.filter((item) => item.id != id);
        const index_update = deleted_units;
        index_update.map((item, index) => (item["index"] = index + 1));
        setUnits(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));
  return (
    <>
      <Fragment>
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Units")} /> */}
        {/* <Container fluid={true}>
          <Card> */}
            <CardHeader className="p-0 pb-4 mb-4 d-flex" >
                 <Col md='6'>
                  <h5 >
                    {trans("Supplier")} {trans("Units")}
                  </h5>
                  </Col>
                {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                  <Col md='6' className="text-right">
                    <Link to="/units/create/RD">
                      <Button>
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Unit")}
                      </Button>
                    </Link>
                  </Col>
                )}
            </CardHeader>
  
              <DataGrid columns={columns} rows={supplierUnits} />
         
          {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(SupplierUnits);
