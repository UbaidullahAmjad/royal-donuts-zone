/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { translate } from "react-switch-lang";

const FormsListing = (props) => {
  const trans = props.t;

  const [allLeads, setAllLeads] = useState([]);

  const Displayalert = (name, id) => {
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
          DeleteItem(id);
          SweetAlert.fire({
            icon: "success",
            title: trans("Deleted!"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "name", headerName: trans("First Name"), flex: 1 },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1.2,
      renderCell: (cellValues) => {
        return (
          <div>
            <Link to={`/lead/forms/view/${cellValues.row.id}/RD`}>
              <Button color="success mr-2" outline>
                <i className="fa fa-eye"></i>
              </Button>
            </Link>
            <Link to={`/lead/forms/edit/${cellValues.row.id}/RD`}>
              <Button color="primary mr-2" outline>
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7"
              name="alertDanger"
              onClick={(e) => Displayalert(e.target.name, cellValues.row.id)}
            >
             <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`https://ecco.royaldonuts.xyz/api/formss/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_product = allLeads.filter((item) => item.id !== id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setAllLeads(index_update);
      });
  };

  useEffect(() => {
    const getAllForms = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/formss`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      const leads = response.data.forms;
      leads.map((item, index) => (item["index"] = index + 1));
      setAllLeads(leads);
    };

    getAllForms();
  }, []);

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      {/* <Breadcrumb
                parent={trans("Lead") + " " + trans("Forms")}
                title={trans("Forms Listing")}
            /> */}
      {/* <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card> */}
      <CardHeader className="p-0 pb-4 mb-4 d-flex">
        <Col md="6">
          <h5>
            {trans("Lead")} {trans("Forms")}
          </h5>
        </Col>
        {permissions.match("create") && (
          <Col md="6" className="text-right">
            <Link to="/lead/forms/create/RD">
              <Button>
                <i className="fa fa-plus mr-2"></i>
                <span className="text-capitalize">
                  {`${trans("create")} ${trans("Form")} `}
                </span>
              </Button>
            </Link>
          </Col>
        )}
      </CardHeader>
      <DataTable columns={columns} rows={allLeads} />
      {/*                  
                        </Card>
                    </Col>
                </Row>
            </Container> */}
    </Fragment>
  );
};

export default translate(FormsListing);
