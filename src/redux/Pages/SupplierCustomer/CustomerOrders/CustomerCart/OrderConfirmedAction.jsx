/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../../env"

export const OrderConfirmedAction = async (formData) => {
    let orderConfirmedResponse = null;

    try {
        orderConfirmedResponse = await axios({
            method: "post",
            url: `${URL}/order/confirmed`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            data: formData,
        });
    }
    catch (error) {
        orderConfirmedResponse = error.response;
    }

    return orderConfirmedResponse;
};