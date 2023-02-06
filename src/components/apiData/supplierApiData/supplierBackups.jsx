import React, { useEffect } from "react";
import axios from "axios";
import {
  Mail,
  Bell,
  Settings,
  Music,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Headphones,
  Link,
  GitHub,
  Award,
  Activity,
  Heart,
} from "react-feather";
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
import {
  ContextualVariations,
  PillsWithIcon,
  PillsWithNumber,
  TagsWithIcon,
  TagsWithNumber,
  New,
  Messages,
  Notification,
  BadgesExample,
  Primary,
  secondary,
  Success,
  Warning,
  Danger,
  Light,
  Info,
  Dark,
} from "../../../constant/index";
import { useState } from "react";
import DataGrid from "../../dataTable/dataTable";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const SupplierBackups = (props) => {
  const trans = props.t;
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
      console.log("categories", response);
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

export default translate(SupplierBackups);
