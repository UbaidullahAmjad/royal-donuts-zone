/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {
    HomeSlide_GET_DATA,
} from '../../types';
import { URL } from '../../../env';
import { toast } from "react-toastify";

export const HomeCarouselGetData = (user_id) => {
    return async (dispatch) => {
        var carouselList = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        var data = {
            user_id,
        };

        await axios.get(`${URL}/carousel_setting`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            params: data,
        }).then((response) => {
            carouselList = response.data.carousel
            isError = false;
            dispatch({
                type: HomeSlide_GET_DATA,
                payload: {
                    carouselList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: HomeSlide_GET_DATA,
                payload: {
                    carouselList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



