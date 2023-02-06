import React, { useEffect } from "react";
import axios from "axios";
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

import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";

const SupplierBackups = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [backups, setBackups] = useState([]);

  const columns = [
    { field: "image", headerName: trans("IMAGE"), width: 300 },
    { field: "name_fr", headerName: trans("NAME"), width: 300 },
    { field: "price_euro", headerName: trans("PRICE"), width: 300 },
    { field: "description_fr", headerName: trans("DESCRIPTION"), width: 300 },
    { field: "isActive", headerName: trans("STATUS"), width: 300 },
    { field: "action", headerName: trans("ACTION"), width: 300 },
  ];
  useEffect(() => {
    const getBackups = async () => {
      const response = await axios.get(`${URL}/deliverycompany`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setBackups(response.data.products);
    };

    getBackups();
  }, []);

  return (
    <>
      <div>
        <DataGrid columns={columns} rows={backups} />
      </div>
    </>
  );
};

export default SupplierBackups;
