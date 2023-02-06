/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import "./store.css";
import { useTranslation, } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import { URL } from "../../../../env";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeStoresAction } from "../../../../redux/HomePage/Store/HomeStoresAction"

const store = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blue = {
    500: "#F36292",
    600: "#C25C7C",
    700: "#C25C7C",
  };

  const storeDescription = useSelector((state) => state.getHomeStores.homeStoreData?.description ?? "");

  useEffect(() => {
    if (storeDescription == "" || storeDescription == null) {
      dispatch(HomeStoresAction());
    }
  }, []);

  const CustomButtonRoot = styled("button")`
    font-family: JellyDonuts;
    font-size: 16px;
    /* font-size: 32px; */
    font-weight: bold;
    background-color: ${blue[500]};
    padding: 5px 24px;
    border-radius: 25px;
    margin-right: 10px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;

    &:hover {
      background-color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.active} {
      background-color: ${blue[700]};
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

  const [ImageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid className="store_upper_title">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <img src="/images/product_left_design.webp" height={20} alt="" />
              <h1 id="store_title">{trans("About")}</h1>
              <img src="/images/product_right_design.webp" height={20} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <h1 id="store_text">{trans("Store!")}</h1>
            </div>
          </Grid>
          <Grid className="store_uppder_inner"></Grid>
        </Grid>
        <Grid container className="store_section">
          <Grid className="main_image_div">
            <div>
              <div>
                <img
                  src="/images/store.webp"
                  id="store_img"
                  style={
                    ImageLoaded === false
                      ? { display: "none" }
                      : { width: "100%" }
                  }
                  alt=""
                  onLoad={() => setImageLoaded(true)}
                />
                {ImageLoaded === false && (
                  <Skeleton
                    id="store_img"
                    className="me-3"
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={280}
                  />
                )}
              </div>
            </div>
          </Grid>
          <Grid className="store_bottom">
            <div>
              <div id="store_desc_title">
                <h1 id="desc_title_text">Royal</h1>
                <h1 id="desc_title_text">{trans("Store Location")}</h1>
              </div>
              <div>
                <p
                  className="mt-2 mb-2"
                  style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
                  id="store_desc"
                  dangerouslySetInnerHTML={{ __html: storeDescription }}
                >
                  {/* Plus de 90 magasins dans toute l'Europe. Dans le localisateur
                  de magasins, vous pouvez voir toutes les heures d'ouverture et
                  les adresses en un coup d'œil. Trouver un magasin */}
                  {/* {storeDescription} */}
                </p>
              </div>
              <div className="find-store">
                <CustomButton
                  id="find_store"
                  onClick={() => navigate("/points-vente")}
                >
                  {trans("Find Store")}
                </CustomButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default store;
