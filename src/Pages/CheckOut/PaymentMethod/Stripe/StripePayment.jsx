/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Element.css";
import axios from "axios";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteFullCart } from "../../../../redux/CartPage/myCartAction";
import {
  checkoutFormFill,
  checkoutFormSubmit,
} from "../../../../redux/CheckOut/checkOutFormAction";
import store from "../../../HomePage/Contents/Store/store";
import { URL } from "../../../../env";
import { StripePaymentInvoiceAction } from "../../../../redux/CheckOut/PaymentMethod/Stripe/StripePaymentAction"
import { StripeEmailCheckAction, ClearStripeEmailCheckAction } from "../../../../redux/CheckOut/PaymentMethod/Stripe/StripeEmailCheckAction"

const StripePayment = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { setError } = props;

  const Stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handle = useSelector((state) => state.checkoutForm);

  let cart_products = useSelector((state) => state.myProductsCart?.cartItems);
  let cartGrandTotal = useSelector(
    (state) => state.myProductsCart?.cartGrandTotal
  );

  const formDataPushed = useSelector(
    (state) => state.checkoutForm.formDataPushed
  );
  const [products, setProducts] = useState([]);
  const store = useSelector((state) => state.checkoutForm.store);
  const stripeEmailCheckResp = useSelector((state) => state.getStripeEmailCheck.stripeEmailCheckResponse);

  const getStripeInvoiceData = useSelector((state) => state.getStripeData);
  const stripeResponseError = getStripeInvoiceData.isError;
  const stripeAllData = getStripeInvoiceData.stripeAllData;
  const isZeltyInvoice = getStripeInvoiceData.isZeltyInvoice;
  const zelty_res_data = getStripeInvoiceData.zelty_res_data;
  const stripeInvoiceData = getStripeInvoiceData.stripeInvoiceData;

  useEffect(() => {
    if (stripeResponseError == false && stripeInvoiceData != null) {
      props.LoadingInvoice(false);

      const user = stripeInvoiceData?.user;
      const order = stripeInvoiceData?.order;
      const orderItems = stripeInvoiceData?.order_items;
      const user_role = stripeInvoiceData?.user_role;
      const address = handle?.form_submitted_data?.address;
      const user_new_info = stripeInvoiceData?.user_order_information;
      const symbol = stripeInvoiceData?.symbol;

      navigate(`/invoice`, {
        state: {
          cardData: null,
          order,
          orderItems,
          user,
          user_role,
          address,
          delivery_info_data: formDataPushed.delivery_info,
          isDefaultValues:
            handle?.form_submitted_data?.isDefaultValues != undefined
              ? handle?.form_submitted_data?.isDefaultValues
              : false,
          user_new_info,
          symbol: formDataPushed.couponCodeSymbol,
          isInvoice: true,
          zelty_res_data: isZeltyInvoice == true ? zelty_res_data : true,
          store_id: store?.id,
          allData: stripeAllData,
        },
        replace: true,
      });
      dispatch(deleteFullCart());
    } else {
      props.LoadingInvoice(false);
    }
  }, [stripeInvoiceData])


  useEffect(() => {
    let tempProds = [];
    cart_products.map((item) =>
      tempProds.push({
        id: item.id,
        name_fr: item?.product_detail?.name_fr,
        price_euro: item?.price,
        quantity: item.quantity,
        unit_price: item.itemQtyTotal,
        ingredients_glazes: item.glaze?.length > 0 ? item.glaze[0].name : false,
        ingredients_toppings:
          item.topping?.length > 0
            ? item?.topping.map((top) => top.name)
            : false,
        ingredients_sauces:
          item?.sauce?.length > 0 ? item.sauce[0].name : false,
        ingredients_fillings:
          item?.filling?.length > 0 ? item?.filling[0].name : false,
      })
    );
    setProducts(tempProds);
  }, [cart_products]);

  const handleSubmit = async () => {
    // data.preventDefault();
    setLoading(true);
    props.LoadingInvoice(true);

    if (formDataPushed?.user_id == null) {
      const StripeEmailCheckActionCall = await StripeEmailCheckAction(handle?.form_submitted_data?.contact);

      if (StripeEmailCheckActionCall?.data?.success == true) {
        PaymentWithInvoice();
        dispatch(ClearStripeEmailCheckAction())
      } else {
        props.LoadingInvoice(false);

        if (StripeEmailCheckActionCall?.data?.error == true) {
          toast.error(trans("email already exists"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setError(
            "contact",
            { type: "string", message: trans("email already exists") },
            { shouldFocus: true }
          );
        }
        dispatch(ClearStripeEmailCheckAction())
      }
    } else {
      PaymentWithInvoice();
    }
  };

  const PaymentWithInvoice = () => {
    StripePayment().then((stripe_response) => {
      if (stripe_response?.error) {
        props.LoadingInvoice(false);
        toast.error(trans(stripe_response?.error?.message), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        props.LoadingInvoice(true);
        let payment_method = "card";
        let allData = [];
        const tempFormData = {
          ...handle?.form_submitted_data,
          ...formDataPushed,
          coupon_code: formDataPushed.coupon_code,
          products: JSON.stringify(products),
          total: cartGrandTotal,
          grand_total: formDataPushed.totalPayPrice,
          discount: formDataPushed.couponCodeAmount,
          item_count: cart_products.length,
          store_id: store?.id,
        };
        allData.push(tempFormData);
        allData.push(payment_method);

        proceedToInvoice(allData);
      }
    });
  };

  const StripePayment = async () => {
    var stripe_response = await Stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/invoice`,
      },
      redirect: "if_required",
    });
    return stripe_response;
  };

  const proceedToInvoice = (allData) => {
    props.LoadingInvoice(true);

    dispatch(StripePaymentInvoiceAction(allData, null));
  };

  useImperativeHandle(props.forwardedRef, () => ({
    handleSubmit,
    getFormSubmit() {
      return handleSubmit;
    },
    getLoadingState() {
      return loading;
    },
  }));

  useImperativeHandle(
    props.forwardedRef,
    () => ({
      getLoadingState() {
        return loading;
      },
    }),
    [loading]
  );

  return (
    <>
      <div>
        <div>
          <CardSection />
        </div>
      </div>
    </>
  );
};

export default StripePayment;
