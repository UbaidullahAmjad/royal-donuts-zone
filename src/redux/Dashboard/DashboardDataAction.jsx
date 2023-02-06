/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {
    PageContent_LOAD_DATA,
    Dashboard_GET_DATA,
    Dashboard_LOGOUT,
    Dashboard_SAVE_DATA,
    Dashboard_Save_BtnLoading
} from '../types';
import { URL } from '../../env';
import { toast } from "react-toastify";

export const DashboardDataAction = (user_id) => {
    return async (dispatch) => {
        var dashboardData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        var data = {
            user_id,
        };

        await axios.get(`${URL}/userdashboard`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            params: data,
        }).then((response) => {
            localStorage.setItem("name", response?.data?.user?.name); // Setting name in localhost
            dashboardData = response.data
            isError = false;
            dispatch({
                type: PageContent_LOAD_DATA,
                payload: {
                    dashboardData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            isError = true;
            errorMessage = error.response
            dispatch({
                type: PageContent_LOAD_DATA,
                payload: {
                    dashboardData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const Dashboard_SaveDataAction = (formData) => {
    return async (dispatch) => {
        var dashboardData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            url: `${URL}/proff`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            data: formData,
        }).then((response) => {
            if (response.data.success == "true") {
                if (response.data.message) {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.success("successful", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                localStorage.setItem("name", response?.data?.user?.name); // Setting name in localhost
                dashboardData = response.data
                isError = false;
                dispatch({
                    type: Dashboard_SAVE_DATA,
                    payload: {
                        dashboardData,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }).catch((error) => {
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            isError = true;
            errorMessage = error.response
            dispatch({
                type: Dashboard_SAVE_DATA,
                payload: {
                    dashboardData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const DashboardLoaderSet = () => {
    return ({
        type: Dashboard_Save_BtnLoading,
        payload: {
            saveBtnLoading: true,
        }
    })
}

export const DashboardLogoutAction = () => {
    return ({
        type: Dashboard_LOGOUT,
    })
}


