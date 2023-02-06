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
import Breadcrumb from "../../layout/breadcrumb";
import DataTable from "../dataTable/dataTable";
import { Link } from "react-router-dom";
import { URL } from "../../env";
import { translate } from "react-switch-lang";
import { useForm } from "react-hook-form";
import * as XLSX from 'xlsx/xlsx.mjs';
import {saveAs} from 'file-saver';



const CoupenList = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [openCSV, setOpenCSV] = useState(false);
  const [coupens, setCoupens] = useState([]);

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


  const [BulkSelectionDeleteIds, setBulkSelectionDeleteIds] = useState([]);
  const [selectionModelDeleteButton, setSelectionModelDeleteButton] = useState(false)


  const handleOnClickSelectionModelDeleteButton = () => {
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
        bulkDeleteApiCall()
      }
    });
  };

  const bulkDeleteApiCall = async () => {
    await axios({
      method: "POST",
      url: `${URL}/coupon_bulk_delete`,
      data: { ids: JSON.stringify(BulkSelectionDeleteIds) }
    }).then((response) => {
      const deleted_copens= coupens.filter((item) => !BulkSelectionDeleteIds.includes(item.id))
        const index_update = deleted_copens;
        index_update.map((item, index) => (item["index"] = index + 1));
        setCoupens(index_update);
      SweetAlert.fire({
        icon: "success",
        title: trans("Deleted"),
        text: trans("Your selected items has been deleted"),
        confirmButtonText: trans("OK"),
      });
    }).catch((error) => {
      console.log("bulkdelete-resp-error", error.response);
      toast.error(trans("error"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }

  const handleIsActive = (id) => {
    console.log('idddd',id, 'message',)
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/coupon/status/${id}`,
      // data: "",
    }).then((response) => {
      console.log('ressssssssssssssssss', response)
      if (response.data.success === true) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getCoupens = async () => {
          const response = await axios.get(`${URL}/coupon`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("coupen", response);
          // setCoupens(response.data.coupons)
          const products = response.data.coupons;
          products.map((item, index) => (item["index"] = index + 1));
          setCoupens(products);
        };
        getCoupens();
      } 
      else {
        toast.error(trans(response.data.message), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "code", headerName: trans("Code"), flex: 1 },
    { field: "amount", headerName: trans("Amount"), flex: 1 },
    { field: "symbol", headerName: trans("Symbol"), flex: 1 },
    { field: "expiry_date", headerName: trans("Expiry Date"), flex: 1 },
    {
      field: "isActive",
      headerName: trans("Status"),
      flex: 1,
      renderCell: (cellValues) => {
        console.log('cell values', cellValues.value)
        if (cellValues.value === 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.row.id
                
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
                  cellValues.row.id
                 
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
      // flex: 1,
      minWidth: 180,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={`/coupens/edit/${cellValues.row.id}/RD`}
              >
                <Button color="primary mr-2" outline>
                  <i className="fa fa-edit"></i>
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
               <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
              </Button>
            }
          </div>
        );
      },
    },
  ];

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/coupon/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = coupens.filter((item) => item.id != id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setCoupens(index_update);
      });
  };

  useEffect(() => {
    const getCoupens = async () => {
      const response = await axios.get(`${URL}/coupon`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("coupen", response);
      // setCoupens(response.data.coupons)
      const products = response.data.coupons;
      products.map((item, index) => (item["index"] = index + 1));
      setCoupens(products);
    };

    getCoupens();
  }, []);


  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/coupon_csv_export`,
    }).then((res) => {
      console.log("response", res);
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(res.data);
      
      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], {type: 'text/plain;charset=UTF-8'});
      saveAs(blob, `layers.csv`);
    });
  };

  const [csvFile, setCSVFile] = useState();

  const uploadCSV = (e) => {
    console.log("evente", e.target.files[0]);
    setCSVFile(e.target.files[0]);
  };

  const SubmitCSV = (data) => {
    const formDatta = new FormData();
    console.log("csv file", csvFile);
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

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Coupons")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                <Col className="text-right">
                  <Link to="/coupens/create/RD" className="mr-2">
                    <Button className="mb-2 mb-sm-0">
                      <i className="fa fa-plus mr-2"></i>
                      {trans("Create Coupons")}{" "}
                    </Button>
                  </Link>
                  <Button
                    className="btn btn-primary mr-2 mb-2 mb-sm-0"
                    onClick={() => setOpenCSV(!openCSV)}
                  >
                    {trans("Import CSV")}{" "}
                  </Button>
                  <Button
                    className="btn btn-primary mr-2 mr-sm-0"
                    onClick={() => downloadCSV()}
                  >
                    {trans("Export CSV")}{" "}
                  </Button>
                </Col>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={coupens}
            checkboxSelection={true}
                selectionModelDeleteButton={selectionModelDeleteButton}
                onSelectionModelChange={(ids) => {
                  setSelectionModelDeleteButton(ids.length > 0 ? true : false)
                  setBulkSelectionDeleteIds(ids)
                }}
                onClickSelectionModelDeleteButton={handleOnClickSelectionModelDeleteButton}
             />
          </CardBody>
          <Modal isOpen={openCSV} toggle={() => setOpenCSV(!openCSV)} centered>
            <ModalHeader toggle={() => setOpenCSV(!openCSV)}>
              Import CSV file
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
              <Button color="primary" type="submit" form="form1">
                {"Upload"}
              </Button>
              <Button onClick={() => setOpenCSV(!openCSV)}>cancel</Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(CoupenList);
