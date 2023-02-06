/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card, CardContent, Grid, TextField, Container } from "@mui/material";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Header from "../../Components/Header/Header";
import "./main.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductCardSkeleton from "../../Components/ProductCard/ProductCardSkeleton";
import Pagination from "@mui/material/Pagination";
import Footer from "../../Components/Footer/Footer";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Slider from "react-slick";
import { ReactComponent as CartBlack } from "../../assets/CartBlack.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProdCartListItem from "../CartPage/Contents/ProdCartListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation, } from "react-i18next";
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { Col, Row, Button } from "react-bootstrap";
import productsAction from "../../redux/ProductList/productsAction";
import categoriesAction from "../../redux/ProductList/categoriesAction";
import categoriesProdsAction from "../../redux/ProductList/categoriesProdsAction";
import { Skeleton } from "@mui/material";
import logo from "../../assets/logo.webp";
import CopyRight from "../copy-right/CopyRight";
import getWindowDimensions from "../../Components/Hooks/useWindowDimensions";
import { Helmet } from "react-helmet";
import { SIMPLE_URL, URL } from "../../env";

const pink = {
  500: "#F36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#F36292",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#F36292",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#F36292",
    },
    "&:hover fieldset": {
      borderColor: "#C25C7C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F36292",
    },
  },
});

const PaginationStyle = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#F36292",
    },
  },
}));

const CustomButtonRoot = styled("button")`
  font-family: Poppins;
  margin-top: 3%;
  font-size: 16px;
  /* font-size: 32px; */
  font-weight: bold;
  background-color: ${pink[500]};
  padding: 4px 30px;
  border-radius: 25px;
  margin-right: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;

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

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export const ProductList = createContext();

const main = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const classes = PaginationStyle();

  const [ProductListState, setProductListState] = useState(true);
  const { screenWidth, screenHeight } = getWindowDimensions();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.navCartClicked) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.state]);

  const ToogleProductListPage = () => {
    setProductListState(!ProductListState);
  };

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.allProducts);
  const categoriesList = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(productsAction());
    dispatch(categoriesAction());
  }, []);
  const firstIndex = 0;
  const [page, setPage] = useState(1);

  const categoriesSkeleton = [1, 2, 3, 4, 5];
  const productsSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [allCategories, setAllCategories] = useState(null);
  const [categoryAllProducts, setCategoryAllProducts] = useState(undefined);
  const [isCategoryProd, setIsCategoryProd] = useState();
  const [activeCategory, setActiveCategory] = useState(null);
  const [stickyClass, setStickyClass] = useState("relative");
  const [allProdsValue, setAllProductsValue] = useState([]);
  const [showTopCat, setShowTopCat] = useState(false);

  const productsPerPage = 9;
  const productsVisited = page * productsPerPage;
  const [pageCount, setPageCount] = useState(1);

  const URL_CategoryImage = `${SIMPLE_URL}/images/Category`;

  const [isAllProds, setIsAllProds] = useState(false);
  const setAllProducts = () => {
    setIsAllProds(true);
    setActiveCategory(null);

    if (productsList.productsList != null) {
      // Products List
      const products = productsList.productsList.products;
      setCategoryAllProducts(products);
      setIsCategoryProd(products);
      setAllProductsValue(products);
      const all_prod_length = products ? products.length : 0;
      setPageCount(Math.ceil(all_prod_length / productsPerPage));
    }
  };

  useEffect(() => {
    // Categories List

    if (categoriesList.categoriesList != null) {
      setAllCategories(categoriesList.categoriesList.categories);
      setIsCategoryProd(categoriesList.categoriesList.products);
    }

    if (productsList.productsList != null) {
      // Products List
      const products = productsList.productsList.products;
      setCategoryAllProducts(products);
      setIsCategoryProd(products);
      setAllProductsValue(products);
      const all_prod_length = products ? products.length : 0;
      setPageCount(Math.ceil(all_prod_length / productsPerPage));
    }
  }, [productsList, categoriesList]);

  const categoriesProducts = useSelector((state) => state.allCategoriesProds);
  const cateProdLoading = useSelector(
    (state) => state.allCategoriesProds.loading
  );

  const getAllCategoriesProds = (cat_id) => {
    setCategoryAllProducts(undefined);
    dispatch(categoriesProdsAction(cat_id));
    setActiveCategory(cat_id);
    setIsAllProds(false);
  };

  useEffect(() => {
    setIsCategoryProd(categoriesProducts.categoriesProds?.data?.products);
    if (categoriesProducts.categoriesProds?.data?.products == null) {
      setCategoryAllProducts([]);
    } else {
      setCategoryAllProducts(
        categoriesProducts.categoriesProds?.data?.products
      );
    }
    const cat_prod_length = categoriesProducts.categoriesProds?.data?.products
      ? categoriesProducts.categoriesProds?.data?.products?.length
      : 0;
    setPageCount(Math.ceil(cat_prod_length / productsPerPage));
    setPage(1);
    // }
    // }
  }, [categoriesProducts]);


  var settings = {
    dots: stickyClass === "fixxed" ? false : true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: stickyClass === "fixxed" ? false : true,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: stickyClass === "fixxed" ? false : true,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          // dots: stickyClass === "fixxed" ? false : true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          // dots: stickyClass === "fixxed" ? false : true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          // dots: stickyClass === "fixxed" ? false : true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: stickyClass === "fixxed" ? false : true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const slider = useRef(null);

  const MUIBreakpoints = makeStyles((theme) => ({
    CategorySlider: {
      [theme.breakpoints.up("xs")]: {
        marginLeft: 0,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: "15px !important",
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: "15px !important",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: 0,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: "15px !important",
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: 0,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: "15px !important",
      },
    },
    CartSection: {
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        position: "sticky",
        top: "7pc",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "start",
        position: "sticky",
        top: "7pc",
      },
    },
  }));

  const Styleclasses = MUIBreakpoints();

  let grandTotal = useSelector((state) => state.myProductsCart.cartGrandTotal);

  let cart_products = useSelector((state) => state.myProductsCart.cartItems);

  const EccomSEO = useSelector((state) => state.getEccomSeo.eccomSeoData);

  useEffect(() => {
    setIsAllProds(true);

    var no_script = document.getElementsByTagName("noscript")[0];
    no_script.innerHTML = EccomSEO?.body_script;

  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, [categoryAllProducts]);

  const stickNavbar = () => {

    if (categoryAllProducts.length > 0) {
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        if (windowHeight > 420) {
          setStickyClass("fixxed");
          setShowTopCat(true);
        } else {
          setStickyClass("relative");
          setShowTopCat(false);
        }
      }
    } else {
      let windowHeight = window.scrollY;
      if (windowHeight > 420) {
        setStickyClass("fixxed");
        setShowTopCat(true);
      } else {
        setStickyClass("relative");
        setShowTopCat(false);
      }
    }
  };

  return (
    <>
      {EccomSEO != null && (
        <Helmet>
          <title>
            {EccomSEO.meta_title && EccomSEO.meta_title != null
              ? EccomSEO.meta_title
              : "Royal Donuts"}
          </title>
          <meta
            name="description"
            property="og:description"
            content={EccomSEO?.meta_description}
          />
          {/* <meta name="head" property="og:head" content={EccomSEO.head} /> */}
          <script>{EccomSEO?.head}</script>
          <meta
            name="robots_meta"
            property="og:robots_meta"
            content={EccomSEO.robots_meta}
          />
          <link rel="stylesheet" href={EccomSEO.canonical_url} />
          {/* <script> {EccomSEO.body} </script> */}
        </Helmet>
      )}
      <div>
        <Header />
        <ToastContainer />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <img src="/images/product_left_design.webp" height={20} />
          <h1 id="trending_title">{trans("Our Trends")}</h1>
          <img src="/images/product_right_design.webp" height={20} />
        </div>
        <Container fixed>
          <Grid container style={{ marginBottom: 35, marginTop: "100px" }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={stickyClass}
              style={{
                transform:
                  showTopCat == true ? "translateY(0px)" : "translateY(-100px)",
                transition: "0.25s",
              }}
            >
              <Row
                style={{
                  backgroundColor: stickyClass === "fixxed" && "pink",
                }}
              >
                {screenWidth > 767 && stickyClass === "fixxed" && (
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
                    <ArrowBack
                      style={{ color: "#f73164", cursor: "pointer" }}
                      onClick={() => slider.current.slickPrev()}
                    ></ArrowBack>
                  </Col>
                )}
                <Col md={stickyClass === "fixxed" ? 10 : 12}>
                  <Slider
                    className={`categories_slider ${stickyClass == "fixxed" && "dots_fixxed"
                      }`}
                    ref={slider}
                    {...settings}
                  >
                    <div className="testt">
                      <Card
                        className={Styleclasses.CategorySlider}
                        // key={index}
                        style={{
                          cursor: "pointer",
                          height: stickyClass === "fixxed" && "100px",
                          boxShadow: stickyClass === "fixxed" && "none",
                          margin: stickyClass === "fixxed" && "0px",
                          overflow: stickyClass === "fixxed" && "unset",
                          zIndex: 99,
                          // borderRadius: stickyClass === "fixxed" && "0px",
                        }}
                        onClick={() => setAllProducts()}
                      >
                        <CardContent
                          className={`${isAllProds == true && "active_category"
                            } ${isAllProds == true &&
                            stickyClass == "fixxed" &&
                            "active_category_sides"
                            }`}
                          style={{
                            cursor: "pointer",
                            background:
                              stickyClass === "fixxed" ? "pink" : "#fff",
                            minHeight:
                              stickyClass === "fixxed" ? "100px" : "204px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: "0px",
                            overflow: stickyClass === "fixxed" && "unset",
                            zIndex: 99,
                          }}
                        >
                          <div>
                            <img
                              src={logo}
                              alt={"logo"}
                              height={100}
                              width={100}
                              style={{ display: "block", margin: "auto" }}
                            ></img>
                            <p
                              style={{
                                fontFamily: "Poppins",
                                textAlign: "center",
                                textTransform: "uppercase",
                                marginTop: 10,
                              }}
                            >
                              {trans("All Products")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {allCategories != null
                      ? allCategories.map((item, index) => (
                        <div className="testt" key={index}>
                          <Card
                            className={Styleclasses.CategorySlider}
                            key={index}
                            style={{
                              cursor: "pointer",
                              height: stickyClass === "fixxed" && "100px",
                              boxShadow: stickyClass === "fixxed" && "none",
                              margin: stickyClass === "fixxed" && "0px",
                              overflow: stickyClass === "fixxed" && "unset",
                            }}
                            onClick={() => getAllCategoriesProds(item.id)}
                          >
                            <CardContent
                              className={
                                activeCategory &&
                                activeCategory !== null &&
                                activeCategory === item.id &&
                                "active_category"
                              }
                              style={{
                                background:
                                  stickyClass === "fixxed" ? "pink" : "#fff",
                                minHeight:
                                  stickyClass === "fixxed"
                                    ? "100px"
                                    : "204px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingBottom: "0px",
                                overflow: stickyClass === "fixxed" ? "unset" : "initial",
                              }}
                            >
                              <div>
                                <img
                                  src={`${URL_CategoryImage}/${item.image}`}
                                  alt={item.image}
                                  height={100}
                                  width={100}
                                  style={{ display: "block", margin: "auto" }}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = logo;
                                  }}
                                ></img>
                                <p
                                  style={{
                                    fontFamily: "Poppins",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    marginTop: 10,
                                  }}
                                >
                                  {item.name_fr}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))
                      : categoriesSkeleton.map((i, key) => (
                        <div className="testt" style={{ marginTop: "-8px" }} key={key}>
                          <Card
                            className={Styleclasses.CategorySlider}
                            key={key}
                            style={{
                              height: stickyClass === "fixxed" && "100px",
                              boxShadow: stickyClass === "fixxed" && "none",
                              margin:
                                stickyClass === "fixxed"
                                  ? "3px"
                                  : "10px!important",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="rectangular"
                              width={"100%"}
                              height={"100%"}
                              style={{
                                minHeight:
                                  stickyClass === "fixxed"
                                    ? "100px"
                                    : "204px",
                                overflow: stickyClass === "fixxed" && "unset",
                              }}
                            />
                          </Card>
                        </div>
                      ))}
                  </Slider>
                </Col>
                {screenWidth > 767 && stickyClass === "fixxed" && (
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // margin: "auto",
                    }}
                  >
                    <ArrowForward
                      style={{ color: "#f73164", cursor: "pointer" }}
                      onClick={() => slider.current.slickNext()}
                    ></ArrowForward>
                  </Col>
                )}
              </Row>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "-100px" }}>
            {screenWidth > 767 && (
              <>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <div className={Styleclasses.CartSection}>
                    <div className="products_cart_list mx-2">
                      <div className="p_cart_header d-flex align-items-center justify-content-between px-2 pt-2">
                        <h5 className="mb-2">{trans("Cart")}</h5>
                        <div className="cart_box mb-2 mt-2">
                          <CartBlack className="cart_icon" width="30" />
                          <span className="prod_items_added">
                            {cart_products.length}
                          </span>
                        </div>
                      </div>
                      <div
                        className="p_cart_items pt-3"
                      >
                        {cart_products.length == 0 ? (
                          <div className="p_item">
                            <div className="image_box">
                              <div className="image_box_img">
                                <img
                                  className="box_image_bg"
                                  src={`${process.env.PUBLIC_URL}/images/config_circle_light.webp`}
                                  alt=""
                                />
                                <div className="box_image_overlay">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/cart_coloured.webp`}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="p_item_text">
                              {trans("CART_EMPTY_INFO")}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="pb-3 px-1 products_cart_list__all_items"
                            style={
                              cart_products.length > 3
                                ? { overflowY: "scroll", height: 420 }
                                : { overflowY: "initial", height: "auto" }
                            }
                          >
                            {cart_products.length !== 0 &&
                              cart_products.map((product, i) => {
                                return (
                                  <ProdCartListItem product_info={product} key={i} />
                                );
                              })}
                          </div>
                        )}
                      </div>

                      {cart_products.length !== 0 && (
                        <>
                          <div className="total p-1">
                            <span
                              className=" align-items-center"
                              style={{ fontFamily: "Poppins-Bold" }}
                            >
                              <b>Total</b>
                            </span>
                            <span
                              className=" align-items-center"
                              style={{ fontFamily: "Poppins-Bold" }}
                            >
                              <b>
                                €{" "}
                                {grandTotal
                                  ? grandTotal.toString().split(".").length > 1
                                    ? grandTotal.toString().split(".")[0] +
                                    trans("dot") +
                                    grandTotal.toString().split(".")[1]
                                    : grandTotal.toString().split(".")[0]
                                  : "0"}
                              </b>
                            </span>
                          </div>
                        </>
                      )}

                      <div className="p-2">
                        {cart_products.length != 0 ? (
                          <Link
                            className="btn btn-primary w-100 checkoutBtn"
                            style={{
                              backgroundColor: "#FFB4CC",
                              color: "#fff",
                            }}
                            to={`${process.env.PUBLIC_URL}/cart`}
                          >
                            {trans("Checkout")}
                          </Link>
                        ) : (
                          <Button
                            className="btn btn-primary w-100 checkoutBtn"
                            style={{
                              backgroundColor: "#FFB4CC",
                              color: "#fff",
                            }}
                            onClick={() => {
                              toast.warning(
                                trans("Please add items in cart first") + "!"
                              );
                            }}
                          >
                            {trans("Checkout")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container className="products_list_carts_wrapper">
                {categoryAllProducts == undefined
                  ? productsSkeleton.map((i, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                      <div style={{ padding: 5 }}>
                        <ProductCardSkeleton key={index + i} />
                      </div>
                    </Grid>
                  ))
                  : categoryAllProducts != null &&
                  categoryAllProducts.length > 0 &&
                  categoryAllProducts
                    .slice(
                      firstIndex + productsPerPage * (page - 1),
                      productsPerPage * page
                    )
                    .map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                        <ProductList.Provider
                          className="px-2"
                          value={{ ProductListState, ToogleProductListPage }}
                        >
                          <ProductCard
                            key={index + item.id}
                            product={item}
                            CustomizedButton={CustomButton}
                            page={"ProductList"}
                            setOpenItemAddedAlert={false}
                          />
                        </ProductList.Provider>
                      </Grid>
                    ))}
                {categoryAllProducts != undefined &&
                  (isCategoryProd === null ||
                    isCategoryProd === undefined ||
                    isCategoryProd === []) && (
                    <p
                      style={{
                        textTransform: "capitalize",
                        background: "#00000010",
                        width: "100%",
                        textAlign: "center",
                        padding: 20,
                      }}
                    >
                      {trans("No Products Found !!!")}
                    </p>
                  )}
              </Grid>

              <Pagination
                count={pageCount}
                page={page}
                variant="outlined"
                className={classes.ul}
                shape="rounded"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                  marginTop: 20,
                }}
                onChange={(event, value) => {
                  setPage(value);
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <Footer />
        <CopyRight />
      </div>
    </>
  );
};

export default main;
