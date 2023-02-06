/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import ProductDetailCard from "../../Components/ProductDetailCard/ProductDetailCard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import { URL, SIMPLE_URL } from "../../env";

const pink = {
  500: "#F36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 16px;
  margin-top: 2%;
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

const ProductDetail = (props) => {

  const URL_ProductImage = `${SIMPLE_URL}/images/Product`;

  const { t } = useTranslation();
  const trans = t;

  const { id } = useParams();

  const theme = useTheme();
  const large_mobile = useMediaQuery(theme.breakpoints.down("md"));

  const [ProductDescription, setProductDescription] = useState(null);
  const [ProductAllergen, setProductAllergen] = useState(null);
  const [ProductLayer, setProductLayer] = useState(null);
  const [ProductLayer2, setProductLayer2] = useState(null);

  useEffect(() => {
    axios
      .get(URL + "/api/p/" + id)
      .then((response) => {
        // setProduit(response.data);
        setProductDescription(response.data.product);
        setProductAllergen(response.data.allergen_product);
        setProductLayer(response.data.layers);
        setProductLayer2(response.data.product_layers);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [ListSpecialProducts, setListSpecialProducts] = useState([]);

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "7%" }}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#e8e8e8",
                    borderRadius: 20,
                    position: "relative",

                    padding: "90px 15px",
                  }}
                >
                  <img
                    src={
                      ProductDescription != null &&
                      SIMPLE_URL + "/images/Product/" + ProductDescription.image
                    }
                    style={{
                      minWidth: "233px",
                      maxWidth: "233px",
                      minHeight: "233px",
                      maxHeight: "233px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <div style={{ marginLeft: 20 }}>
                  <h1 style={{ color: "#EC607F" }}>
                    {ProductDescription != null && ProductDescription.name_fr}
                  </h1>

                  <h1 style={{ color: "#EC607F" }}>
                    €{" "}
                    {ProductDescription != null &&
                      ProductDescription.price_euro.toString().split(".").length >
                      1
                      ? ProductDescription.price_euro.toString().split(".")[0] +
                      trans("dot") +
                      ProductDescription.price_euro.toString().split(".")[1]
                      : ProductDescription.price_euro
                        .toString()
                        .split(".")[0]}{" "}
                  </h1>
                  {ProductDescription !== null &&
                    ProductDescription.description_fr != null &&
                    ProductDescription.description_fr != "null" && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: ProductDescription.description_fr,
                        }}
                      ></p>
                    )}

                  {ProductLayer2 != null &&
                    ProductLayer2[0].length > 0 &&
                    (large_mobile == false ? (
                      <div style={{ display: "flex", alignItems: "baseline" }}>
                        <h3
                          style={{
                            marginRight: "3pc",
                            width: "22%",
                            color: "#EC607F",
                          }}
                        >
                          {trans("Filling")}
                        </h3>
                        {ProductLayer2 != null &&
                          ProductLayer2.map((item, index) => (
                            <p key={index}>
                              {item.map((item2, index2) =>
                                item2.layer_id == "1"
                                  ? index2 > 0
                                    ? "," + item2.name_fr
                                    : item2.name_fr
                                  : ""
                              )}
                            </p>
                          ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          flexDirection: "column",
                        }}
                      >
                        <h3
                          style={{
                            marginRight: "3pc",
                            width: "22%",
                            color: "#EC607F",
                          }}
                        >
                          {trans("Filling")}
                        </h3>{" "}
                        {ProductLayer2 != null &&
                          ProductLayer2.map((item, index) => (
                            <p key={index} style={{ margin: 0, padding: 0 }}>
                              {item.map((item2, index2) =>
                                item2.layer_id == "1"
                                  ? index2 > 0
                                    ? "," + item2.name_fr
                                    : item2.name_fr
                                  : ""
                              )}
                            </p>
                          ))}
                      </div>
                    ))}
                  {ProductLayer2 != null &&
                    ProductLayer2[1].length > 0 &&
                    large_mobile == false ? (
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        {trans("Icing") /** Glaçage */}
                      </h3>
                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "2"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        {/* Glaçage */}
                        {trans("Icing")}
                      </h3>

                      {ProductLayer != null &&
                        ProductLayer.map((item2, index2) => (
                          <p>
                            {
                              item2.layer_id == "2"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            }
                          </p>
                        ))}

                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index} style={{ margin: 0, padding: 0 }}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "2"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  )}
                  {ProductLayer2 != null &&
                    ProductLayer2[2].length > 0 &&
                    large_mobile == false ? (
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        {/* Garniture */}
                        {trans("Garnish")}
                      </h3>
                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "3"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        {/* Garniture */}
                        {trans("Garnish")}
                      </h3>
                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index} style={{ margin: 0, padding: 0 }}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "3"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  )}
                  {ProductLayer2 != null &&
                    ProductLayer2[3].length > 0 &&
                    large_mobile == false ? (
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        {trans("Sauce")}
                      </h3>
                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "4"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          marginRight: "3pc",
                          width: "22%",
                          color: "#EC607F",
                        }}
                      >
                        Sauce
                      </h3>
                      {ProductLayer2 != null &&
                        ProductLayer2.map((item, index) => (
                          <p key={index} style={{ margin: 0, padding: 0 }}>
                            {item.map((item2, index2) =>
                              item2.layer_id == "4"
                                ? index2 > 0
                                  ? "," + item2.name_fr
                                  : item2.name_fr
                                : ""
                            )}
                          </p>
                        ))}
                    </div>
                  )}
                  <Link to="/points-vente">
                    <CustomButton>{trans("find_store")}</CustomButton>
                  </Link>
                  {ProductAllergen != null && ProductAllergen.length > 0 && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 40,
                        }}
                      >
                        <h5>{trans("Allergens")}:</h5>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          {ProductAllergen.map((item, index) => (
                            <img
                              src={SIMPLE_URL + "/images/Allergen/" + item.image}
                              style={{ width: "100%", height: "50px" }}
                              title={item.name_fr}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <hr></hr>
            <div>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Row>
                    {ListSpecialProducts.length > 0 &&
                      ListSpecialProducts.slice(0, 3).map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <ProductDetailCard key={item.id} product={item} />
                        </Grid>
                      ))}
                  </Row>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductDetail;
