/* eslint-disable no-unused-vars */
import {
    ZELTY_SETTINGS_GET_DATA,
    ZELTY_SETTINGS_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    zeltySettings: null,
    zeltySettingsLength: 1,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const ZeltySettingsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ZELTY_SETTINGS_GET_DATA: {
            let zeltySettingsData = "";
            if (payload.response != null) {
                zeltySettingsData = payload.response;
                state.tempArrLength = 1;
            }
            return {
                ...state,
                zeltySettings: zeltySettingsData,
                zeltySettingsLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ZELTY_SETTINGS_SAVE_DATA: {
            let newTempArrLength = state.zeltySettingsLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                zeltySettings: state.zeltySettings,
                zeltySettingsLength: 1,
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

export default ZeltySettingsReducer;