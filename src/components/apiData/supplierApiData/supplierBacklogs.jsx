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
import DataGrid from "../../dataTable/dataTable";
import moment from 'moment'

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const SupplierBacklogs = (props) => {
  const trans = props.t;
  const [backlogs, setBacklogs] = useState([]);

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "subject_id", headerName: trans("ID"), flex: 1 },
    { field: "causer_type", headerName: trans("User"), flex: 1 },
    { field: "subject_type", headerName: trans("Object"), flex: 1 },
    { field: "action", headerName: trans("Action"), flex: 1 },
    // {
    //   valueGetter: (params) =>
    //     `${params.row.created_at} ${params.row.lastName || ''}`,
    // },
    { field: "created_at", headerName: trans("Time"), flex: 1 },
    { field: "comments", headerName: trans("Comments"), editable: true,  flex: 1},
  ];

  useEffect(() => {
    const getBacklogs = async () => {
      const response = await axios.get(`${URL}/backlogs`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("backlogs", response);
      const logs = response.data.logs;
      logs.map((item, index) => (item["index"] = index + 1));
      setBacklogs(logs);
    };

    getBacklogs();
  }, []);


 
  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Supplier")} title={trans("Backlogs")} />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <h5>{trans("Backlogs")}</h5>
            </CardHeader>
            <CardBody>
              <DataGrid  columns={columns} rows={backlogs}  cellEditCommit={true} />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(SupplierBacklogs);
