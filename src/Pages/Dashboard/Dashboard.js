/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import * as React from "react";
import "./Dashboard.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "./dataTable";
import MuiAlert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Navigate } from "react-router-dom";
import { Badge, Form, Button } from "react-bootstrap";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import { Divider } from "@mui/material";
import { useTranslation, } from "react-i18next";
import countries from "../../assets/countries";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import CopyRight from "../copy-right/CopyRight";
import getWindowDimensions from "../../Components/Hooks/useWindowDimensions";
import { URL } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { DashboardDataAction, Dashboard_SaveDataAction, DashboardLoaderSet } from "../../redux/Dashboard/DashboardDataAction"

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  /* z-index: 1300; */
  z-index: 9999999;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #F36292",
  p: 2,
};

const Dashboard = (props) => {
  const { t } = useTranslation();
  const trans = t;;
  const dispatch = useDispatch();
  const { screenWidth } = getWindowDimensions();
  var CryptoJS = require("crypto-js");
  var i = 1;
  var j = 1;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = React.useState(false);
  var login = useSelector((state) => state.tokenAvailable);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeliverModal, setOpenDeliverModal] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [orderItems, setOrderItems] = React.useState([]);

  const [userId, setUserId] = React.useState(
    localStorage.getItem("user_id") ? localStorage.getItem("user_id") : ""
  );
  var bytes = CryptoJS.AES.decrypt("" + userId, "_#userid_");
  if (bytes != null) {
    var original_id = bytes.toString(CryptoJS.enc.Utf8);
  }

  const getDashboardData = useSelector((state) => state.getDashboardData);
  const DashboardLoader = getDashboardData.saveBtnLoading;
  const DashboardAllData = getDashboardData.dashboardData;
  const dashboard_user = DashboardAllData?.user ?? null;
  const deliveredOrders = DashboardAllData?.delivered_orders ?? [];
  const openOrders = DashboardAllData?.open_orders ?? [];

  useEffect(() => {
    if (dashboard_user == null || (dashboard_user?.id != undefined && dashboard_user?.id != original_id)) {
      dispatch(DashboardDataAction(original_id))
    }
  }, []);

  useEffect(() => {
    if (getDashboardData.dashboardDataLength != getDashboardData.tempArrLength) {
      dispatch(DashboardDataAction(original_id))
    }

    reset({
      email: dashboard_user?.email,
      firstName: dashboard_user?.first_name,
      lastName: dashboard_user?.last_name,
      address: dashboard_user?.address,
      mobile_number: dashboard_user?.mobilenumber,
      zip_code: dashboard_user?.zip_code,
      city: dashboard_user?.city,
      country: dashboard_user?.country,
      openOrders: openOrders,
      deliveredOrders: deliveredOrders,
    });

    // }
  }, [DashboardAllData]);

  const handleOpen = (row) => {
    setOpenModal(true);
    setLoading(true);

    var config = {
      method: "get",
      url: `${URL}/viewinvoice/` + row.id,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setOrderDetail(response?.data?.order);
          setOrderItems(response?.data?.order_items);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  const handleOpenDeliver = (row) => {
    setOpenDeliverModal(true);
    setLoading(true);

    var config = {
      method: "get",
      url: `${URL}/viewdeliveredorder/` + row.id,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setOrderDetail(response?.data?.order);
          setOrderItems(response?.data?.order_items);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleClose = () => setOpenModal(false);
  const handleDeliverClose = () => setOpenDeliverModal(false);

  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const columnsOpenOrders = [
    {
      field: "index",
      headerName: "#",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "order_no",
      headerName: trans("Order No"),
      flex: 1,
      minWidth: 120,
    },
    {
      field: "user_name",
      headerName: trans("Username"),
      flex: 1.5,
      minWidth: 220,
      renderCell: (cellValues) => (
        <>
          {cellValues.row.o_id != null
            ? cellValues.row.o_first + " " + cellValues.row.o_last
            : cellValues.row.user_name}
        </>
      ),
    },
    {
      field: "delivery_date",
      headerName: trans("Delivery Date"),
      flex: 1,
      minWidth: 220,
      renderCell: (cellValues) => (
        <>
          {cellValues.row != null && cellValues.row?.delivery_date?.toString()}
        </>
      ),
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      minWidth: 90,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              color="primary mr-2"
              outline
              onClick={() => handleOpen(cellValues)}
            >
              <i className="fa fa-eye mx-3"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const columnsDeliveredOrders = [
    {
      field: "index",
      headerName: "#",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "order_no",
      headerName: trans("Order No"),
      flex: 1,
      minWidth: 120,
    },
    {
      field: "user_name",
      headerName: trans("Username"),
      flex: 1.5,
      minWidth: 220,
      renderCell: (cellValues) => (
        <>
          {cellValues.row.o_id != null
            ? cellValues.row.o_first + " " + cellValues.row.o_last
            : cellValues.row.user_name}
        </>
      ),
    },
    {
      field: "delivery_date",
      headerName: trans("Delivery Date"),
      flex: 1,
      minWidth: 220,
      renderCell: (cellValues) => (
        <>
          {cellValues.row != null && cellValues.row?.delivery_date?.toString()}
        </>
      ),
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      minWidth: 90,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              color="primary mr-2"
              outline
              onClick={() => handleOpenDeliver(cellValues)}
            >
              <i className="fa fa-eye mx-3"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", original_id);
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    // formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("mobile_number", data.mobile_number);
    formData.append("zip_code", data.zip_code);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("openOrders", openModal);
    formData.append("deliveredOrders", deliveredOrders);

    const form_data = {
      id: original_id,
      first_name: data.firstName,
      last_name: data.lastName,
      // email: data.email,
      address: data.address,
      mobile_number: data.mobile_number,
      zip_code: data.zip_code,
      city: data.city,
      country: data.country,
      // openOrders: openModal,
      // deliveredOrders: deliveredOrders,
    };

    SweetAlert.fire({
      title: trans("Are you sure ?"),
      text: trans("Do you want to update User Profile?"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Update"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        dispatch(DashboardLoaderSet())
        dispatch(Dashboard_SaveDataAction(form_data))
      }
    });
  };

  return (
    <>
      {(openModal || openDeliverModal) && (
        <div className="dashboard_model_overlay" onClick={handleClose}></div>
      )}
      <Header />
      <ToastContainer />
      {login === false ? (
        <Navigate to="/" replace />
      ) : (
        <div className="col-12 col-sm-12 col-md-10 col-lg-8 mx-auto">
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <TabContext value={tabValue}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  style={{ justifyContent: "center" }}
                  className="Dashboard_TabList"
                >
                  <Tab label="Profile" value="1" className="Dashboard_Tab" />
                  <Tab
                    label="Open Orders"
                    value="2"
                    className="Dashboard_Tab"
                  />
                  <Tab
                    label="Delivered Orders"
                    value="3"
                    className="Dashboard_Tab"
                  />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                style={
                  screenWidth < 769 ? { paddingLeft: 5, paddingRight: 5 } : {}
                }
              >
                <div className="card py-4">
                  <div className="card-body py-4">
                    <Form
                      className="needs-validation Dasboard_Form"
                      noValidate=""
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="row m-0">
                        <div className="col-md-6 ps-0 pe-0 pe-md-1">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicfName"
                          >
                            {/* <Form.Label>{trans("First Name")}</Form.Label> */}
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("First Name")}
                              variant="outlined"
                              fullWidth
                              size="normal"
                              type="text"
                              name="firstName"
                              defaultValue={dashboard_user ? dashboard_user.first_name : ""}
                              key={dashboard_user ? dashboard_user.first_name : ""}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.firstName?.type == "required" &&
                                trans("field is required.")}
                              {errors.firstName?.type == "maxLength" &&
                                trans("Maximum Length: ") + "20"}
                              {errors.firstName?.type == "pattern" &&
                                "Please write alphanumeric values"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-6 ps-0 ps-md-1 pe-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Last Name")}
                              variant="outlined"
                              fullWidth
                              type="text"
                              defaultValue={dashboard_user ? dashboard_user.lastName : ""}
                              key={dashboard_user ? dashboard_user.lastName : ""}
                              {...register("lastName", {
                                required: true,
                                maxLength: 20,
                                pattern: /^[a-zA-Z0-9.\s]+$/,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.lastName?.type == "required" &&
                                trans("field is required.")}
                              {errors.lastName?.type == "maxLength" &&
                                trans("Maximum Length: ") + "20"}
                              {errors.lastName?.type == "pattern" &&
                                "Please write alphanumeric values"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12 px-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Email Address")}
                              variant="outlined"
                              fullWidth
                              type="email"
                              disabled
                              defaultValue={dashboard_user ? dashboard_user.email : ""}
                              key={dashboard_user ? dashboard_user.email : ""}
                              {...register("email", {
                                required: false,
                                maxLength: 30,
                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/,
                              })}
                            />
                            <div>
                              <span
                                className="text-danger text-capitalize"
                                style={{ fontSize: 12 }}
                              >
                                {errors.email?.type == "required" &&
                                  trans("field is required.")}
                                {errors.email?.type == "maxLength" &&
                                  trans("Maximum Length: ") + "30"}
                                {errors.email?.type === "pattern" &&
                                  trans("@ is required in email")}
                              </span>
                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12 px-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Address")}
                              variant="outlined"
                              fullWidth
                              type="text"
                              name="address"
                              defaultValue={dashboard_user ? dashboard_user.address : ""}
                              key={dashboard_user ? dashboard_user.address : ""}
                              {...register("address", {
                                required: true,
                                maxLength: 120,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.address?.type == "required" &&
                                trans("field is required.")}
                              {errors.address?.type == "maxLength" &&
                                trans("Maximum Length: ") + "120"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-6 ps-0 pe-0 pe-md-1">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Mobile Number")}
                              variant="outlined"
                              fullWidth
                              type="tel"
                              name="mobile_number"
                              defaultValue={
                                dashboard_user ? dashboard_user.mobile_number : ""
                              }
                              key={dashboard_user ? dashboard_user.mobile_number : ""}
                              {...register("mobile_number", {
                                required: true,
                                maxLength: 18,
                                pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.mobile_number?.type == "required" &&
                                trans("field is required.")}
                              {errors.mobile_number?.type == "maxLength" &&
                                trans("Maximum Length: ") + "18"}
                              {errors.mobile_number?.type == "pattern" &&
                                trans(
                                  "Please write numerical values or + or - or ( or )"
                                )}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-6 ps-0 ps-md-1 pe-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Zip Code")}
                              variant="outlined"
                              fullWidth
                              type="number"
                              maxLength={5}
                              name="zip_code"
                              defaultValue={dashboard_user ? dashboard_user.zip_code : ""}
                              key={dashboard_user ? dashboard_user.zip_code : ""}
                              {...register("zip_code", {
                                required: true,
                                pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.zip_code?.type == "required" &&
                                trans("field is required.")}
                              {errors.zip_code?.type == "pattern" &&
                                trans(
                                  "zip code must be 5 digits and can be up to 9 digits"
                                )}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12 px-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("City")}
                              variant="outlined"
                              fullWidth
                              type="text"
                              name="city"
                              defaultValue={dashboard_user ? dashboard_user.city : ""}
                              key={dashboard_user ? dashboard_user.city : ""}
                              {...register("city", {
                                value: dashboard_user ? dashboard_user.city : "",
                                required: true,
                                maxLength: 35,
                                pattern: /^[a-zA-Z0-9.\s]+$/,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.city?.type == "required" &&
                                trans("field is required.")}
                              {errors.city?.type == "maxLength" &&
                                trans("Maximum Length: ") + "35"}
                              {errors.city?.type == "pattern" &&
                                "Please write alphanumeric values"}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12 px-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Country/Region")}
                              variant="outlined"
                              fullWidth
                              select
                              type="select"
                              name="country"
                              defaultValue={dashboard_user ? dashboard_user.country : ""}
                              key={dashboard_user ? dashboard_user.country : ""}
                              {...register("country", { required: true })}
                            >
                              <MenuItem defaultChecked value="" disabled>
                                {trans("Select Country")}
                              </MenuItem>
                              {countries !== [] &&
                                countries.map((count, i) => {
                                  return (
                                    <MenuItem key={i} value={count}>
                                      {count}
                                    </MenuItem>
                                  );
                                })}
                            </TextField>
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.country?.type == "required" &&
                                trans("field is required.")}
                            </span>
                            <div className="valid-feedback">
                              {trans("Looks good!")}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12 px-0">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <TextField
                              InputLabelProps={{
                                required: true,
                              }}
                              label={trans("Password")}
                              variant="outlined"
                              fullWidth
                              type="password"
                              name="password"
                              defaultValue={dashboard_user ? dashboard_user.password : ""}
                              key={dashboard_user ? dashboard_user.password : ""}
                              {...register("password", {
                                required: false,
                                maxLength: 30,
                                minLength: 6,
                                pattern: /^[a-zA-Z0-9.\s]+$/,
                              })}
                            />
                            <span
                              className="text-danger text-capitalize"
                              style={{ fontSize: 12 }}
                            >
                              {errors.password?.type == "required" &&
                                trans("field is required.")}
                              {errors.password?.type == "maxLength" &&
                                trans("Maximum Length: ") + "30"}
                              {errors.password?.type == "maxLength" &&
                                trans("Minimum Length: ") + "6"}
                            </span>
                          </Form.Group>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="btn border-0 update_btn"
                        style={{ backgroundColor: "#F36292", color: "white", minWidth: 150, }}
                      // onClick={updateData}
                      >
                        {DashboardLoader === true ? (
                          <>
                            <Spinner
                              animation="border"
                              variant="light"
                              style={{ width: 16, height: 16 }}
                            />
                            <span className="ms-1">Update</span>
                          </>
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </Form>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                value="2"
                style={
                  screenWidth < 769 ? { paddingLeft: 5, paddingRight: 5 } : {}
                }
              >
                {/* Open Orders Table */}
                <TableContainer component={Paper}>
                  <Table
                    className="Dashboard__Table"
                    aria-label="a dense table"
                  >
                    {
                      <DataTable
                        columns={columnsOpenOrders}
                        rows={
                          openOrders && openOrders.length > 0 ? openOrders : 0
                        }
                        checkboxSelection={false}
                      />
                    }
                    <StyledModal
                      aria-labelledby="unstyled-modal-title"
                      aria-describedby="unstyled-modal-description"
                      open={openModal}
                      onClose={handleClose}
                      BackdropComponent={Backdrop}
                    >
                      <Box className="Dashboard_Model_Box">
                        <div className="dashboard_model_heading_wrapper d-flex justify-content-between align-items-center">
                          <h2 id="unstyled-modal-title">
                            {trans("Order Summary")}
                          </h2>
                          <CloseOutlinedIcon
                            className="dashboard_modal_cross_btn"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <Divider />
                        {loading === true ? (
                          <>
                            <div className="mt-3" />
                            <Spinner
                              animation="grow"
                              className="text-center"
                              style={{
                                color: "#F36292",
                                display: "block",
                                margin: "auto",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Order No")}</h6>
                              <h6>{orderDetail?.order_no}</h6>
                            </div>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Username")}</h6>
                              <h6>
                                {orderDetail.o_id != null
                                  ? orderDetail.o_first +
                                  " " +
                                  orderDetail.o_last
                                  : orderDetail.user_name}
                              </h6>
                            </div>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold" style={{ width: "30%" }}>
                                {trans("Address")}
                              </h6>
                              <h6 style={{ width: "65%", textAlign: "end" }}>
                                {orderDetail.o_id != null
                                  ? orderDetail.custome_address +
                                  ",  " +
                                  orderDetail.city +
                                  ",  " +
                                  orderDetail.zip_code +
                                  ",  " +
                                  orderDetail.country
                                  : orderDetail.address +
                                  ",  " +
                                  orderDetail.city +
                                  ",  " +
                                  orderDetail.zip_code +
                                  ",  " +
                                  orderDetail.country}
                              </h6>
                            </div>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">
                                {trans("Delivery Method")}
                              </h6>
                              <h6 style={{ textTransform: "capitalize" }}>
                                {orderDetail.delivery_method
                                  ? orderDetail?.delivery_method
                                  : trans("Delivery")}
                              </h6>
                            </div>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Order Date")}</h6>
                              <h6 style={{ textTransform: "capitalize" }}>
                                {orderDetail.created_at &&
                                  moment(orderDetail.created_at).format(
                                    "ddd, Do MMM, YYYY HH:mm:ss"
                                  )}
                              </h6>
                            </div>
                            <div
                              className="d_modelbox_div"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Delivery Date")}</h6>
                              <h6>
                                {orderDetail != null &&
                                  orderDetail?.delivery_date?.toString()}
                              </h6>
                            </div>
                            <div
                              className="d_modelbox_div d_last"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Status")}</h6>
                              <h6>
                                {orderDetail?.order_status == 0 ? (
                                  <Badge bg="warning" text="dark">
                                    {trans("Pending")}
                                  </Badge>
                                ) : orderDetail?.order_status == 1 ? (
                                  <Badge bg="info" text="dark">
                                    {trans("Confirmed")}
                                  </Badge>
                                ) : (
                                  orderDetail?.order_status == 2 && (
                                    <Badge bg="primary" text="dark">
                                      {trans("In-Delivery")}
                                    </Badge>
                                  )
                                )}
                              </h6>
                            </div>
                            <Divider />
                            <h6 className="bold mt-2 mb-0">
                              {trans("Products")}
                            </h6>
                            <TableContainer
                              className="dashboard_model_table_container"
                              style={{ width: "100%" }}
                            >
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      align="left"
                                      style={{ minWidth: 200 }}
                                    >
                                      {trans("Name")}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ minWidth: 140 }}
                                    >
                                      {trans("Unit Price")}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ minWidth: 110 }}
                                    >
                                      {trans("Quantity")}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      style={{ minWidth: 120 }}
                                    >
                                      {trans("Total")}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {orderItems.map((val) => {
                                    return (
                                      <TableRow>
                                        <TableCell style={{ minWidth: 200 }}>
                                          {val.product_name ==
                                            "Customized donut" ? (
                                            <div>
                                              <p className="mb-0">
                                                {val.product_name}
                                              </p>
                                              {val.customized_ingredients !=
                                                null && (
                                                  <p className="mt-0">
                                                    <span className="fw-bold">
                                                      {trans("Ingredients")}:{" "}
                                                    </span>
                                                    {val.customized_ingredients}
                                                  </p>
                                                )}
                                            </div>
                                          ) : (
                                            val.product_name
                                          )}
                                        </TableCell>
                                        <TableCell style={{ minWidth: 120 }}>
                                          {val.unit_price} €
                                        </TableCell>
                                        <TableCell style={{ minWidth: 100 }}>
                                          {val.quantity}
                                        </TableCell>
                                        <TableCell style={{ minWidth: 120 }}>
                                          {(
                                            val.unit_price * val.quantity
                                          ).toFixed(2)}{" "}
                                          €
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Divider />
                            <div className="col-md-4 col-6 float-end pe-4">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "1rem",
                                }}
                              >
                                <h6 className="bold">{trans("Subtotal")}</h6>
                                <h6>{orderDetail?.total?.toFixed(2)} €</h6>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  // marginTop: "1rem",
                                }}
                              >
                                <h6 className="bold">{trans("Discount")}</h6>
                                <h6>
                                  {/* {parseInt(orderDetail?.discount)?.toFixed(2)}{" "} */}
                                  {orderDetail?.discount} {/* € */}
                                  {orderDetail?.coupon_symbol != 0 &&
                                    orderDetail?.coupon_symbol != null
                                    ? orderDetail?.coupon_symbol
                                    : "€"}
                                </h6>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  // marginTop: "1rem",
                                }}
                              >
                                <h6 className="bold">{trans("Grand Total")}</h6>
                                <h6>
                                  {orderDetail.grand_total
                                    ? orderDetail?.grand_total
                                    : 0}
                                  {" €"}
                                </h6>
                              </div>
                            </div>
                          </>
                        )}
                      </Box>
                    </StyledModal>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel
                value="3"
                style={
                  screenWidth < 769 ? { paddingLeft: 5, paddingRight: 5 } : {}
                }
              >
                <TableContainer component={Paper}>
                  {
                    <DataTable
                      columns={columnsDeliveredOrders}
                      rows={
                        deliveredOrders && deliveredOrders.length > 0
                          ? deliveredOrders
                          : 0
                      }
                      checkboxSelection={false}
                    />
                  }
                  <StyledModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={openDeliverModal}
                    onClose={handleDeliverClose}
                    BackdropComponent={Backdrop}
                  >
                    <Box className="Dashboard_Model_Box">
                      <div className="dashboard_model_heading_wrapper d-flex justify-content-between align-items-center">
                        <h2 id="unstyled-modal-title">
                          {trans("Order Summary")}
                        </h2>
                        <CloseOutlinedIcon
                          className="dashboard_modal_cross_btn"
                          onClick={handleDeliverClose}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <Divider />
                      {loading === true ? (
                        <>
                          <div className="mt-3" />
                          <Spinner
                            animation="grow"
                            className="text-center"
                            style={{
                              color: "#F36292",
                              display: "block",
                              margin: "auto",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Order No")}</h6>
                            <h6>{orderDetail?.order_no}</h6>
                          </div>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Username")}</h6>
                            <h6>
                              {orderDetail.o_id != null
                                ? orderDetail.o_first + " " + orderDetail.o_last
                                : orderDetail.user_name}
                            </h6>
                          </div>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold" style={{ width: "30%" }}>
                              {trans("Address")}
                            </h6>
                            <h6 style={{ width: "65%", textAlign: "end" }}>
                              {orderDetail.o_id != null
                                ? orderDetail.custome_address +
                                ",  " +
                                orderDetail.city +
                                ",  " +
                                orderDetail.zip_code +
                                ",  " +
                                orderDetail.country
                                : orderDetail.address +
                                ",  " +
                                orderDetail.city +
                                ",  " +
                                orderDetail.zip_code +
                                ",  " +
                                orderDetail.country}
                            </h6>
                          </div>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Delivery Method")}</h6>
                            <h6 style={{ textTransform: "capitalize" }}>
                              {orderDetail.delivery_method
                                ? orderDetail?.delivery_method
                                : trans("Delivery")}
                            </h6>
                          </div>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Order Date")}</h6>
                            <h6 style={{ textTransform: "capitalize" }}>
                              {orderDetail.created_at &&
                                moment(orderDetail.created_at).format(
                                  "ddd, Do MMM, YYYY HH:mm:ss"
                                )}
                            </h6>
                          </div>
                          <div
                            className="d_modelbox_div"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Delivery Date")}</h6>
                            <h6>
                              {orderDetail != null &&
                                orderDetail?.delivery_date?.toString()}
                            </h6>
                          </div>
                          <div
                            className="d_modelbox_div d_last"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <h6 className="bold">{trans("Status")}</h6>
                            <h6>
                              {orderDetail?.order_status == 3 && (
                                <Badge bg="success">{trans("Delivered")}</Badge>
                              )}
                            </h6>
                          </div>
                          <Divider />
                          <h6 className="bold mt-2 mb-0">
                            {trans("Products")}
                          </h6>
                          <TableContainer
                            className="dashboard_model_table_container"
                            style={{ width: "100%" }}
                          >
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    style={{ minWidth: 200 }}
                                  >
                                    {trans("Name")}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ minWidth: 140 }}
                                  >
                                    {trans("Unit Price")}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ minWidth: 110 }}
                                  >
                                    {trans("Quantity")}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ minWidth: 120 }}
                                  >
                                    {trans("Total")}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {orderItems &&
                                  orderItems.map((val) => {
                                    return (
                                      <TableRow>
                                        <TableCell style={{ minWidth: 200 }}>
                                          {val.product_name ==
                                            "Customized donut" ? (
                                            <div>
                                              <p className="mb-0">
                                                {val.product_name}
                                              </p>
                                              {val.customized_ingredients !=
                                                null && (
                                                  <p className="mt-0">
                                                    <span className="fw-bold">
                                                      {trans("Ingredients")}:{" "}
                                                    </span>
                                                    {val.customized_ingredients}
                                                  </p>
                                                )}
                                            </div>
                                          ) : (
                                            val.product_name
                                          )}
                                        </TableCell>
                                        <TableCell style={{ minWidth: 120 }}>
                                          {val.unit_price} €
                                        </TableCell>
                                        <TableCell style={{ minWidth: 100 }}>
                                          {val.quantity}
                                        </TableCell>
                                        <TableCell style={{ minWidth: 120 }}>
                                          {(
                                            val.unit_price * val.quantity
                                          ).toFixed(2)}{" "}
                                          €
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Divider />
                          <div className="col-md-4 col-6 float-end pe-4">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Subtotal")}</h6>
                              <h6>
                                {orderDetail.total
                                  ? orderDetail?.total?.toFixed(2)
                                  : 0}{" "}
                                {"€"}
                              </h6>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Discount")}</h6>
                              <h6>
                                {/* {parseInt(orderDetail?.discount)?.toFixed(2)} */}
                                {orderDetail.discount
                                  ? orderDetail?.discount
                                  : 0}{" "}
                                {orderDetail?.coupon_symbol != 0 &&
                                  orderDetail?.coupon_symbol != null
                                  ? orderDetail?.coupon_symbol
                                  : "€"}
                              </h6>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // marginTop: "1rem",
                              }}
                            >
                              <h6 className="bold">{trans("Grand Total")}</h6>
                              <h6>
                                {orderDetail.grand_total
                                  ? parseFloat(
                                    orderDetail?.grand_total
                                  ).toFixed(2)
                                  : 0}{" "}
                                {"€"}
                              </h6>
                            </div>
                          </div>
                        </>
                      )}
                    </Box>
                  </StyledModal>
                </TableContainer>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
      <Footer />
      <CopyRight />
    </>
  );
};

export default Dashboard;
