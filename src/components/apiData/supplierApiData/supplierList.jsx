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

const SupplierList = (props) => {
  const trans = props.t;
  const [supplierLst, setList] = useState([]);
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
    { field: "name", headerName: trans("Name"), flex: 1 },
    { field: "email", headerName: trans("Email"), flex: 1 },
    { field: "mobilenumber", headerName: trans("Mobile Number"), flex: 1 },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 2,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("Suppliers") != null)) && <Link 
                to={`/suppliers/email/header/${cellValues.row.id}/RD`}>
                <Button outline color="light">
                  <i className="fa fa-h-square"></i>
                </Button>
              </Link>
            }
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={
                  "/suppliers/edit/" +
                  cellValues.row.id +
                  "/" +
                  "RD"
                }
              >
                <Button outline color="primary" className="ml-2 mr-2">
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
    const getList = async () => {
      const response = await axios.get(`${URL}/supplier_supplier`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("suppliers", response);
      const suppliers = response.data.suppliers;
      suppliers.map((item, index) => (item["index"] = index + 1));
      setList(suppliers);
    };

    getList();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/supplier_supplier/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_List = supplierLst.filter((item) => item.id != id);
        const index_update = deleted_List;
        index_update.map((item, index) => (item["index"] = index + 1));
        setList(index_update);
      });
  };
  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));
  console.log("supplier-list permissions:-", permissions)
  console.log("supplier-list role:-", role)

  return (
    <>
      <Fragment>
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Supplier List")} />
        <Container fluid={true}>
          <Card> */}
          <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            <h5>
              {trans("Supplier List")}
            </h5>
          </Col>
                {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                  <Col md='6' className="text-right">
                    <Link to="/suppliers/create/RD">
                      <Button>
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Supplier")}{" "}
                      </Button>
                    </Link>
                  </Col>
                )}
    
            </CardHeader>
            {/* <CardBody> */}
              <DataGrid columns={columns} rows={supplierLst} />
            {/* </CardBody> */}
          {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(SupplierList);
