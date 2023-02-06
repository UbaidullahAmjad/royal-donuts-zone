import * as actionTypes from '../types';

const initialState = {
    settings : null
}

const getSettingsData = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.GET_SETTINGS: {
          if(action.data){
            return{
                ...state,
                settings: action.data
            }
          }
          else if(action.error)
          {
            return {
              ...state,
              error: action.error,
            }
          }
          }
          default:
            return state;
        }
    }
export default getSettingsData;