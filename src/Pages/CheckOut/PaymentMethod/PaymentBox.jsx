/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Form } from "react-bootstrap";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link, useNavigate } from "react-router-dom";
import Element from "./Stripe/Element";
import PaypalPayment from "./Paypal/PaypalPayment";
import { useTranslation, } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { Button } from "react-bootstrap";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { Spinner } from "react-bootstrap";

import { checkoutFormSubmittedData } from "../../../redux/CheckOut/checkOutFormAction";
import { toast } from "react-toastify";

import getWindowDimensions from "../../../Components/Hooks/useWindowDimensions";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { URL } from "../../../env";

const PaymentBox = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const [stripeDetail, setStripeDetail] = useState(null);

  const navigate = useNavigate();
  const { setError, } = props;
  // const { sendDetail } = props;

  const [open, setOpen] = useState("1");

  const [PaypalData, setPaypalData] = useState(null);
  const [isPaypalActive, setIsPaypalActive] = useState(true);

  const { screenWidth } = getWindowDimensions();

  const dispatch = useDispatch();
  useEffect(() => {
    const getPaypalData = async () => {
      await axios
        .get(`${URL}/get_paypal_payment`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          // console.log("getPaypalData-response:", response);
          const data = response.data.data;
          if (response.data != null) {
            setPaypalData(data);
            let is_active = true;
            if (data.isActive == 1) {
              is_active = true;
            } else {
              is_active = false;
            }
            setIsPaypalActive(is_active);
          }
        });
    };
    if (PaypalData == null) {
      getPaypalData();
    }
  }, []);

  useEffect(() => {
    const getStripeDetail = () => {
      axios
        .get(`${URL}/get_stripe_payment`)
        .then((response) => {
          // console.log("responssss", response);
          setStripeDetail(response.data.data);
        });
    };
    if (stripeDetail == null) {
      getStripeDetail();
    }
  }, []);

  const handle = useSelector((state) => state.checkoutForm);
  let cart_products = useSelector((state) => state.myProductsCart?.cartItems);


  const Toggle = (id) => {
    setOpen(id.toString());
  };


  const button_submit_ref = useRef();

  const [LoadingState, setLoadingState] = useState(false);

  const onSubmit = (data) => {
    if (cart_products == undefined) {
      toast.error(trans("Your Cart List is Empty !!"));
    } else {
      data["type"] = props.type;
      dispatch(checkoutFormSubmittedData(data));
      button_submit_ref?.current?.handleSubmit();
    }
  };

  function handleLoadingChange(newValue) {
    setLoadingState(newValue);
  }

  return (
    <div className="co__payment_box mb-3 mt-3" style={{ width: "100%" }}>
      <Accordion open={open} toggle={Toggle}>
        {stripeDetail != null && stripeDetail.isActive == 1 && (
          <AccordionItem>
            <AccordionHeader targetId="1">
              {/* <Form.Check
                type="radio"
                id="credit_card"
                label="Credit Card"
                name="payment"
                defaultChecked={true}
                // checked={true}
                onChange={() => Toggle(1)}
                value={open}
              ></Form.Check> */}
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="1"
                  name="radio-buttons-group"
                  value={open}
                  onChange={() => Toggle(1)}
                >
                  <FormControlLabel
                    className="radio_with_label"
                    value="1"
                    control={<Radio />}
                    label="Credit Card"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <Element
                stripeDetail={stripeDetail}
                setError={setError}
                ref={button_submit_ref}
                LoadingInvoice={handleLoadingChange}
                trans={trans}
              />
            </AccordionBody>
          </AccordionItem>
        )}
        {PaypalData != null && isPaypalActive == true && (
          <AccordionItem>
            <AccordionHeader targetId="2">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={open}
                  onChange={() => Toggle(2)}
                >
                  <FormControlLabel
                    className="radio_with_label"
                    value="2"
                    control={<Radio />}
                    label="Paypal"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <div className="d-flex justify-content-center">
                <OpenInBrowserIcon style={{ fontSize: "10pc" }} />
              </div>
              <div className="d-flex justify-content-center">
                <p style={{ width: "28pc" }}>{trans("PayPal purchase")}</p>
              </div>
            </AccordionBody>
          </AccordionItem>
        )}
      </Accordion>

      <div className="col-md-12 col-lg-12">
        <div className="row">
          <div className="col-12" style={{ padding: "0px 15px" }}>
            {open == 2 ? (
              <>
                <PaypalPayment PaypalData={PaypalData} />
              </>
            ) : (
              <Button
                onClick={
                  // () => button_submit_ref?.current?.getOnSubmit()
                  LoadingState != true && handle.handle_submit != null && handle.handle_submit(onSubmit)
                }
                className="checkout_paynow_btn "
                style={{ letterSpacing: "0px", cursor: LoadingState != true ? "pointer" : "text" }}
              >
                {trans("Proceed To Invoice")}
                {LoadingState == true && (
                  <div className="checkout_paynow_btn_spinner">
                    <Spinner animation="border" variant="dark" style={{ height: 18, width: 18 }} />
                  </div>
                )}
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentBox;
