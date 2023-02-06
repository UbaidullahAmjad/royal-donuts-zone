/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";

import { useTranslation, } from "react-i18next";
import logo from "../../../assets/images/logo/logoo.png";
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../../components/dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import { URL, SIMPLE_URL } from "../../../env";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoriesListAction,
  HandleCategoryIsActiveAction,
  DeleteCategoryAction,
  CategoriesBulkDeleteAction,
} from "../../../redux/Pages/ProductManagement/Categories/actions";

const Categories = (props) => {
  const { t } = useTranslation();
const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [openCSV, setOpenCSV] = useState(false);

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
          dispatch(DeleteCategoryAction(id, trans))
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

  const allCategories = useSelector((state) => state.getCategories);
  useEffect(() => {
    if (allCategories?.categoriesList.length == 0) {
      dispatch(CategoriesListAction())
    }
  }, [])

  useEffect(() => {
    if (allCategories && allCategories.categoriesList.length > 0
      && allCategories.tempArrLength != 0
      && allCategories.categoriesList.length != allCategories.tempArrLength) {
      dispatch(CategoriesListAction())
    }
  }, []);


  const handleOnClickSelectionModelDeleteButton = (bulkIds) => {
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
        dispatch(CategoriesBulkDeleteAction(bulkIds, trans))
      }
    });
  };

  const handleIsActive = (id, message) => {
    dispatch(HandleCategoryIsActiveAction(id, message))
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    {
      field: "index",
      title: "#",
      flex: 0.6,
      minWidth: 60,
    },
    {
      field: "image",
      title: trans("Image"),
      minWidth: 110,
      flex: 1,
      render: (rowData) => {
        return (
          <div className="avatar ratio">
            <Media
              body
              className="b-r-8"
              style={{ minWidth: "73px", height: "100%", maxHeight: "75px" }}
              src={`${SIMPLE_URL}/images/Category/` + rowData.image}
              alt="#"
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
      minWidth: 220,
      flex: 1,
    },
    {
      field: "isActive",
      title: trans("Status"),
      minWidth: 120,
      flex: 1,
      sortable: false,
      render: (rowData) => {
        return rowData.isActive == "1" ? (
          <Badge
            color="success"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleIsActive(
                rowData.id,
                `${trans("successfull")} ${trans("changed to")} ${trans(
                  "Inactive"
                )}`
              )
            }
          >
            {trans("Active")}
          </Badge>
        ) : (
          <Badge
            color="danger"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleIsActive(
                rowData.id,
                `${trans("successfull")} ${trans("changed to")} ${trans(
                  "Active"
                )}`
              )
            }
          >
            {trans("In-Active")}
          </Badge>
        );
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      minWidth: 190,
      flex: 1.5,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/ecommerce/categories/edit/${cellValues.id}`}>
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

  const actions = [
    {
      ...((role == "SuperAdmin" || permissions.match("edit") != null) && {
        icon: 'fa fa-edit',
        // tooltip: 'Edit',
        typeLink: true,
        linkClass: "mr-2",
        link: (rowData) => `/ecommerce/categories/edit/${rowData.id}`,
        color: 'warning',
        hidden: false,
      }),
    },
    {
      ...((role == "SuperAdmin" || permissions.match("delete") != null) && {
        icon: 'fa fa-trash-o',
        // tooltip: 'Delete',
        color: 'danger',
        name: "alertDanger",
        hidden: false,
        onClick: (event, rowData) => {
          // Do save operation
        }
      }),
    },
  ];

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/category_csv_export`,
    }).then((res) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data);

      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/plain;charset=UTF-8" });
      saveAs(blob, `categories.csv`);
    });
  };

  const [csvFile, setCSVFile] = useState();

  const uploadCSV = (e) => {
    setCSVFile(e.target.files[0]);
  };

  const SubmitCSV = (data) => {
    const formDatta = new FormData();
    formDatta.append("csv", csvFile);
    axios({
      method: "post",
      url: `${URL}/category_csv_import`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formDatta,
    })
      .then((res) => {
        toast.success(trans("successfull"));
      })
      .catch((error) => {
        toast.error(trans("error"));
      });
  };

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Products Management")}
        title={trans("Categories")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Col className="text-right">
                    <Link to="/ecommerce/categories/create" className="mr-2">
                      <Button className="mb-2 mb-sm-0">
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Category")}{" "}
                      </Button>
                    </Link>
                    <button
                      className="btn btn-warning mr-2 mb-2 mb-sm-0"
                      onClick={() => setOpenCSV(!openCSV)}
                    >
                      {trans("Import CSV")}{" "}
                    </button>
                    <button
                      className="btn btn-success mr-2 mr-sm-0"
                      onClick={() => downloadCSV()}
                    >
                      {trans("Export CSV")}{" "}
                    </button>
                  </Col>
                )}
            </Row>
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={allCategories.categoriesList}
              options={{
                selection: true
              }}
              actions={[
                ((role == "SuperAdmin" || permissions.match("edit") != null) && {
                  // tooltip: 'Remove All Selected Users',
                  className: 'ml-2 px-3',
                  icon: 'fa fa-trash',
                  color: 'danger',
                  onClick: (evt, data) => {
                    const ids = data.map((item) => item.id)
                    handleOnClickSelectionModelDeleteButton(ids);
                  },
                }),
              ]}
              isLoading={allCategories.loading && allCategories.categoriesList.length == 0 ? true : false}
            />
          </CardBody>
          <Modal isOpen={openCSV} toggle={() => setOpenCSV(!openCSV)} centered>
            <ModalHeader toggle={() => setOpenCSV(!openCSV)}>
              {trans("Import CSV file")}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <Form
                        id="form1"
                        className="needs-validation"
                        noValidate=""
                        onSubmit={handleSubmit(SubmitCSV)}
                      >
                        <div className="form-row">
                          <Col md="12 mb-3">
                            <Label htmlFor="validationCustom02">
                              {trans("Upload file")}{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              className="form-control"
                              name="csv_file"
                              type="file"
                              accept=".csv"
                              onChange={(e) => uploadCSV(e)}
                              innerRef={register({
                                required: true,
                                pattern: /(.*?)\.(csv)$/,
                              })}
                            />
                            <span>
                              {errors.csv_file?.type == "required" &&
                                trans("field is required")}
                              {errors.csv_file?.type == "pattern" &&
                                trans("Only CSV file can be uploaded")}
                            </span>
                          </Col>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="d-flex justify-content-between">
              <Button color="success" type="submit" form="form1">
                {trans("Upload")}
              </Button>
              <Button onClick={() => setOpenCSV(!openCSV)} color="danger">
                {trans("Cancel")}
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Categories;
