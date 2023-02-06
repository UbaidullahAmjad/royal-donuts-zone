import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card } from 'reactstrap'
import { useTranslation, } from "react-i18next";

const SupplierDashboard = (props) => {
    const { t } = useTranslation();
    const trans = t;
    let leadLastFromSubmitted_Stage = useSelector((state) => state.setDashboardDetails.leadLastFromSubmitted_Stage)


    const navigate = useNavigate();
    const setRoute = () => {
        navigate({ pathname: `/inquiry/view`, state: { tabValue: "1" } });
    };

    const setRoute2 = () => {
        navigate({ pathname: `/inquiry/view`, state: { tabValue: "2" } });
    };


    return (
        <Row className="justify-content-center">
            <Col sm="3">
                <Card
                    onClick={setRoute}
                    className="shadowClass d-flex justify-content-center align-items-center px-2"
                    style={{ height: "170px", cursor: "pointer" }}
                >
                    <span style={{ color: "black" }}>
                        <b>{trans("Current Form")}</b>
                    </span>
                </Card>
            </Col>
            <Col sm="3">
                <Card
                    onClick={setRoute2}
                    className="shadowClass d-flex justify-content-center align-items-center px-2"
                    style={{ height: "170px", cursor: "pointer" }}
                >
                    <span style={{ color: "black" }}>
                        <b>{trans("Last Form Submitted")}</b>
                        <br />
                        <span
                            className="d-block text-center"
                            style={{ fontSize: 11 }}
                        >
                            {"("}
                            <b>{trans("Stage")}: </b>
                            {leadLastFromSubmitted_Stage != null &&
                                leadLastFromSubmitted_Stage.stage.name}
                            {")"}
                        </span>
                    </span>
                </Card>
            </Col>
        </Row>
    )
}

export default SupplierDashboard