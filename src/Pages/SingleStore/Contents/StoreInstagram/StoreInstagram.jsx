/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./StoreInstagram.css";
import { useTranslation, } from "react-i18next";
import axios from "axios";
import Slider from "react-slick";
import { Spinner } from "react-bootstrap";

const settings = {
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
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

const Instagram = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { instagramToken, limit, Loading } = props;
  const [feeds, setFeedsData] = useState([]);
  //use useRef to store the latest value of the prop without firing the effect
  const tokenProp = useRef(instagramToken);
  tokenProp.current = instagramToken;

  console.log("tokenProp.current", instagramToken);

  const [InstaError, setInstaError] = useState(null);

  useEffect(() => {
    // this is to avoid memory leaks
    const abortController = new AbortController();

    async function fetchInstagramPost() {
      var config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      try {
        axios
          .get(
            `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${limit}&access_token=${instagramToken}`,
            config
          )
          .then((resp) => {
            setFeedsData(resp.data.data);
          });
      } catch (err) {
        console.log("instagram-media-error", err);
      }
    }

    // manually call the fecth function
    if (instagramToken != null) {
      fetchInstagramPost();
    }

    // instaTest()

    return () => {
      // cancel pending fetch request on component unmount
      abortController.abort();
    };
  }, [limit, instagramToken]);

  const instaTest = async () => {
    await axios
      .get(
        `https://api.instagram.com/v1/users/self/media/recent/?access_token=${tokenProp.current}`
      )
      .then((response) => {
        // console.log("iiiiiiiii-rrrrr", response);
      })
      .catch((err) => {
        console.log("insta-err", err.response);
      });
  };

  /** 
     * 
     instagram-feeds: { id, caption, media_type, media_url }
     * 
     */
  return (
    <>
      {/* {feeds.map((feed) => (
                <Feed key={feed.id} feed={feed} />
            ))} */}

      {Loading == false ? (
        instagramToken != null && feeds && feeds.length > 0 && (
          <Slider {...settings}>
            {feeds.map((item) => (
              <div className="store_instagram_media_image_box">
                <img
                  className="img-fluid"
                  id={item.id}
                  src={item.media_url}
                  alt={item.caption}
                />
              </div>
            ))}
          </Slider>
        )
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 15 }}
        >
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </>
  );
};

export default Instagram;
