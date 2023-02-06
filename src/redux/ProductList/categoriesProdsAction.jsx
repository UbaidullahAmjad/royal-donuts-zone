/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { GET_CATEGORIES_PRODUCTS } from '../types';
import { URL } from '../../env';

const categoriesProdsAction = (catId) => async (dispatch) => {
    var categoriesProds = null;
    var loading = false;
    var isError = false;
    var errorMessage = null;

    const catProdsBaseUrl = `${URL}/get_products_by_category`;
    const res = await axios.post(catProdsBaseUrl, { id: catId });
    const ress1 = res;
    if (ress1?.data) {
        dispatch({
            type: GET_CATEGORIES_PRODUCTS,
            payload: {
                categoriesProds: ress1,
                loading,
                isError: false,
                errorMessage
            }
        })
    }
}

export default categoriesProdsAction