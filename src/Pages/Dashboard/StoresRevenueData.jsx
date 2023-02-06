/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumb from "../../layout/breadcrumb";
import logo from "../../assets/images/logo/logoo.png";
import logo_new from "../../assets/images/logo/royal_donuts_logo.png";
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
import { DataTable } from "../../components";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SweetAlert from "sweetalert2";
import { useTranslation, } from "react-i18next";
import { Link } from "react-router-dom";
import { URL, SIMPLE_URL } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  StoresRevenueListAction,
} from "../../redux/Pages/Dashboard/StoresRevenue/actions";

const StoresRevenueData = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  // const [storeList, setStoreList] = useState(null);
  const [alert, setalert] = useState(false);

  const [PdfExportRow, setPdfExportRow] = React.useState([]);

  const storeList = useSelector((state) => state.getStoresRevenue);

  useEffect(() => {
    if (storeList.storesRevenueList?.length == 0) {
      dispatch(StoresRevenueListAction())
    }
    if (storeList && storeList.storesRevenueList.length > 0
      && storeList.tempArrLength != 0
      && storeList.storesRevenueList.length != storeList.tempArrLength) {
      dispatch(StoresRevenueListAction())
    }

  }, []);

  useEffect(() => {
    // Setting data for pdf download
    setPdfExportRow(storeList.storesRevenueList);
  }, [])

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

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80, },
    {
      field: "name_fr",
      title: trans("Name of Stores"),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "address",
      title: trans("Address"),
      flex: 2,
      minWidth: 220,
      renderCell: (cellValues) => {
        return (
          <div>{cellValues.row.address + ", " + cellValues.row.zip_code}</div>
        );
      },
    },
    {
      field: "orders",
      title: trans("No of Orders"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "revenue",
      title: trans("Revenue"),
      flex: 1,
      minWidth: 120,
    },
    // {
    //   field: "action",
    //   title: trans("Action"),
    //   cellClassName: "MuiDataGrid-cell-action-customstyles",
    //   flex: 2,
    //   minWidth: 200,
    //   render: (cellValues) => {
    //     return (
    //       <div>
    //         {(role == "SuperAdmin" || permissions.match("edit") != null) && (
    //           <Link to={`/delete_api/${cellValues.id}`}>
    //             <Button color="warning mr-2">
    //               <i className="fa fa-edit"></i>
    //             </Button>
    //           </Link>
    //         )}
    //         {(role == "SuperAdmin" || permissions.match("delete") != null) && (
    //           <Button
    //             color="danger"
    //             className="sweet-7"
    //             name="alertDanger"
    //             onClick={(e) => Displayalert(e.target.name, cellValues.id)}
    //           >
    //             {" "}
    //             <i
    //               className="fa fa-trash-o"
    //               // title="alertDanger"
    //               onClick={(e) =>
    //                 Displayalert("alertDanger", cellValues.id)
    //               }
    //             ></i>
    //           </Button>
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Stores Revenue List";
    const headers = [
      [
        "#",
        trans("Store Name"),
        trans("Address"),
        trans("No of Orders"),
        trans("Revenue"),
      ],
    ];

    const data = PdfExportRow.map((item, index) => [
      index + 1,
      item.name_fr,
      item.address + " " + item.zip_code,
      item.orders,
      item.revenue,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    // doc.addImage(logo, 'JPEG', 530, 15, 30, 30, null, 'NONE', 0)
    doc.addImage(logo_new, "JPEG", 455, 25, 100, 20, null, "NONE", 0);
    doc.autoTable(content);
    doc.save("stores-renenue.pdf");
  };

  // const DeleteItem = async (id) => {
  //     const res = await axios
  //         .delete(`${URL}/delete_api/${id}`, {
  //             headers: {
  //                 Authorization: "Bearer " + localStorage.getItem("token123"),
  //             },
  //         })
  //         .then((response) => {
  //             // setStoreList(deleted_product);
  //             const deleted_product = storeList.filter((item) => item.id != id);
  //             const index_update = deleted_product;
  //             index_update.map((item, index) => (item["index"] = index + 1));
  //             setStoreList(index_update);
  //         });
  // };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h5>
                  {trans("Stores Revenue")} {trans("List")}
                </h5>
              </Col>
              {role == "SuperAdmin" && (
                <Col className="text-right">
                  <Button onClick={exportPDF}>
                    <i className="fa fa-plus_ fa-download mr-2"></i>
                    {trans("Export PDF")}{" "}
                  </Button>
                </Col>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={storeList.storesRevenueList}
              isLoading={storeList.storesRevenueList?.length == 0 ? true : false}
              options={{
                selection: true,
              }}
              onSearchChange={(searchValue) => {
                let myFilter = searchValue?.toLowerCase();
                if (myFilter) {
                  const filterData = storeList.storesRevenueList.filter(
                    (val) =>
                      // val.id.toString().includes(myFilter.toString()) ||
                      val.name_fr?.toLowerCase().includes(myFilter) ||
                      val.address?.toLowerCase().includes(myFilter) ||
                      val.zip_code.includes(myFilter) ||
                      val.orders.toString().includes(myFilter.toString()) ||
                      val.revenue.toString().includes(myFilter.toString())
                  );
                  setPdfExportRow(filterData);
                } else {
                  setPdfExportRow(storeList.storesRevenueList);
                }
                // if (document.getElementById("grid_toolbar_quick_filter")) {
                //   document.getElementById("grid_toolbar_quick_filter").focus();
                // }
              }}
              onSelectionChange={(rows) => {
                let myFilter = storeList.storesRevenueList.filter((item) =>
                  rows.some((val_id) => item.id == val_id.id)
                );
                if (myFilter && myFilter.length > 0) {
                  setPdfExportRow(myFilter);
                } else {
                  setPdfExportRow(storeList.storesRevenueList);
                }
              }}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default StoresRevenueData;
