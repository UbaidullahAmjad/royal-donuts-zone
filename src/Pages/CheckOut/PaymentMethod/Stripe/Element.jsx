/* eslint-disable no-unused-vars */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import "./Element.css";
import React, { forwardRef, useEffect, useState } from "react";
import StripePayment from "./StripePayment";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../../../../env";

// const stripePromise = loadStripe(
//   "pk_test_51KiBtFH7M576r2FmkgHv8phmJFefx6cYNwmcqKz7uNhqkZJlxMHN4YhYZSF88swJ4leB9K3BL4JIZokvkfiHtnKF00k4usmkLK"
// ,{locale:'fr-FR'});

let stripe_client_id = null;
// console.log("stripe_key", stripe_client_id);

const Element = forwardRef((props, ref) => {
  const { setError, stripeDetail, store, PaymentType } = props;
  // const { FormData, coupon_code, couponCodeAmount, couponCodeSymbol, totalPayPrice,
  //    delivery_info, setError, date, stripeDetail } = props;

  const [pk, setPk] = useState();
  const [stripePromise, setStripePromise] = useState(null);

  const [ClientSecret, setClientSecret] = useState(null);

  const [PaymentOption, setPaymentOption] = useState(null);

  let cartGrandTotal = useSelector(
    (state) => state.myProductsCart?.cartGrandTotal
  );

  const options = {
    stripe_secret_key: `${stripeDetail.stripe_secret_key}`,
  };

  useEffect(() => {
    setTimeout(() => {
      setPk(stripeDetail.stripe_client_id);
    }, 3000);

    const GetPaymentIntent = async () => {
      // https://saas-ecommerce.royaldonuts.xyz/api/get_stripe_payment_intent
      // ${URL}/get_stripe_payment_intent
      await axios
        .post(
          `https://saas-ecommerce.royaldonuts.xyz/api/get_stripe_payment_intent`,
          {
            total_payment: cartGrandTotal,
          }
        )
        .then((response) => {
          if (response.data.success) {
            setClientSecret(response.data.client_secret);
          }
        })
        .catch((error) => {
          console.error("PAYMENT INTENT ----------", error);
        });
    };

    GetPaymentIntent();
  }, []);

  useEffect(() => {
    if (pk && !stripePromise) {

      setStripePromise(loadStripe(pk, { locale: props.trans(`Language`) }));

      props.LoadingInvoice(false);
    }
  }, [pk, stripePromise]);


  useEffect(() => {
    if (ClientSecret != null) {
      setPaymentOption({
        // passing the client secret obtained in step 2
        clientSecret: ClientSecret.toString(),
        // Fully customizable with appearance API.
        appearance: {},
      });
    }
  }, [ClientSecret]);

  return (
    <>
      <ToastContainer />
      {PaymentOption != null && (
        <Elements stripe={stripePromise} options={PaymentOption}>
          <StripePayment
            setError={setError}
            store={store}
            forwardedRef={ref}
            clientSecret={ClientSecret}
            LoadingInvoice={props.LoadingInvoice}
          />
        </Elements>
      )}
    </>
  );
});

export default Element;
