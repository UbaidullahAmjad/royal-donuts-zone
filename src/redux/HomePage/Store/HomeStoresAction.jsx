/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { HomeStores_GET_DATA } from '../../types';
import { URL } from '../../../env';

export const HomeStoresAction = () => {
    return async (dispatch) => {
        var homeStoreData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/find-store-section`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            homeStoreData = response.data
            isError = false;
            dispatch({
                type: HomeStores_GET_DATA,
                payload: {
                    homeStoreData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: HomeStores_GET_DATA,
                payload: {
                    homeStoreData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};



