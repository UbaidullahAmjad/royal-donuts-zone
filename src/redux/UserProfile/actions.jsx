import * as actionTypes from "./actionTypes";
import instance from "../../Axios/Axios";
import { toast } from "react-toastify";

export const GetUserProfileData = (user_id) => {
  return async (dispatch) => {
    await instance({
      url: "/userdashboard",
      method: "GET",
      params: { user_id: user_id },
    })
      .then((response) => {
        dispatch({
          type: actionTypes.UserProfileData,
          payload: response.data.user,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, 4000);
      });
  };
};

export const UpdateProfile = (user_id, data, trans) => {
  const formData = new FormData();
  formData.append("id", user_id);
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append("address", data.address);
  formData.append("mobile_number", data.mobile_number);
  formData.append("zip_code", data.zip_code);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append("password", data.password);
  if (data.image != undefined) {
    formData.append("image", data.image);
  }
  return async (dispatch) => {
    await instance({
      url: "/proff",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        toast.success(trans(response?.data?.message), {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({
          type: actionTypes.UpdateUserProfile,
          payload: response?.data?.user,
        });
      })
      .catch((error) => {
        console.log("ERROR USER PROFILE DATA ------------", error);
      });
  };
};

export const TogglePasswordShow = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UserProfilePassword });
  };
};

export const ToggleConfirmPasswordShow = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UserProfileConfirmPassword });
  };
};
