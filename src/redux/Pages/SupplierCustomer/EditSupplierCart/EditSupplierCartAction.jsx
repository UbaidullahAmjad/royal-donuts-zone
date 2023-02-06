/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const NewCartModifyAction = async (supplier_id) => {
    let newCartModifyResponse = null;

    try {
        newCartModifyResponse = await axios
            .get(`${URL}/newcartmodify/${supplier_id}`, {
                params: {
                    id: atob(localStorage.getItem("user_id")),
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token123"),
                    },
                },
            });
    }
    catch (error) {
        newCartModifyResponse = error.response;
    }

    return newCartModifyResponse;
};

