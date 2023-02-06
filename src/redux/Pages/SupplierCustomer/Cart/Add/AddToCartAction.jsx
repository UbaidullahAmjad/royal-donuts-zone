/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../../env"

export const AddToCartAction = async (formData) => {
    let addToCartResponse = null;

    try {
        addToCartResponse = await axios
            .post(URL + "/cart/add", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        addToCartResponse = error.response;
    }

    return addToCartResponse;
};

