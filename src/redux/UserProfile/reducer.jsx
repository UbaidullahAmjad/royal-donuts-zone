import * as ActionTypes from "./actionTypes";

const initialState = {
  user_data: null,
  user_data_name: null,
  user_data_image: null,
  user_password: false,
  user_confirm_password: false,
};

const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UserProfileData:
      return {
        ...state,
        user_data: action.payload,
      };
    case ActionTypes.UpdateUserProfile:
      var updated_user_data = state.user_data;
      updated_user_data.first_name = action.payload.first_name;
      updated_user_data.last_name = action.payload.last_name;
      updated_user_data.name = action.payload.name;
      updated_user_data.address = action.payload.address;
      updated_user_data.mobilenumber = action.payload.mobilenumber;
      updated_user_data.zip_code = action.payload.zip_code;
      updated_user_data.city = action.payload.city;
      updated_user_data.country = action.payload.country;
      updated_user_data.image = action.payload.image;
      return {
        ...state,
        user_data: updated_user_data,
        user_data_name: updated_user_data.name,
        user_data_image: updated_user_data.image,
      };
    case ActionTypes.UserProfilePassword:
      return {
        ...state,
        user_password: !state.user_password,
      };

    case ActionTypes.UserProfileConfirmPassword:
      return {
        ...state,
        user_confirm_password: !state.user_confirm_password,
      };

    default:
      return state;
  }
};

export default UserProfileReducer;
