/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const InvoiceDataByIdAction = async (id) => {
    let invoiceDataByIdResponse = null;

    try {
        invoiceDataByIdResponse = await axios
            .get(`${URL}/new_order/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        invoiceDataByIdResponse = error.response;
    }

    return invoiceDataByIdResponse;
};

