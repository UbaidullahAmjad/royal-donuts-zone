import React from "react";
import { Col, Row } from "reactstrap";
import { DashboardCard } from '../../components'
import {
  EnhancedEncryptionRounded,
  LocalMallRounded,
  GroupRounded,
  PersonOutline
} from "@mui/icons-material";
import { useTranslation, } from "react-i18next";
import { useSelector } from "react-redux";

const Suppliers = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const role = atob(localStorage.getItem("role"));
  let userPermissions = useSelector(
    (state) => state.setDashboardDetails.userPermissions
  );
  let user_detail = useSelector(
    (state) => state.setDashboardDetails.user_detail
  );

  return (
    <>
      <Row style={{ marginBottom: "2rem" }}>
        <Col>
          <h5> {trans("Suppliers")}</h5>
        </Col>
      </Row>
      <Row>
        {(role == "SuperAdmin" || userPermissions.includes("Suppliers")) && (
          <DashboardCard link={`/homeSettings/Order-Management/OrderManagement`} heading={user_detail?.Supplier} title={trans("Suppliers")} icon={<PersonOutline className="Icon_col" />} />
        )}
        {(role == "SuperAdmin" || userPermissions.includes("Customers")) && (
          <DashboardCard link={`/supplier/customers/list`} heading={user_detail?.Supplier_Client} title={trans("Customers")} icon={<GroupRounded className="Icon_col" />} />
        )}
        {(role == "SuperAdmin" || userPermissions.includes("Products")) && (
          <DashboardCard link={`/supplier/products/list`} heading={user_detail?.Supplier_Product} title={trans("Products")} icon={<LocalMallRounded className="Icon_col" />} />
        )}
        {(role == "SuperAdmin" || userPermissions.includes("Orders")) && (
          <DashboardCard link={`/supplier/orders/list`} heading={user_detail?.Supplier_Orders} title={trans("Orders")} icon={<EnhancedEncryptionRounded className="Icon_col" />} />
        )}
      </Row>
    </>
  );
};

export default Suppliers;
