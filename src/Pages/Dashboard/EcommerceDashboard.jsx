import React from 'react'
import { Col, Row } from 'reactstrap'
import { DashboardCard } from '../../components'
import {
    CategoryRounded,
    EnhancedEncryptionRounded,
    LocalMallRounded,
    LocalShippingRounded,
} from "@mui/icons-material";
import { useTranslation, } from "react-i18next";
import { useSelector } from 'react-redux';

const EcommerceDashboard = (props) => {
    const { t } = useTranslation();
    const trans = t;
    const role = atob(localStorage.getItem("role"));
    let userPermissions = useSelector((state) => state.setDashboardDetails.userPermissions)
    let user_detail = useSelector((state) => state.setDashboardDetails.user_detail)

    return (
        <>
            <Row style={{ marginBottom: "2rem" }}>
                <Col>
                    <h5>{trans("Ecommerce")}</h5>
                </Col>
            </Row>
            <Row>
                {(role == "SuperAdmin" || userPermissions.includes("Products")) && (
                    <DashboardCard link={'/ecommerce/products/list'} heading={user_detail?.Eccom_Product} title={trans("Products")} icon={<LocalMallRounded className="Icon_col" />} />
                )}
                {(role == "SuperAdmin" || userPermissions.includes("Categories")) && (
                    <DashboardCard link={'/ecommerce/categories/list'} heading={user_detail?.Eccom_Category} title={trans("Categories")} icon={<CategoryRounded className="Icon_col" />} />
                )}
                {(role == "SuperAdmin" || userPermissions.includes("open_order")) && (
                    <DashboardCard link={'/ecommerce/orders/list'} heading={user_detail?.Eccom_Open_Orders} title={trans("Open Orders")} icon={<EnhancedEncryptionRounded className="Icon_col" />} />
                )}
                {(role == "SuperAdmin" || userPermissions.includes("delivered_order")) && (
                    <DashboardCard link={`/ecommerce/orders/list`} heading={user_detail?.Eccom_Delivered_Orders} title={trans("Delivered Orders")} icon={<LocalShippingRounded className="Icon_col" />} />
                )}
            </Row>
        </>
    )
}

export default EcommerceDashboard