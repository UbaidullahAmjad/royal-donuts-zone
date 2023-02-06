/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import SweetAlert from "sweetalert2";
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
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../../components/dataTable/dataTable";
import { Link } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import {
  CouponsListAction,
  HandleCouponIsActiveAction,
  DeleteCouponAction,
  CouponsBulkDeleteAction,
} from "../../../redux/Pages/OnlineSales/Coupons/actions";

const CoupenList = (props) => {
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

  const coupens = useSelector((state) => state.getCoupons);

  useEffect(() => {
    if (coupens?.couponsList.length == 0) {
      dispatch(CouponsListAction())
    }
    if (coupens && coupens.couponsList.length > 0
      && coupens.tempArrLength != 0
      && coupens.couponsList.length != coupens.tempArrLength) {
      dispatch(CouponsListAction())
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
          dispatch(DeleteCouponAction(id, trans))
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
    dispatch(CouponsBulkDeleteAction(bulkIds, trans));
    // await axios({
    //   method: "POST",
    //   url: `${URL}/coupon_bulk_delete`,
    //   data: { ids: JSON.stringify(bulkIds) },
    // })
    //   .then((response) => {
    //     const deleted_copens = coupens.filter(
    //       (item) => !bulkIds.includes(item.id)
    //     );
    //     const index_update = deleted_copens;
    //     index_update.map((item, index) => (item["index"] = index + 1));
    //     setCoupens(index_update);
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
    dispatch(HandleCouponIsActiveAction(id, message))
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 60 },
    {
      field: "code",
      title: trans("Code"),
      flex: 1,
      minWidth: 100,
    },
    {
      field: "amount",
      title: trans("Amount"),
      flex: 1,
      minWidth: 100,
    },
    {
      field: "symbol",
      title: trans("Symbol"),
      flex: 1,
      minWidth: 100,
    },
    {
      field: "expiry_date",
      title: trans("Expiry Date"),
      flex: 1.25,
      minWidth: 180,
    },
    {
      field: "isActive",
      title: trans("Status"),
      flex: 1,
      minWidth: 120,
      render: (cellValues) => {
        if (cellValues.isActive == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() => handleIsActive(
                cellValues.id,
                `${trans("successfull")} ${trans("changed to")} ${trans(
                  "Inactive"
                )}`
              )}
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
              onClick={() => handleIsActive(
                cellValues.id,
                `${trans("successfull")} ${trans("changed to")} ${trans(
                  "Active"
                )}`
              )}
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
      flex: 2,
      minWidth: 190,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/coupens/edit/${cellValues.id}`}>
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

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/coupon_csv_export`,
    }).then((res) => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data);

      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: "text/plain;charset=UTF-8" });
      saveAs(blob, `coupons.csv`);
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
      url: `${URL}/coupon_csv_import`,
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
        breadcrumbtitle={trans("Online Sales") + " " + trans("Coupons")}
        parent={trans("Online Sales")}
        title={trans("Coupons")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Col className="text-right">
                    <Link to="/coupens/create" className="mr-2">
                      <Button className="mb-2 mb-sm-0">
                        <i className="fa fa-plus mr-2"></i>
                        {trans("Create Coupons")}{" "}
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
              data={coupens.couponsList}
              options={{
                selection: true
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
              isLoading={coupens.loading && coupens.couponsList?.length == 0 ? true : false}
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

export default CoupenList;
