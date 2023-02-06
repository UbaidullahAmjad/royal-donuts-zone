/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  Media,
} from "reactstrap";
import DataTable from "../../../components/dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  PagesListAction,
  HandlePageIsActiveAction,
  HandlePageFooterActiveAction,
  DeletePageAction,
} from "../../../redux/Pages/Cms/Pages/actions";

const Products = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const dispatch = useDispatch();
  // const [PageList, setPageList] = useState(null);
  const PageList = useSelector((state) => state.getPages);

  const [alert, setalert] = useState(false);

  useEffect(() => {
    if (PageList?.pagesList.length == 0) {
      dispatch(PagesListAction())
    }
    if (PageList && PageList.pagesList.length > 0
      && PageList.tempArrLength != 0
      && PageList.pagesList.length != PageList.tempArrLength) {
      dispatch(PagesListAction())
    }
  }, [PageList?.pagesList]);

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
          dispatch(DeletePageAction(id, trans))
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
    dispatch(HandlePageIsActiveAction(id, message));
  };

  const handleIsFooter = (id, message) => {
    dispatch(HandlePageFooterActiveAction(id, message));
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    {
      field: "title_fr",
      title: trans("French Title"),
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "status",
      title: trans("Status"),
      flex: 1,
      minWidth: 110,
      render: (cellValues) => {
        if (cellValues.status === "1") {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.id,
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
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.id,
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
      title: trans("Footer"),
      flex: 1,
      minWidth: 120,
      render: (cellValues) => {
        if (cellValues.is_footer == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsFooter(
                  cellValues.id,
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
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsFooter(
                  cellValues.id,
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
      title: trans("Publication Date"),
      flex: 1.25,
      minWidth: 230,
      render: (cellValues) => {
        return moment(cellValues.created_at, "YYYY-MM-DDTHH:mm:ss").format(
          "ddd, Do MMM, YYYY"
        );
      },
      valueGetter: (cellValues) => {
        return moment(cellValues.created_at, "YYYY-MM-DDTHH:mm:ss").format(
          "ddd, Do MMM, YYYY"
        );
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/cms/pages/edit/${cellValues.id}`}>
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
        parent={trans("CMS")}
        title={trans("Pages")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {/* <h5>
                  {trans("Ecommerce")} {trans("Pages")}
                </h5> */}
              </Col>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Col className="text-right">
                    <Link to="/cms/pages/create">
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
            <DataTable
              columns={columns}
              data={PageList.pagesList}
              isLoading={PageList.pagesList.length == 0 ? true : false}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Products;
