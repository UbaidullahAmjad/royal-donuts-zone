/* eslint-disable no-unused-vars */
import * as actionTypes from "../types";

const initialState = {
  singleStoreContentList: [],
  storeContentData: null,
  url_field: "",
  loading: true,
  isError: false,
  errorMessage: null
};

const storeData = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SINGLE_STORE: {
      const tempStoreContentArr = state.singleStoreContentList;
      const currentStoreContent = payload.storeContentData;
      if (payload.isError == false) {
        if (payload.url_field != null) {
          const storeContent = {
            single_store: currentStoreContent?.store ?? null,
            store_days: currentStoreContent?.store_days ?? [],
            store_image_gallery: currentStoreContent?.store_gallery ?? [],
            store_seo: currentStoreContent?.store_seo ?? null,
            insta_token: currentStoreContent?.store?.instagram_token ?? "",
            url_field: payload.url_field,
          }
          tempStoreContentArr.push(storeContent)
        }
      }
      return {
        ...state,
        singleStoreContentList: tempStoreContentArr,
        url_field: payload.url_field,
        loading: payload.loading,
        isError: payload.isError,
        errorMessage: payload.errorMessage,
      }
    }
    default:
      return state;
  }
};

export default storeData;
