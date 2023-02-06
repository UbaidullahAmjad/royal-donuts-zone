/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumb from "../../layout/breadcrumb";

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
import logo from '../../assets/images/logo/logoo.png'
import SweetAlert from "sweetalert2";

import DataTable from "../dataTable/dataTable";

import { Link } from "react-router-dom";

import { URL, SIMPLE_URL } from "../../env";

import { translate } from "react-switch-lang";
import { useForm } from "react-hook-form";
import * as XLSX from 'xlsx/xlsx.mjs';
import {saveAs} from 'file-saver';


const LayerManagement = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const [openCSV, setOpenCSV] = useState(false);
  const [layersData, setLayers] = useState([]);

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
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
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
      url: `${URL}/layer_bulk_delete`,
      data: { ids: JSON.stringify(BulkSelectionDeleteIds) }
    }).then((response) => {
      const deleted_layers= layersData.filter((item) => !BulkSelectionDeleteIds.includes(item.id))
        const index_update = deleted_layers;
        index_update.map((item, index) => (item["index"] = index + 1));
        setLayers(index_update);
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


  const handleIsActive = (id, message) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/layers/status/${id}`,
      // data: "",
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //-------------
        const getLayers = async () => {
          const response = await axios.get(`${URL}/layers`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          });
          console.log("layers", response);
          // setLayers(response.data.layerFlavor)
          const products = response.data.layerFlavor;
          products.map((item, index) => (item["index"] = index + 1));
          setLayers(products);
        };

        getLayers();
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const columns = [
    { field: "index", headerName: "#", flex: 0.5 },
    {
      field: "image",
      flex: 1.5,
      headerName: trans("Image"),
      renderCell: (cellValues) => (
        <div className="avatar ratio">
          <Media
            className=" b-r-8"
            src={`${SIMPLE_URL}/images/layers/` + cellValues.row.image}
            style={{ width: "73px", height: "100%", maxHeight: '75px' }}
            alt="user image"
            onError={e => { e.currentTarget.src = logo}} 
          />
        </div>
      ),
    },
    { field: "name_fr", headerName: trans("Name"), flex: 2 },
    {
      field: "price_euro",
      headerName: `${trans("Price")}`,
      flex: 1,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "isActive",
      headerName: trans("Status"),
      flex: 0.5,
      renderCell: (cellValues) => {
        if (cellValues.value === "1") {
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
      width: 120,
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1.5,
      renderCell: (cellValues) => {
        return (
          <div className="text-center w-100">
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={`/layers/edit/${cellValues.row.id}/RD`}
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
      .delete(`${URL}/layers/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = layersData.filter((item) => item.id != id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setLayers(index_update);
      });
  };

  useEffect(() => {
    const getLayers = async () => {
      const response = await axios.get(`${URL}/layers`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("layers", response);
      // setLayers(response.data.layerFlavor)
      const products = response.data.layerFlavor;
      products.map((item, index) => (item["index"] = index + 1));
      setLayers(products);
    };

    getLayers();
  }, []);

  const downloadCSV = () => {
    axios({
      method: "post",
      url: `${URL}/layer_csv_export`,
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
      url: `${URL}/layer_csv_import`,
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
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Layers")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              {(role == "SuperAdmin" || (permissions.match("create") != null)) && (
                <Col className="text-right">
                  <Link to="/layers/create/RD" className="mr-2">
                    <Button className="mb-2 mb-sm-0">
                      <i className="fa fa-plus mr-2"></i>
                      {trans("Create layers")}{" "}
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
            <DataTable columns={columns} rows={layersData}
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

export default translate(LayerManagement);
