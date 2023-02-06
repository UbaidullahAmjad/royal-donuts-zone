/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./instagram.css";

const instagram = (props) => {
  const { instagramToken } = props;
  const [instaValidToken, setInstaValidToken] = useState(true);

  const defaultInstaFeedToken =
    "IGQVJVSEwwbFNRX2c2eVdqZAUFfZAHdDOVVWdC1jMkFNLWw0VXRucjVINElwcmpYeDlNeGhtUVN1MDFvQjkyUjlZAeWVxSHRUc19mTE5QU2J1akI0VkM5UTNHSEo0V2R1Rk1NRzlLbDFzZAktOMU14TTdHTAZDZD";

  const userInstaFeed = new Instafeed({
    get: "user",
    target: "insta_all_images",
    resolution: "standard_resolution",
    limit: 4,
    filter: function (image) {
      // ensure the filter doesn't reject any images
      // return image.type === 'image'; //display only images
      return true;
    },
    success: function () {
      setInstaValidToken(true);
    },
    error: function () {
      setInstaValidToken(false);
    },
    accessToken: props.instagramToken
      ? props.instagramToken
      : defaultInstaFeedToken,
  });

  useEffect(() => {
    if (Instafeed != undefined) {
      userInstaFeed.run(); // Display Media from Instagram.
    }
  }, [userInstaFeed]);

  return (
    <>
      {instagramToken && instagramToken != "" && (
        <div container id="insta_all_images">
          {/* All Instagram Images Display Here */}
        </div>
      )}
      {/* nstaValidToken == false */}
      {!instagramToken ||
        (instagramToken == "" && (
          <div
            style={{
              backgroundColor: "#00000010",
              padding: 10,
              marginTop: 5,
            }}
          >
            <span style={{ color: "red", fontSize: 14 }}>
              InstaFeed Token is Invalid !!
            </span>
          </div>
        ))}
    </>
  );
};

export default instagram;
