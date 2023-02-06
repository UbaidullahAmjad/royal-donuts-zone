/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import {
  useMediaQuery,
  useTheme,
  Box,
  Alert,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/system";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next"; 
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Slider from "react-slick";
import {
  addItemToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} from "../../redux/CartPage/myCartAction";
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import RelatedProducts from "./RelatedProducts";
import RelatedProductsSkeleton from "./RelatedProductsSkeleton";
import Skeleton from "@mui/material/Skeleton";
import CopyRight from "../copy-right/CopyRight";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import getWindowDimensions from "../../Components/Hooks/useWindowDimensions";
import { ShoppingBasket } from "@material-ui/icons";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo.webp";
import { SIMPLE_URL, URL } from "../../env";
import { ProductDetailGetDataAction } from "../../redux/ProductDetail/ProductDetailAction";

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

const Product = (props) => {
  const location = useLocation();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const id = location.state ? location.state.id : 0;
  const slug = location.state ? location.state.slug : 0;
  const { screenWidth, screenHeight } = getWindowDimensions();

  const URL_ProductImage = `${SIMPLE_URL}/images/Product`;

  const { t } = useTranslation();
  const trans = t;
  const slider = useRef(null);

  const product = useParams();
  const [openItemAddedAlert, setOpenItemAddedAlert] = useState(false);

  let detailPageCartItem = useSelector((state) =>
    state.myProductsCart.cartItems.length > 0
      ? state.myProductsCart.cartItems.filter((cart) => cart.id == id)[0]
      : null
  );
  let cartItemQuantity = useSelector(
    (state) =>
      state.myProductsCart.cartItems.filter((cart) => cart.id == id)[0]
        ?.quantity
  );

  let cartItem = useSelector((state) => state.myProductsCart);

  const theme = useTheme();
  const [click, setClick] = useState(0);
  const [value, setValue] = useState(1);
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const Eccom_SEO = useSelector((state) => state.getEccomSeo.eccomSeoData);
  const getProductDetail = useSelector((state) => state.getProductDetail)
  const prodsDetailList = getProductDetail?.productsDetailList ?? [];
  const productDetail = prodsDetailList.length > 0 ? prodsDetailList.find((prod) => prod.prod_slug == product?.idd) : null;
  const ProductDescription = productDetail?.product ?? null;
  const AllImages = productDetail?.allImages ?? null;
  const CurrentImage = productDetail?.currentImage ?? null;
  const ProductAllergen = productDetail?.allergen_product ?? [];
  const ProductLayer = productDetail?.layers ?? null;
  const ProductLayer2 = productDetail?.product_layers ?? null;
  const relatedProducts = productDetail?.related_products ?? null;
  const ProductDetailSEO = productDetail?.product_seo ?? null;

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setScrollYPosition(scrolled);
  };

  useEffect(() => {

    const prodDetailFind = prodsDetailList.some((prod) => prod.prod_slug == product?.idd)
    if (prodDetailFind == false) {
      disptach(ProductDetailGetDataAction(product?.idd))
    } else {
      window.scrollTo(0, 0);
    }

  }, [name, id]);


  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => {
      window.addEventListener("scroll", listenToScroll);
    };
  }, []);

  var no_script = document.getElementsByTagName("noscript")[0];
  no_script.innerHTML =
    ProductDetailSEO != null &&
      ProductDetailSEO.body != undefined &&
      ProductDetailSEO.body != null &&
      ProductDetailSEO.body != ""
      ? ProductDetailSEO.body
      : Eccom_SEO != null && Eccom_SEO?.body_script != null
        ? Eccom_SEO.body_script
        : "";

  const Msg = () => {
    const handleClick = () => {
      navigate("/cart");
    };
    return (
      <div className="d-flex justify-content-between">
        {trans("Item added to cart")}
        <ShoppingBasket
          style={{ color: "#ff6295", marginRight: "30px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    );
  };

  const IncrementItem = () => {
    setValue(value + 1);
  };
  const DecreaseItem = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const UpdateCart = () => {
    const link = `${URL}/cart`;

    if (detailPageCartItem == null) {
      const newItem = {
        id: ProductDescription.id,
        quantity: value,
        price: ProductDescription.price_euro,
        product_detail: ProductDescription,
      };
      if (value > 0) {
        disptach(addItemToCart(newItem));
        setOpenItemAddedAlert(true);
      } else {
        toast.warn(trans("select atleast 1 item"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      if (cartItemQuantity > 0) {
        incrementQuantity();
      }
    }
  };

  const incrementQuantity = () => {
    if (cartItemQuantity != undefined) {
      if (cartItemQuantity > 0) {
        disptach(
          incrementItemQuantity({
            id: ProductDescription.id,
            quantity: cartItemQuantity + value,
            incremented_quantity: value,
            price: ProductDescription.price_euro,
          })
        );
      }
      setOpenItemAddedAlert(true);
    } else {
      setValue(value + 1);
    }
  };

  return (
    <>
      {ProductDetailSEO != null && (
        <Helmet>
          <title>
            {ProductDetailSEO != null && ProductDetailSEO.meta_title != null
              ? ProductDetailSEO.meta_title
              : Eccom_SEO != null && Eccom_SEO?.meta_title != null
                ? Eccom_SEO.meta_title
                : "Royal Donuts"}
          </title>

          <meta
            property="og:description"
            content={
              ProductDetailSEO != null &&
                ProductDetailSEO.meta_description != null
                ? ProductDetailSEO.meta_description
                : Eccom_SEO != null && Eccom_SEO?.meta_description != null
                  ? Eccom_SEO.meta_description
                  : ""
            }
          />

          {/* <meta property="og:head" content={storeSEOTags != null && storeSEOTags.head != null ? storeSEOTags.head : Eccom_SEO != null && Eccom_SEO?.head != null ? Eccom_SEO.head : ""} /> */}
          <script>
            {ProductDetailSEO != null && ProductDetailSEO.head != null
              ? ProductDetailSEO.head
              : Eccom_SEO != null && Eccom_SEO?.head != null
                ? Eccom_SEO.head
                : ""}
          </script>
          <link
            rel="stylesheet"
            href={
              ProductDetailSEO != null && ProductDetailSEO.canonical_url != null
                ? ProductDetailSEO?.canonical_url
                : Eccom_SEO != null && Eccom_SEO?.canonical_url != null
                  ? Eccom_SEO.canonical_url
                  : ""
            }
          />

          <meta
            property="og:robots_meta"
            content={
              ProductDetailSEO != null && ProductDetailSEO.robots_meta != null
                ? ProductDetailSEO.robots_meta
                : Eccom_SEO != null && Eccom_SEO?.robots_meta != null
                  ? Eccom_SEO.robots_meta
                  : ""
            }
          />
          {/* <meta property="og:body" content={ProductDetailSEO != null && ProductDetailSEO.robots_meta != null ? ProductDetailSEO.robots_meta :  Eccom_SEO != null && Eccom_SEO?.robots_meta != null ? Eccom_SEO.robots_meta : ""} /> */}
        </Helmet>
      )}
      <div>
        <ToastContainer />
        <Header />
        <div className="container-fluid">
          {cartItem.cartItem != null && (
            <div
              className="product_item_added_alert_wrapper container"
              style={{ position: "sticky" }}
            >
              <Box className="product_item_added_alert">
                <Collapse
                  in={openItemAddedAlert}
                  className={openItemAddedAlert && "mt-3"}
                >
                  <Alert
                    className="border border-success"
                    severity="success"
                    variant="outlined"
                    icon={
                      screenWidth > 500 && (
                        <AddShoppingCartIcon
                          fontSize="inherit"
                          style={{ marginTop: 5 }}
                        />
                      )
                    }
                    action={
                      <div className="">
                        <Button
                          className="btn_view"
                          variant="contained"
                          color="warning"
                          onClick={() => navigate("/cart")}
                        >
                          {screenWidth < 500 ? (
                            <AddShoppingCartIcon
                              fontSize="inherit"
                              style={{ marginTop: 5 }}
                            />
                          ) : (
                            trans("View Shopping Cart")
                          )}
                        </Button>
                        <IconButton
                          className="btn_close"
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpenItemAddedAlert(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    }
                    sx={{ mb: 2 }}
                  >
                    <div className="alert_text">
                      <div className="product_item_added_alert_body">
                        <p>{cartItem?.cartItem?.product_detail?.name_fr}</p>
                      </div>
                      <div
                        className="product_item_added_alert_body"
                        id="alert_qty"
                      >
                        <p className="quantity">
                          x {cartItem?.cartItem?.quantity}
                        </p>
                      </div>
                    </div>
                  </Alert>
                </Collapse>
              </Box>
            </div>
          )}
          <div className="row justify-content-center m-0">
            <div className="col-12 main_desc_cont  mb-4">
              <div className="Image_cont mx-auto">
                <div
                  className="product_image_detail"
                  style={{
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  {CurrentImage != null ? (
                    <img
                      className="img-fluid"
                      src={
                        CurrentImage != null &&
                        SIMPLE_URL +
                        (CurrentImage.type == 0
                          ? "/images/Product/"
                          : "/images/EccomerceProductGallery/") +
                        CurrentImage.image
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = logo;
                      }}
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
              </div>
              <div className="col-12 col-sm-11 col-md-11 col-lg-5 mx-auto my-3">
                <div className="boxx py-4 px-2 px-md-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="prod_des_name mb-0">
                      {" "}
                      {ProductDescription != null ? (
                        ProductDescription.name_fr
                      ) : (
                        <Skeleton animation="wave" variant="text" width={140} />
                      )}
                    </h6>
                  </div>

                  <div
                    // style={{ backgroundColor: "#F8F8F8" }}
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
                    {ProductDescription != null &&
                      ProductDescription.blank != null && (
                        <div className="flexx mt-4">
                          <h5 className="FW ">{trans("Base")}</h5>
                          <span className="mg">
                            {" "}
                            {ProductDescription != null ? (
                              ProductDescription.blank
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
                            <div className="flexx">
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
                            <div className="flexx">
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
                            <div className="flexx">
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
                    {ProductAllergen != null && ProductAllergen.length > 0 && (
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
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = logo;
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {screenWidth >= 1020 && (
                      <div>
                        <div className="row ps-1 mb-2">
                          {ProductDescription != null ? (
                            <span className="chip p-2">
                              {ProductDescription != null &&
                                ProductDescription.price_euro}{" "}
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
                            {ProductDescription != null ? (
                              <div className="prod_item_change d-flex">
                                <RemoveCircleOutlineIcon
                                  className="m_btn"
                                  onClick={DecreaseItem}
                                />
                                <span className="prod_item_num">{value}</span>
                                <AddCircleOutlineIcon
                                  className="m_btn"
                                  onClick={IncrementItem}
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
                          <div className=" p-0 Custom_add_to_cart">
                            {ProductDescription != null ? (
                              <button
                                className={`border-0 buttonCustom px-4 py-1 col-12`}
                                onClick={() => UpdateCart()}
                              >
                                {trans("Add to Cart")}
                              </button>
                            ) : (
                              <Skeleton
                                className="buttonCustom px-4 py-4 col-12"
                                animation="wave"
                                style={{ marginTop: -18 }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* window.scrollY >= 300 */}
          {scrollYPosition >= (screenWidth >= 1020 ? 0.23 : 0) && (
            <div style={{ overflow: "hidden" }}>
              <div
                className="bottom_product_detail_box_wrapper"
                style={
                  scrollYPosition >= (screenWidth >= 1020 ? 0.23 : 0)
                    ? { opacity: "1" }
                    : { opacity: "0" }
                }
              >
                <div className="row justify-content-center m-0">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-11 p-0">
                    <div className="bottom_product_detail_box">
                      <div className="bottom_product_detail">
                        {screenWidth > 600 && (
                          <div className="bottom_image_box">
                            {CurrentImage != null ? (
                              <img
                                className="img-fluid"
                                src={
                                  CurrentImage != null &&
                                  SIMPLE_URL +
                                  (CurrentImage.type == 0
                                    ? "/images/Product/"
                                    : "/images/EccomerceProductGallery/") +
                                  CurrentImage.image
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = logo;
                                }}
                              />
                            ) : (
                              <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={"100%"}
                                height={"100%"}
                              />
                            )}
                          </div>
                        )}
                        <div className="bottom_product_info">
                          <h5 className="bottom_product_name">
                            {ProductDescription != null ? (
                              ProductDescription.name_fr
                            ) : (
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={140}
                              />
                            )}
                          </h5>
                        </div>
                        <p className="bottom_price_info">
                          {ProductDescription != null ? (
                            <span className="chip p-2">
                              {ProductDescription != null &&
                                ProductDescription.price_euro}{" "}
                              €
                            </span>
                          ) : (
                            <Skeleton
                              className="p-2_"
                              animation="wave"
                              variant="text"
                              height={60}
                              width={90}
                              style={{ marginTop: -20 }}
                            />
                          )}
                        </p>
                      </div>
                      <div className="bottom_add_to_cart">
                        <div className="d-flex bottom_cart_btns_wrapper">
                          <div className=" p-0 ps-2 bottom_price_change_btns">
                            {ProductDescription != null ? (
                              <div className="bottom_item_change d-flex">
                                <RemoveCircleOutlineIcon
                                  className="m_btn"
                                  onClick={DecreaseItem}
                                />
                                <span className="prod_item_num">{value}</span>
                                <AddCircleOutlineIcon
                                  className="m_btn"
                                  onClick={IncrementItem}
                                />
                              </div>
                            ) : (
                              <Skeleton
                                className="bottom_item_change px-4 py-2 col-12"
                                animation="wave"
                                height={70}
                                style={{ marginTop: -16 }}
                              />
                            )}
                          </div>
                          <div className=" p-0 bottom_cart_wrapper">
                            {ProductDescription != null ? (
                              <button
                                className={`border-0 bottom_cart_btn px-4 py-1 col-12`}
                                onClick={() => {
                                  UpdateCart();
                                  if (value > 0) {
                                    if (scrollYPosition > 0.932) {
                                      // window.scrollY(screenHeight)
                                    }
                                  }
                                }}
                              >
                                {screenWidth > 575 ? (
                                  trans("Add to Cart")
                                ) : (
                                  <AddShoppingCartIcon />
                                )}
                              </button>
                            ) : (
                              <Skeleton
                                className="px-4 py-4 col-12"
                                animation="wave"
                                style={{ marginTop: -18 }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {relatedProducts && relatedProducts != null ? (
            relatedProducts.length > 0 &&
            ProductDescription != null && (
              <div className="row justify-content-center mx-0 mb-4">
                <div className="col-12 col-sm-12 col-md-11 mb-5">
                  <RelatedProducts
                    related_products={relatedProducts}
                    setValue={setValue}
                    setOpenItemAddedAlert={setOpenItemAddedAlert}
                    ProductDescription={ProductDescription}
                  />
                </div>
              </div>
            )
          ) : (
            <div className="row justify-content-center mx-0 mb-4">
              <div className="col-12 col-sm-12 col-md-11 mb-5">
                <RelatedProductsSkeleton
                  ProductDescription={ProductDescription}
                />
              </div>
            </div>
          )}
        </div>
        <Footer />
        <CopyRight />
      </div>
    </>
  );
};

export default Product;
