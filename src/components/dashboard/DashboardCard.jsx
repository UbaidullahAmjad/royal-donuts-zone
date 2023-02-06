import React from 'react'
import { Col, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useTranslation, } from "react-i18next";

const DashboardCard = (props) => {

    const { t } = useTranslation();
    const trans = t;

    return (
        <Col sm="6" md="6" xl="3">
            <Link
                className="LinkStyle "
                to={props.link}
            >
                <Card className="shadowClass">
                    <CardBody className="card_body">
                        <div className="filter-block w-100 d-flex justify-content-center align-items-center">
                            <div className="col-5 d-flex justify-content-end">
                                {props.icon}
                            </div>
                            <div className="col-7 pl-0">
                                <h6 style={{ fontSize: "40px" }}>
                                    {props.heading}
                                </h6>
                                <b style={{ fontSize: "12px" }}>
                                    {props.title}
                                </b>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    )
}

export default DashboardCard;