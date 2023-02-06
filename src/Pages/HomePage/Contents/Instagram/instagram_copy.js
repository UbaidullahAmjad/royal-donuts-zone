/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./instagram.css";
import { useTranslation, } from "react-i18next";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import axios from "axios";

const instagram = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { instagramToken } = props;
  const [instaValidToken, setInstaValidToken] = useState(true);
  const [InstagramMediaImages, setInstagramMediaImages] = useState([])

  const defaultInstaFeedToken =
    "IGQVJVSEwwbFNRX2c2eVdqZAUFfZAHdDOVVWdC1jMkFNLWw0VXRucjVINElwcmpYeDlNeGhtUVN1MDFvQjkyUjlZAeWVxSHRUc19mTE5QU2J1akI0VkM5UTNHSEo0V2R1Rk1NRzlLbDFzZAktOMU14TTdHTAZDZD";

  useEffect(() => {
    let instagram_media_url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${6}&access_token=${instagramToken}`;
    let instagram_media_url_2 = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instagramToken}`;
    // request.get(url + accessToken, function (err, res, body) {
    //   this.setState({ ...this.state, instagramData: JSON.parse(body).data })
    // })
    axios.get(instagram_media_url).then((response) => {
      setInstagramMediaImages(response.data.data)
    }).catch((error) => {
      console.log("instagram-media-response-error", error.response)
    })
  }, [])

  const userInstaFeed = new Instafeed({
    get: "user",
    target: "insta_all_images",
    resolution: "standard_resolution",
    limit: 6,
    filter: function (image) {
      // const allImages = {image, ...image};
      // console.log("InstaFeed:----", allImages)

      // ensure the filter doesn't reject any images
      // return image.type === 'image'; //display only images
      return true;
    },
    success: function () {
      setInstaValidToken(true);
    },
    error: function () {
      setInstaValidToken(false);
      // alert('error')
    },
    accessToken: props.instagramToken
      ? props.instagramToken
      : defaultInstaFeedToken,
  });
  console.log(props.instagramToken);
  // Default:- accessToken: 'IGQVJVSEwwbFNRX2c2eVdqZAUFfZAHdDOVVWdC1jMkFNLWw0VXRucjVINElwcmpYeDlNeGhtUVN1MDFvQjkyUjlZAeWVxSHRUc19mTE5QU2J1akI0VkM5UTNHSEo0V2R1Rk1NRzlLbDFzZAktOMU14TTdHTAZDZD'

  useEffect(() => {
    userInstaFeed.run(); // Display Media from Instagram.
  }, [userInstaFeed]);

  return (
    <>
      {instagramToken && instagramToken != "" && (
        <div container id="insta_all_images">
          {/* All Instagram Images Display Here */}
        </div>
      )}
      {/* instaValidToken === false */}
      {
        (!instagramToken || instagramToken == "") && (
          <Stack
            sx={{ width: "100%" }}
            style={{ alignItems: "center" }}
            spacing={2}
          >
            <Alert icon={false} severity="error">
              <h6 style={{ letterSpacing: "2px", fontWeight: "bold" }}>
                {trans("Your Instagram Token is Invalid")}.
              </h6>
            </Alert>
          </Stack>
        )
      }
    </>
  );
};

export default instagram;
