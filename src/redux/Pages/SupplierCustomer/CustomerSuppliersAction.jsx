/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../env"


export const SupplierDataAction = async () => {
    let supplierDataResponse = null;

    try {
        supplierDataResponse = await axios.get(`${URL}/suppliers`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        });;
    }
    catch (error) {
        supplierDataResponse = error.response;
    }

    return supplierDataResponse;
};


export const SupplierDetailAction = async (supplier_id) => {
    let supplierDetailResponse = null;

    try {
        supplierDetailResponse = await axios
            .get(
                `${URL}/supplierdetails/${supplier_id}/${atob(localStorage.getItem("user_id"))}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token123"),
                    },
                }
            );
    }
    catch (error) {
        supplierDetailResponse = error.response;
    }

    return supplierDetailResponse;
};

