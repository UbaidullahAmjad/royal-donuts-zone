/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../../env";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { getPaypalEccomCartAction, PaypalPaymentInvoiceAction, } from "../../../../redux/CheckOut/PaymentMethod/Paypal/PaypalPaymentAction";

// This values are the props in the UI
// const amount = 1;
const currency = "EUR";
const style = { layout: "horizontal", height: 45 };

// Custom component to wrap the PayPalButtons and handle currency changes
const PaypalButtonWrapper = ({
    FormData,
    coupon_code,
    discount,
    couponCodeSymbol,
    amount,
    currency,
    showSpinner,
    trans,
}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();

    let cart_products = useSelector((state) => state.myProductsCart?.cartItems);
    let cartGrandTotal = useSelector(
        (state) => state.myProductsCart?.cartGrandTotal
    );

    const handle = useSelector((state) => state.checkoutForm);
    const formPushData = useSelector(
        (state) => state.checkoutForm.formDataPushed
    );
    const reduxFormData = useSelector((state) => state.checkoutForm.formData);

    const [products, setProducts] = useState([]);

    const reduxDispatch = useDispatch();

    const paypalInvoiceData = useSelector((state) => state.getPaypalData.paypalInvoiceData);

    useCallback(
        () =>
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            }),
        [currency, options]
    );

    useEffect(() => {
        if (paypalInvoiceData?.order != null) {
            let user = paypalInvoiceData.user;
            let order = paypalInvoiceData.order;
            let orderItems = paypalInvoiceData.order_items;
            let user_role = paypalInvoiceData.user_role;
            let address = paypalInvoiceData.address;
            let user_new_info = paypalInvoiceData.user_order_information;
            let symbol = paypalInvoiceData.symbol;

            navigate(`/invoice`, {
                state: {
                    cardData: paypalInvoiceData.cardData,
                    order,
                    orderItems,
                    user,
                    user_role,
                    isDefaultValues: paypalInvoiceData.allData.isDefaultValues,
                    user_new_info,
                    symbol: paypalInvoiceData.allData.couponCodeSymbol,
                    allData: paypalInvoiceData.allData,
                    isInvoice: true,
                },
                replace: true,
            });
        }
    }, [paypalInvoiceData]);

    useEffect(() => {
        let tempProds = [];
        cart_products.map((item) =>
            tempProds.push({
                id: item.id,
                name_fr: item?.product_detail?.name_fr,
                price_euro: item?.price,
                quantity: item.quantity,
                unit_price: item.itemQtyTotal,
            })
        );
        setProducts(tempProds);
    }, [currency, showSpinner]);

    const goToInvoice = async (allData) => {
        const cardData = "Paypal";

        reduxDispatch(PaypalPaymentInvoiceAction(allData, cardData));
    };

    useEffect(() => {
    }, [paypalInvoiceData])

    const store = useSelector((state) => state.checkoutForm.store);
    const eccom_cart_items = useSelector((state) => state.getPaypalData.eccomCartData);

    let myForm = null;

    let paypal_123 = false;

    const onError = (errors, e) => {
        if (Object.keys(errors).length != 0) {
            paypal_123 = false;
            myForm = null;
        }
    };

    const onSubmit = (data) => {
        paypal_123 = true;
        myForm = data;
    };

    return (
        <>
            <ToastContainer />
            {isPending === true && (
                <Spinner
                    animation="border"
                    variant="dark"
                    style={{ display: "block", margin: "auto" }}
                />
            )}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency]}
                fundingSource="paypal"
                onClick={handle.handle_submit(onSubmit, onError)}
                onInit={(data, actions) => {
                    if (paypal_123) {
                        actions.disable();
                    } else {
                        actions.enable();
                    }
                }}
                createOrder={(data, actions) => {
                    if (paypal_123) {
                        if (cart_products.length != 0) {
                            return actions.order
                                .create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: currency,
                                                value: amount,
                                            },
                                        },
                                    ],
                                })
                                .then((orderId) => {
                                    // Your code here after create the order
                                    return orderId;
                                });
                        } else {
                            toast.error(trans("Your Cart List is Empty !!"), {
                                position: "top-right",
                                autoClose: 3000,
                            });
                        }
                    }
                }}
                onApprove={function (data, actions) {
                    if (amount) {
                        return actions.order.capture().then(function () {
                            // Your code here after capture the order
                            const PaypalFromDta = {
                                ...myForm,
                                ...formPushData,
                                payment_method: "Paypal",
                                coupon_code: coupon_code,
                                products: JSON.stringify(products),
                                total: cartGrandTotal,
                                grand_total: amount,
                                discount: discount,
                                item_count: cart_products.length,
                                store_id: store?.id,
                            };
                            const allData = [];
                            allData.push(PaypalFromDta);
                            const payment_method = "paypal";
                            allData.push(payment_method);

                            var config = {
                                method: "get",
                                url: `${URL}/eccom_cart`,
                            };

                            axios(config)
                                .then(async (response) => {
                                    const cart_items = response.data.products;
                                    if (cart_items) {
                                        goToInvoice(allData);
                                    } else {
                                        toast.error(trans("Your Cart List is Empty !!"));
                                    }
                                })
                                .catch(function (error) {
                                    toast.error(trans("Your Cart List is Empty !!"));
                                });
                        });
                    }
                }}
            />
        </>
    );
};

export default PaypalButtonWrapper