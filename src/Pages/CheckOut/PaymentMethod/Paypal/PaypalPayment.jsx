/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import PaypalButtonWrapper from "./PaypalButtonWrapper";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { useSelector } from "react-redux";
import "./PaypalPayment.css";

// This values are the props in the UI
// const amount = 1;
const currency = "EUR";

const PaypalPayment = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const {
    FormData,
    setError,
  } = props;

  const formPushData = useSelector(
    (state) => state.checkoutForm.formDataPushed
  );

  const PaypalDataValues = props.PaypalData;

  const [Paypal_Client_ID, setPaypal_Client_ID] = useState(
    PaypalDataValues && PaypalDataValues.paypal_client_id
  );
  const [PaypalSecretKey, setPaypalSecretKey] = useState(
    PaypalDataValues && PaypalDataValues.paypal_secret_key
  );
  const [PaypalCurrency, setPaypalCurrency] = useState(
    PaypalDataValues && PaypalDataValues.currency
  );

  return (
    <>
      <ToastContainer />
      <div style={{ width: "100%" }}>
        {Paypal_Client_ID != null ? (
          <PayPalScriptProvider
            options={{
              "client-id": Paypal_Client_ID,
              components: "buttons",
              currency: "EUR",
            }}
          >
            <div className="row">
              <div
                className="col-12 px-2"
                style={{ overflow: "hidden", borderRadius: 8 }}
              >
                <div
                  className="paypal_button_wrapper_box"
                  style={{ marginTop: 10, width: "100%", marginLeft: 2 }}
                >
                  <PaypalButtonWrapper
                    className="paypal_button_wrapper"
                    FormData={FormData}
                    coupon_code={formPushData.coupon_code}
                    amount={formPushData.totalPayPrice}
                    discount={formPushData.couponCodeAmount}
                    currency={PaypalCurrency}
                    couponCodeSymbol={formPushData.couponCodeSymbol}
                    showSpinner={false}
                    trans={trans}
                  />
                </div>
              </div>
            </div>
          </PayPalScriptProvider>
        ) : (
          <div>
            <p>{trans("Paypal Client ID invalid")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PaypalPayment;
