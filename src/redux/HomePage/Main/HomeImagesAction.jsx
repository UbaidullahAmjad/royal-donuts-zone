/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { HomeImages_GET_DATA } from '../../types';
import { URL } from '../../../env';

export const HomeImagesAction = () => {
    return async (dispatch) => {
        var homeImagesToken = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        axios.get(`${URL}/gethomeimages`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            const token = response.data.data[0].token;
            homeImagesToken = token;
            isError = false;
            dispatch({
                type: HomeImages_GET_DATA,
                payload: {
                    homeImagesToken,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: HomeImages_GET_DATA,
                payload: {
                    homeImagesToken,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



