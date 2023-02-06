/* eslint-disable no-unused-vars */
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
  Media,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import SweetAlert from "sweetalert2";
import { useState } from "react";
import DataGrid from "../../../components/dataTable/dataTable";
import { PlusCircle } from "react-feather";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import {
  IngredientsListAction,
  HandleIngredientsIsActiveAction,
  DeleteIngredientAction,
  IngredientsBulkDeleteAction,
} from "../../../redux/Pages/ProductManagement/Ingredients/actions";

const SupplierProducts = (props) => {
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

  const supplierProList = useSelector((state) => state.getIngredients);

  useEffect(() => {
    if (supplierProList?.ingredientsList.length == 0) {
      dispatch(IngredientsListAction())
    }
  }, [])

  useEffect(() => {
    if (supplierProList && supplierProList.ingredientsList.length > 0
      && supplierProList.tempArrLength != 0
      && supplierProList.ingredientsList.length != supplierProList.tempArrLength) {
      dispatch(IngredientsListAction())
    }
  }, [supplierProList.ingredientsList]);

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
          dispatch(DeleteIngredientAction(id, trans));
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
        // bulkDeleteApiCall(bulkIds);
        dispatch(IngredientsBulkDeleteAction(bulkIds, trans));
      }
    });
  };

  const bulkDeleteApiCall = async (bulkIds) => {
    // await axios({
    //   method: "POST",
    //   url: `${URL}/sup_product_bulk_delete`,
    //   data: { ids: JSON.stringify(bulkIds) },
    // })
    //   .then((response) => {
    //     const deleted = supplierProList.filter(
    //       (item) => !bulkIds.includes(item.id)
    //     );
    //     const index_update = deleted;
    //     index_update.map((item, index) => (item["index"] = index + 1));
    //     setSupplierproducts(index_update);
    //     SweetAlert.fire({
    //       icon: "success",
    //       title: trans("Deleted"),
    //       text: trans("Your selected items has been deleted"),
    //       confirmButtonText: trans("OK"),
    //     });
    //   })
    //   .catch((error) => {
    //     toast.error(trans("error"), {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   });
  };

  const handleIsActive = (id, message) => {
    dispatch(HandleIngredientsIsActiveAction(id, message));
  };

  const columns = [
    { field: "index", title: "#", flex: 0.5, minWidth: 20 },
    {
      field: "name",
      title: trans("Name"),
      flex: 1.5,
      minWidth: 100,
    },
    {
      field: "category",
      title: trans("Category"),
      flex: 1,
      minWidth: 40,
      render: (cellValues) => {
        return (
          <p>
            {cellValues.category != undefined &&
              cellValues.category.name}
          </p>
        );
      },
    },
    {
      field: "supplier",
      title: trans("Supplier"),
      flex: 1.5,
      minWidth: 100,
      render: (cellValues) => {
        return (
          <p>
            {" "}
            {cellValues.supplier != undefined &&
              cellValues.supplier.name}
          </p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.supplier != undefined && cellValues.supplier.name,
    },
    {
      field: "unit",
      title: trans("Unit"),
      flex: 0.9,
      minWidth: 50,
      render: (cellValues) => {
        return (
          <p>{cellValues.unit != undefined && cellValues.unit.name}</p>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.row.unit != undefined && cellValues.row.unit.name,
    },
    {
      field: "package",
      title: trans("Packing"),
      flex: 1,
      minWidth: 30,
      render: (cellValues) =>
        cellValues.package != null && (
          <p>
            {" "}
            {cellValues.package.toString().split(".").length > 1
              ? cellValues.package.toString().split(".")[0] +
              trans("Point") +
              cellValues.package.toString().split(".")[1]
              : cellValues.package.toString().split(".")[0] + " "}
          </p>
        ),
      valueGetter: (cellValues) => cellValues.package,
    },
    {
      field: "price_per_package_peritem",
      title: <span style={{ textTransform: 'capitalize' }}>{trans("unit price")}</span>,
      flex: 1,
      minWidth: 40,
      render: (cellValues) =>
        cellValues.price_per_package_peritem != null && (
          <p>
            {" "}
            {cellValues.price_per_package_peritem != null &&
              cellValues.price_per_package_peritem.toString().split(".").length > 1
              ? cellValues.price_per_package_peritem.toString().split(".")[0] +
              trans("Point") +
              cellValues.price_per_package_peritem.toString().split(".")[1]
              : cellValues.price_per_package_peritem.toString().split(".")[0] + " "}
            €
          </p>
        ),
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "price_per_package",
      title: <span style={{ textTransform: 'capitalize' }}>{trans("price per package")}</span>,
      flex: 1,
      minWidth: 40,
      render: (cellValues) =>
        cellValues.price_per_package != null && (
          <p>
            {cellValues.price_per_package != null &&
              cellValues.price_per_package.toString().split(".").length > 1
              ? cellValues.price_per_package.toString().split(".")[0] +
              trans("Point") +
              cellValues.price_per_package.toString().split(".")[1]
              : cellValues.price_per_package.toString().split(".")[0] + " "}
            €
          </p>
        ),
      valueGetter: (cellValues) => cellValues.price_per_package,
    },
    {
      field: "isActive",
      title: trans("Status"),
      flex: 1,
      minWidth: 30,
      render: (cellValues) => {
        if (cellValues.isActive == "1") {
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
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 1.5,
      minWidth: 190,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                className=""
                to={"/supplier/products/edit/" + cellValues.id}
              >
                <Button color="warning" className="mr-2">
                  <i className="fa fa-edit" outline></i>
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

  const DeleteItem = async (id) => {
    // const res = await axios
    //   .delete(`${URL}/supplier_product/${id}`, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token123"),
    //     },
    //   })
    //   .then((response) => {
    //     const deleted_product = supplierProList.filter((item) => item.id != id);
    //     const index_update = deleted_product;
    //     index_update.map((item, index) => (item["index"] = index + 1));
    //     setSupplierproducts(index_update);
    //   });
  };

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/sup_product_csv_export`,
    }).then((res) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data);

      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/plain;charset=UTF-8" });
      saveAs(blob, `Ingredients.csv`);
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
      url: `${URL}/sup_product_csv_import`,
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

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));
  return (
    <>
      <Fragment>
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Products")} /> */}
        <Breadcrumb
          breadcrumbtitle={trans("Ingredients")}
          parent={trans("Products Management")}
          title={trans("Ingredients")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row>
                {(role == "SuperAdmin" ||
                  permissions.match("create") != null) && (
                    <Col className="text-right">
                      <Link to="/supplier/products/create" className="mr-2">
                        <Button className="mb-2 mb-sm-0">
                          <i className="fa fa-plus mr-2"></i>
                          {trans("Create Product")}{" "}
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
              <DataGrid
                columns={columns}
                data={supplierProList.ingredientsList}
                options={{
                  selection: true,
                  headerStyle: {
                    paddingLeft: 2,
                    paddingRigt: 2,
                  },
                  cellStyle: {
                    paddingLeft: 2,
                    paddingRigt: 2,
                  },
                }}
                actions={[
                  ((role == "SuperAdmin" || permissions.match("edit") != null) && {
                    // tooltip: '',
                    className: 'ml-2 px-3',
                    icon: 'fa fa-trash',
                    color: 'danger',
                    onClick: (evt, data) => {
                      const ids = data.map((item) => item.id)
                      handleOnClickSelectionModelDeleteButton(ids);
                    },
                  }),
                ]}
                isLoading={supplierProList.loading && supplierProList.ingredientsList.length == 0 ? true : false}
              />
            </CardBody>
            <Modal
              isOpen={openCSV}
              toggle={() => setOpenCSV(!openCSV)}
              centered
            >
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
                                {trans("Upload file")} *
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
    </>
  );
};

export default SupplierProducts;
