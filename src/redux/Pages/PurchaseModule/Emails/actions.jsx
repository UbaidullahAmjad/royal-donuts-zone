/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    EMAILS_LIST,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const EmailsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/emailhistory`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: EMAILS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: EMAILS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};


