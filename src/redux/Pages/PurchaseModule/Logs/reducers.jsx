/* eslint-disable no-unused-vars */
import {
    LOGS_LIST,
} from "../../../actionTypes";

const initialState = {
    backLogsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const LogsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case LOGS_LIST: {
            let allLogs = [];
            if (payload.response != null) {
                allLogs = payload.response.logs;
                allLogs.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allLogs.length;
            }
            return {
                ...state,
                backLogsList: allLogs,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        default: {
            return state;
        }
    }
}

export default LogsReducer;