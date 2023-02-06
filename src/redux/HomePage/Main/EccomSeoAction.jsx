/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { EccomSEO_GET_DATA } from '../../types';
import { URL } from '../../../env';

export const EccomSeoAction = () => {
    return async (dispatch) => {
        var eccomSeoData = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        axios.get(`${URL}/eccom_seo`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            eccomSeoData = response.data
            isError = false;
            dispatch({
                type: EccomSEO_GET_DATA,
                payload: {
                    eccomSeoData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: EccomSEO_GET_DATA,
                payload: {
                    eccomSeoData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



