/* eslint-disable no-unused-vars */
import axios from 'axios';
import { ProductDetail_GET_DATA } from '../types';
import { URL } from '../../env';

export const ProductDetailGetDataAction = (slug) => {
    return async (dispatch) => {
        var prodDetailCurrData = null;
        var prod_slug = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/p/${slug}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            prodDetailCurrData = response.data
            isError = false;
            dispatch({
                type: ProductDetail_GET_DATA,
                payload: {
                    prodDetailCurrData,
                    prod_slug: slug,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: ProductDetail_GET_DATA,
                payload: {
                    prodDetailCurrData,
                    prod_slug,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



