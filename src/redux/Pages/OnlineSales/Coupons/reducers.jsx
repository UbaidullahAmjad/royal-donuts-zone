/* eslint-disable no-unused-vars */
import {
    COUPONS_LIST,
    COUPON_IS_ACTIVE,
    COUPON_DELETE,
    COUPONS_BULK_DELETE,
    COUPON_CREATE,
    COUPON_EDIT,
} from "../../../actionTypes";

const initialState = {
    couponsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const CouponsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case COUPONS_LIST: {
            let allCoupons = [];
            if (payload.response != null) {
                allCoupons = payload.response.coupons;
                allCoupons.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allCoupons.length;
            }
            return {
                ...state,
                couponsList: allCoupons,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case COUPON_IS_ACTIVE: {
            if (payload.prodId) {
                if (state.couponsList.length > 0 && payload.isError == false) {
                    state.couponsList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                couponsList: state.couponsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case COUPON_DELETE: {
            let deleted_data = state.couponsList
            if (payload.prodId) {
                if (state.couponsList.length > 0 && payload.isError == false) {
                    deleted_data = state.couponsList.filter((item) => item.id != payload.prodId);
                    deleted_data.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                couponsList: deleted_data,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case COUPONS_BULK_DELETE: {
            let bulk_deleted_items = state.couponsList
            if (payload.bulkIds) {
                if (state.couponsList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.couponsList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                couponsList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case COUPON_CREATE: {
            let newTempArrLength = state.couponsList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                couponsList: state.couponsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case COUPON_EDIT: {
            let newTempArrLength = state.couponsList.length;
            if (state.couponsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                couponsList: state.couponsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default CouponsReducer;