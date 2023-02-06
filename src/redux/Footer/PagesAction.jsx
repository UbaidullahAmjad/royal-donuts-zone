/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Pages_GET_DATA } from '../types';
import { URL } from '../../env';

export const PagesAction = () => {
    return async (dispatch) => {
        var pagesList = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/pages`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            pagesList = response.data
            isError = false;
            dispatch({
                type: Pages_GET_DATA,
                payload: {
                    pagesList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: Pages_GET_DATA,
                payload: {
                    pagesList,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



