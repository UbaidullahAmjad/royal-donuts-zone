/* eslint-disable no-unused-vars */
import {
    PageContent_LOAD_DATA,
    Dashboard_GET_DATA,
    Dashboard_LOGOUT,
    Dashboard_SAVE_DATA,
    Dashboard_Save_BtnLoading
} from '../types';

const initialState = {
    dashboardData: null,
    dashboardDataLength: 1,
    tempArrLength: 1,
    loading: true,
    saveBtnLoading: false,
    isError: false,
    errorMessage: null
}

const DashboardDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PageContent_LOAD_DATA:
            let allDasboardData = null;
            const user = payload.dashboardData?.user ?? null;
            const delivered_orders = payload.dashboardData?.delivered_orders ?? [];
            const open_orders = payload.dashboardData?.open_orders ?? [];
            if (delivered_orders.length > 0) {
                delivered_orders.map((item, index) => (item["index"] = index + 1));
            }
            if (open_orders.length > 0) {
                open_orders.map((item, index) => (item["index"] = index + 1));
            }
            allDasboardData = {
                user,
                delivered_orders,
                open_orders,
            }
            state.dashboardDataLength = 1;
            state.tempArrLength = 1;
            state.saveBtnLoading = false;
            return {
                ...state,
                dashboardData: allDasboardData,
                dashboardDataLength: state.dashboardDataLength,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                saveBtnLoading: state.saveBtnLoading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        case Dashboard_LOGOUT: {
            return initialState;
        }
        case Dashboard_Save_BtnLoading: {
            return {
                ...state,
                saveBtnLoading: payload.saveBtnLoading,
            };
        }
        case Dashboard_SAVE_DATA: {
            if (payload.isError == false) {
                state.tempArrLength = state.tempArrLength + 1;
            }
            state.saveBtnLoading = false;
            return {
                ...state,
                dashboardData: state.dashboardData,
                dashboardDataLength: state.dashboardDataLength,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                saveBtnLoading: state.saveBtnLoading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        default: {
            return state
        }
    }
}

export default DashboardDataReducer
