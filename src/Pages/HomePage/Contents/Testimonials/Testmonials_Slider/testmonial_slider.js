/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import logo_testimonial from "../../../../../assets/logo_testimonial.webp";
import Skeleton from "@mui/material/Skeleton";

const slider = (props) => {
  const [imagePath, setImagePath] = useState("");

  const [ImageLoaded, setImageLoaded] = useState(false);
  const [ImageLoadedError, setImageLoadedError] = useState(false);

  useEffect(() => {
    try {
      const image_src = require(`https://ecco.royaldonuts.xyz/storage/${props.user_image}`);
      setImagePath(image_src);
    } catch (err) {
      //Do whatever you want when the image failed to load here
      setImagePath(logo_testimonial);
    }
  }, [props.user_image]);

  return (
    <div>
      <img
        src={
          ImageLoadedError == false
            ? props.user_image == undefined || props.user_image == null
              ? logo_testimonial
              : `https://ecco.royaldonuts.xyz/storage/${props.user_image}`
            : logo_testimonial
        }
        style={
          ImageLoaded === false
            ? { display: "none" }
            : {
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "block",
            }
        }
        alt=""
        onLoad={() => setImageLoaded(true)}
        onError={() => (setImageLoaded(true), setImageLoadedError(true))}
      />
      {ImageLoaded === false && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={80}
          height={80}
          style={{
            borderRadius: "50%",
          }}
        />
      )}
      <div id="testimonial_content">
        <h1
          style={{
            fontFamily: "Poppins",
            marginBottom: 0,
            marginTop: 5,
            fontSize: 40,
          }}
        >
          {props.name != null && props.name}
        </h1>
        <p
          style={{ textAlign: "justify", fontFamily: "Poppins" }}
          dangerouslySetInnerHTML={{ __html: props.description }}
        >
        </p>
      </div>
    </div>
  );
};

export default slider;
