import * as actionTypes from "../actionTypes";

const initialState = {
    user_stores:[],
    selected_store: null,
  };

  const getStoresData = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_STORES: {
        console.log("PAYLOADDDD", action.payload.data);
        //throw new Error("GOT STORE REDUCER");
        return {
          ...state,
          user_stores: action.payload.data,
        
        };
      }
      default:
        return state;
    }
  };
  
  export default getStoresData;
  