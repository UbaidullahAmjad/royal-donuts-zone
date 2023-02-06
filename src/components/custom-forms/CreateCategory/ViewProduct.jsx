/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import "./viewProduct.css";
import Skeleton from "@mui/material/Skeleton";
import { URL } from "../../../env";
import { SIMPLE_URL } from "../../../env";
import { CardHeader, Button } from "reactstrap";

const settings = {
  centerMode: false,
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
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const pink = {
  500: "#F36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 16px;
  margin-top: 2%;
  font-weight: bold;
  background-color: ${pink[500]};
  padding: 4px 30px;
  border-radius: 25px;
  margin-right: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${pink[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${pink[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
`;

const ViewProduct = (props) => {
  const params = useParams();
  const id = location.state ? location.state.id : 0;
  const { t } = useTranslation();
  const trans = t;

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [ProductLayer, setProductLayers] = useState([]);
  const [ProductLayer2, setProductLayers2] = useState([]);
  const [ProductAllergen, setProductAllergens] = useState([]);

  useEffect(() => {
    ApiRes();
  }, []);

  const ApiRes = () => {
    axios
      .get(`${URL}/product/${params.idd}/edit`)
      .then((response) => {
        setProduct(response.data.product);
        setProductLayers(response.data.layers);
        setProductLayers2(response.data.product_layers);
        setProductAllergens(response.data.product_allegens);
      })
      .catch((e) => {
        console.log("eeeorrr", e);
      });
  };

  const goBack = () => {
    navigate(`/ecommerce/products/list`);
  };

  return (
    <>
      <CardHeader className="p-0 pb-4 mb-4 d-flex">
        <Col md="6">
          <h5>{trans("View Product")}</h5>
        </Col>
        <Col md="6" className="text-right">
          <Button onClick={goBack}>{trans("Go Back")}</Button>
        </Col>
      </CardHeader>
      <div className="container-fluid p-0">
        <div className="row justify-content-center m-0">
          <div className="col-12 main_desc_cont p-0 mb-4">
            <div className="Image_cont mx-auto">
              <div
                className="product_image_detail"
                style={{
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {product != null ? (
                  <img
                    className="img-fluid"
                    src={
                      product != null &&
                      `${SIMPLE_URL}/images/Product/${product.image}`
                    }
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"80%"}
                    height={"100%"}
                  />
                )}
              </div>

              {/* {ProductGalleryImages && ProductGalleryImages.length > 0 && (
                  <div className="product_details_gallery_images mb-5">
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
                          style={{ marginTop: "15%" }}
                          onClick={() => slider.current.slickPrev()}
                        />
                      </Col>
                      <Col sm={10} md={10} xs={10}>
                        <Slider ref={slider} {...settings}>
                          {AllImages &&
                            AllImages.map((item, index) => (
                              <div key={index + 1}>
                                <div
                                  key={index + 1}
                                  className="desc_galery_images_box m-1"
                                >
                                  <img
                                    key={index}
                                    className={`img-fluid m-1 border border-transparent ${CurrentImage &&
                                      CurrentImage.image == item.image &&
                                      "border border-dark"
                                      }`}
                                    src={`${urlb}/images/${item.type == 0
                                      ? "Product"
                                      : "EccomerceProductGallery"
                                      }/${item.image}`}
                                    alt={item.image}
                                    onClick={() =>
                                      setCurrentImage({
                                        image: item.image,
                                        type: item.type,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            ))}
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
                          style={{ marginTop: "15%" }}
                          onClick={() => slider.current.slickNext()}
                        />
                      </Col>
                    </Row>
                  </div>
                )} */}
            </div>
            <div className="col-12 col-sm-11 col-md-11 col-lg-8 mx-auto my-3">
              <div className="boxx py-4 ">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="prod_des_name mb-0">
                    {" "}
                    {product != null ? (
                      product.name_fr
                    ) : (
                      <Skeleton animation="wave" variant="text" width={140} />
                    )}
                  </h6>
                </div>

                <div
                  style={{ backgroundColor: "#ffff" }}
                  className={
                    ProductLayer2 != null &&
                    ProductLayer2.map((item, index) =>
                      item.map(
                        (item2, index2) =>
                          (item2.layer_id == "1" ||
                            item2.layer_id == "2" ||
                            item2.layer_id == "3" ||
                            item2.layer_id == "4") &&
                          "p-2 mt-1"
                      )
                    )
                  }
                >
                  {product != null && product.blank != null && (
                    <div className="flexx mt-4">
                      <h5 className="FW ">{trans("Base")}</h5>
                      <span className="mg">
                        {" "}
                        {product != null ? (
                          product.blank
                        ) : (
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={90}
                          />
                        )}
                      </span>
                    </div>
                  )}
                  {ProductLayer != null &&
                    ProductLayer.map(
                      (item, index) =>
                        item.id == "1" && (
                          <div className="flexx mt-4">
                            <h5 className="FW ">{trans("Filling")}</h5>
                            <span className="mg">
                              {" "}
                              {ProductLayer2 != null ? (
                                ProductLayer2.map((item, index) => (
                                  <>
                                    {item.map((item2, index2) =>
                                      item2.layer_id == "1"
                                        ? index2 > 0
                                          ? " , " + item2.name_fr
                                          : item2.name_fr
                                        : ""
                                    )}
                                  </>
                                ))
                              ) : (
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={90}
                                />
                              )}
                            </span>
                          </div>
                        )
                    )}
                  {ProductLayer != null &&
                    ProductLayer.map(
                      (item, index) =>
                        item.id == "2" && (
                          <div className="flexx mt-4">
                            <h5 className="FW ">{trans("Icing")}</h5>
                            <span className="mg">
                              {ProductLayer2 != null ? (
                                ProductLayer2.map((item, index) => (
                                  <>
                                    {item.map((item2, index2) =>
                                      item2.layer_id == "2"
                                        ? index2 > 0
                                          ? " , " + item2.name_fr
                                          : item2.name_fr
                                        : ""
                                    )}
                                  </>
                                ))
                              ) : (
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={100}
                                />
                              )}
                            </span>
                          </div>
                        )
                    )}
                  {ProductLayer != null &&
                    ProductLayer.map(
                      (item, index) =>
                        item.id == "3" && (
                          <div className="flexx mt-4">
                            <h5 className="FW ">{trans("Garnish")}</h5>
                            <span className="mg">
                              {ProductLayer2 != null ? (
                                ProductLayer2.map((item, index) => (
                                  <>
                                    {item.map((item2, index2) =>
                                      item2.layer_id == "3"
                                        ? index2 > 0
                                          ? " , " + item2.name_fr
                                          : item2.name_fr
                                        : ""
                                    )}
                                  </>
                                ))
                              ) : (
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={110}
                                />
                              )}
                            </span>
                          </div>
                        )
                    )}
                  {ProductLayer != null &&
                    ProductLayer.map(
                      (item, index) =>
                        item.id == "4" && (
                          <div className="flexx mt-4">
                            <h5 className="FW ">{trans("Sauce")}</h5>
                            <span className="mg">
                              {ProductLayer2 != null ? (
                                ProductLayer2.map((item, index) => (
                                  <>
                                    {item.map((item2, index2) =>
                                      item2.layer_id == "4"
                                        ? index2 > 0
                                          ? " , " + item2.name_fr
                                          : item2.name_fr
                                        : ""
                                    )}
                                  </>
                                ))
                              ) : (
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={90}
                                />
                              )}
                            </span>
                          </div>
                        )
                    )}
                </div>
                <div className="row ">
                  {ProductAllergen.length > 0 && (
                    <div className="allergen_product_box mb-4">
                      <div className="allergen_p_left">
                        <p className="allergen-title">{trans("Allergens")}</p>
                      </div>
                      <div className="allergen_p_right">
                        {ProductAllergen.map((allergen_item) => (
                          <img
                            className="allergen_image"
                            src={`${SIMPLE_URL}/images/Allergen/${allergen_item.image}`}
                            alt={allergen_item.name_fr}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* <div>
                        <div className="row ps-1 mb-2">
                          {product != null ? (
                            <span className="chip p-2">
                              {product != null &&
                                product.price_euro}{" "}
                              €
                            </span>
                          ) : (
                            <Skeleton
                              className="p-2 mb-5"
                              animation="wave"
                              variant="text"
                              height={60}
                              width={90}
                              style={{ marginTop: -20 }}
                            />
                          )}
                        </div>
                        <div className="d-flex parent_add_to_cart">
                          <div className=" p-0 Custom_inc_dec">
                            {product!= null ? (
                              <div className="prod_item_change d-flex">
                                <RemoveCircleOutlineIcon
                                  className="m_btn"
                               
                                />
                               
                                <AddCircleOutlineIcon
                                  className="m_btn"
                               
                                />
                              </div>
                            ) : (
                              <Skeleton
                                className="prod_item_change px-4 py-2 col-12"
                                animation="wave"
                                height={70}
                                style={{ marginTop: -16 }}
                              />
                            )}
                          </div>
                          
                        </div>
                      </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
