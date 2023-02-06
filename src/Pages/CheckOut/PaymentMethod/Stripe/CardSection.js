import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import "./Element.css";
import React from "react";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};
const CardSection = () => {
  return (
    <PaymentElement options={CARD_ELEMENT_OPTIONS} />
  );
};

export default CardSection;
