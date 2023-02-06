/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import ProductCard from "../../Components/ProductCard/ProductCard";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap"
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import { useTranslation, } from "react-i18next";
import Skeleton from '@mui/material/Skeleton';
import ProductCardSkeleton from '../../Components/ProductCard/ProductCardSkeleton';


const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const pink = {
    500: "#F36292",
    600: "#C25C7C",
    700: "#C25C7C",
};

const RelatedProductsSkeleton = (props) => {
    const { t } = useTranslation();
    const trans = t;

    const slider = useRef(null);

    let related_products_skeleton = [1, 2, 3, 4];

    return (
        <>
            <div>
                <h1 id="product_title">{trans("Related Products")}</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
            </div>
            <Row
                style={{ justifyContent: "center", marginTop: 20 }}
            >
                <Col
                    sm={1}
                    md={1}
                    xs={1}
                    style={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        marginTop: "-2%",
                    }}
                >
                    <ArrowBack
                        style={{ marginTop: "15%", cursor: 'pointer' }}
                        onClick={() => slider.current.slickPrev()}
                    />
                </Col>
                <Col sm={10} md={10} xs={10}>
                    <Slider ref={slider} {...settings}>
                        {
                            related_products_skeleton.map((item, index) => (
                                <ProductCardSkeleton
                                    key={index}
                                />
                            ))
                        }
                    </Slider>
                </Col>
                <Col
                    sm={1}
                    md={1}
                    xs={1}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-2%",
                        padding: 0,
                    }}
                >
                    <ArrowForward
                        style={{ marginTop: "15%", cursor: 'pointer' }}
                        onClick={() => slider.current.slickNext()}
                    />
                </Col>
            </Row>
        </>
    )
}

export default RelatedProductsSkeleton