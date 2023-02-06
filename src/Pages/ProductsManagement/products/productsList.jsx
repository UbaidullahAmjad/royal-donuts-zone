/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment, useRef } from "react";
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
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import DataTable from "../../../components/dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo/logoo.png";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useMediaQuery, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductsListAction,
  HandleIsProdBoxAction,
  HandleIsProdSpecialAction,
  HandleIsProdActiveAction,
  DeleteProductAction,
  ProductsBulkDeleteAction
} from "../../../redux/Pages/ProductManagement/Products/actions";

const Products = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [openCSV, setOpenCSV] = useState(false);

  const allProducts = useSelector((state) => state.getProducts);

  useEffect(() => {
    if (allProducts?.productsList.length == 0) {
      dispatch(ProductsListAction())
    }
  }, [])

  useEffect(() => {
    if (allProducts && allProducts.productsList.length > 0
      && allProducts.tempArrLength != 0
      && allProducts.productsList.length != allProducts.tempArrLength) {
      dispatch(ProductsListAction())
    }
  }, [allProducts?.productsList]);

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
        bulkDeleteApiCall(bulkIds);
      }
    });
  };

  const bulkDeleteApiCall = (bulkIds) => {
    dispatch(ProductsBulkDeleteAction(bulkIds, trans))
  };

  const handleIsBoxes = (prodId, message) => {
    dispatch(HandleIsProdBoxAction(prodId, message, trans));
  };

  const handleIsSpecialProducts = (prodId, message) => {
    dispatch(HandleIsProdSpecialAction(prodId, message, trans));
  };

  const handleIsActive = (prodId, message) => {
    dispatch(HandleIsProdActiveAction(prodId, message, trans));
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [statusRole, setStatusRole] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (statusRole.length < 2 || statusRole.find((item) => item == value)) {
      if (
        statusRole.find((item) => item == "Active") &&
        value.find((item) => item == "Inactive")
      ) {
        toast.error("You don't select Active or Inactive at one time", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setStatusRole(
          // On autofill we get a stringified value.
          typeof value === "string" ? value.split(",") : value
          // typeof value[value.length-1] === 'object' ? value[value.length-1].key.split(',') : value[value.length-1].key,
          // ["abcd", "abcd"]
        );
      }
    } else {
      toast.error("You can add only two values on status", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const statusSelectRef = useRef(null);
  let statusRefValue = statusSelectRef.current
    ? statusSelectRef.current?.innerText
    : null;

  const splitNumber = (val) => {
    return val.toString().replaceAll('.', trans("dot"))
  }

  const columns = [
    {
      field: "index",
      title: "#",
      flex: 0.5,
      minWidth: 60,
    },
    {
      field: "image",
      title: trans("Image"),
      flex: 1,
      minWidth: 100,
      render: (cellValues) => {
        if (cellValues.image != null) {
          return (
            <div className="avatar ratio">
              <Media
                className=" b-r-8"
                src={`${SIMPLE_URL}/images/Product/` + cellValues.image}
                style={{ width: "73px", height: "100%", maxHeight: "75px" }}
                alt="user image"
              />
            </div>
          );
        }
        if (cellValues.image == null) {
          return (
            <div className="avatar ratio">
              <Media
                className=" b-r-8"
                src={logo}
                style={{ width: "73px", height: "100%", maxHeight: "75px" }}
                alt="user image"
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
              />
            </div>
          );
        }
      },
    },
    {
      field: "name_fr",
      title: trans("Name"),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "price_euro",
      title: trans("Price"),
      flex: 1,
      minWidth: 100,
      render: (cellValues) => <p>{splitNumber(cellValues.price_euro) + " "}€</p>,
      valueGetter: (cellValues) => cellValues.price_euro,
    },
    // {
    //   field: "quantity",
    //   title: trans("Quantity"),
    //   flex: 1,
    // minWidth: 9,
    //   minWidth: mobile == true && 100,
    // },
    // {
    //   field: "alert_quantity",
    //   title: trans("Alert Quantity"),
    //   flex: 1,
    // minWidth: 120,,
    // },

    {
      field: "isActive",
      flex: 1,
      minWidth: 100,
      title: trans("Status"),
      render: (cellValues) => {
        if (cellValues.isActive === "1") {
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
      field: "isSpecial",
      flex: 1,
      minWidth: 110,
      title: trans("Special Products"),
      render: (cellValues) => {
        if (cellValues.isSpecial == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsSpecialProducts(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Simple Products"
                  )}`
                )
              }
            >
              {trans("Special")}
            </Badge>
          );
        } else {
          return (
            <Badge
              color="danger"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsSpecialProducts(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Special Products"
                  )}`
                )
              }
            >
              {trans("Simple")}
            </Badge>
          );
        }
      },
    },
    {
      field: "isBox",
      title: trans("Boxes"),
      flex: 1,
      minWidth: 80,
      render: (cellValues) => {
        if (cellValues.isBox == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsBoxes(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Simple"
                  )}`
                )
              }
            >
              {trans("Boxes")}
            </Badge>
          );
        } else {
          return (
            <Badge
              color="danger"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsBoxes(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Boxes"
                  )}`
                )
              }
            >
              {trans("Simple")}
            </Badge>
          );
        }
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 1,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div className="text-center w-100">
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/ecommerce/products/edit/${cellValues.id}`}>
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

  const DeleteItem = (id) => {
    dispatch(DeleteProductAction(id, trans))
  };

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/product_csv_export`,
    }).then((res) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data);

      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/plain;charset=UTF-88" });
      saveAs(blob, `Products.csv`);
    });
  };

  const [csvFile, setCSVFile] = useState();
  const [uploadfile, setUploadFile] = useState();

  const uploadCSV = (e) => {
    setCSVFile(e.target.files[0]);
  };

  const SubmitCSV = (data) => {
    const formDatta = new FormData();
    formDatta.append("csv", csvFile);
    axios({
      method: "post",
      url: `${URL}/product_csv_import`,
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
    <Fragment>
      <Breadcrumb
        parent={trans("Products Management")}
        title={trans("Products")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Col className="text-right">
                    <Link to="/ecommerce/products/create" className="mr-2">
                      <Button className="mb-2 mb-sm-0">
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Products")}{" "}
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
              data={allProducts.productsList}
              options={{
                selection: true
              }}
              // (role == "SuperAdmin" || permissions.match("edit") != null)
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
              isLoading={allProducts.loading && allProducts.productsList.length == 0 ? true : false}
            />
            {/* <h1>hehre</h1> */}
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
  );
};

export default Products;
