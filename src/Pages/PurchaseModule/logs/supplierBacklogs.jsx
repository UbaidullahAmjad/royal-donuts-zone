/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
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
} from "reactstrap";
import { useState } from "react";
import DataGrid from "../../../components/dataTable/dataTable";
import moment from "moment";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  LogsListAction
} from "../../../redux/Pages/PurchaseModule/Logs/actions";

const SupplierBacklogs = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const backlogs = useSelector((state) => state.getBackLogs);

  useEffect(() => {
    if (backlogs?.backLogsList.length == 0) {
      dispatch(LogsListAction())
    }
    if (backlogs && backlogs.backLogsList.length > 0
      && backlogs.tempArrLength != 0
      && backlogs.backLogsList.length != backlogs.tempArrLength) {
      dispatch(LogsListAction())
    }
  }, []);

  // useEffect(() => {
  //   getBacklogs();
  // }, []);

  // const getBacklogs = async () => {
  //   const response = await axios.get(`${URL}/backlogs`, {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token123"),
  //     },
  //   });
  //   const logs = response.data.logs;
  //   logs.map((item, index) => (item["index"] = index + 1));
  //   setBacklogs(logs);
  // };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80, editable: 'never', },
    { field: "subject_id", title: trans("ID"), flex: 1.2, minWidth: 160, editable: 'never' },
    { field: "causer_type", title: trans("User"), flex: 1.2, minWidth: 160, editable: 'never' },
    { field: "subject_type", title: trans("Object"), flex: 1, minWidth: 100, editable: 'never' },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 1.25,
      minWidth: 180,
      editable: 'never'
    },
    { field: "created_at", title: trans("Time"), flex: 1.5, minWidth: 180, editable: 'never' },
    {
      field: "comments",
      title: trans("Comments"),
      editable: 'always',
      flex: 2.5,
      minWidth: 300,
      maxWidth: 300,
      cellStyle: {
        // overflow: 'hidden',
        width: '300px'
      },
      render: (rowData) => {
        return (
          <p style={{ overflow: 'hidden', paddingRight: '0px', width: '275px' }}>{rowData.comments != 'null' ? rowData.comments : ""}</p>
        )
      }
    },
  ];

  const upDateCellComment = async (id, newValue) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/save_comment/${id}/${newValue}`,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          // getBacklogs();
          dispatch(LogsListAction())
        }
      })
      .catch((error) => {
        console.log("datable-error:", error);
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  return (
    <>
      <Fragment>
        <Breadcrumb
          breadcrumbtitle={trans("Purchase Module") + " " + trans("List")}
          parent={trans("Purchase Module")}
          title={trans("Backlogs")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <h5>{trans("Backlogs")}</h5>
            </CardHeader>
            <CardBody>
              <DataGrid
                columns={columns}
                data={backlogs.backLogsList}
                isLoading={backlogs.loading && backlogs.backLogsList.length == 0 ? true : false}
                cellEditable={{
                  onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return new Promise((resolve, reject) => {
                      const rowDataJsonValue = Object.values(rowData);
                      const rowDataJsonValueId = rowDataJsonValue[0];

                      upDateCellComment(rowDataJsonValueId, newValue);

                      setTimeout(resolve, 1000);
                    });
                  }
                }}
              // cellEditCommit={true}
              />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default SupplierBacklogs;
