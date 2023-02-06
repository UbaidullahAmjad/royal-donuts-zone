import * as ActionTypes from "./Carousel_action_types";

import { v4 as uuidv4 } from "uuid";

export const AddCarousel = (data, ImagePath, local) => {
  // console.log("ADD CAROUSEL DATAAAAAAAAAAAaa --------", data);
  // throw new Error("Add CAROUSEL DATAAAAAAAAA");
  const carousel_data = new Object();
  if (local == true) {
    carousel_data["id"] = data?.id;
    carousel_data["image"] = data.slider_image;
    if (ImagePath != null) {
      carousel_data["image_temp_path"] = ImagePath?.previewUrl;
    }
    carousel_data["first_heading"] = data.slider_firstHeading;
    carousel_data["second_heading"] = data.slider_secondHeading;
    carousel_data["impText"] = data.slider_impText;
    carousel_data["button_text"] = data.slider_btnText;
  } else {
    carousel_data["id"] = data?.id;
    carousel_data["image"] = data.image;
    carousel_data["first_heading"] = data.first_heading;
    carousel_data["second_heading"] = data.second_heading;
    carousel_data["impText"] = data.important_text;
    carousel_data["button_text"] = data.button_text;
  }
  return (dispatch) => {
    dispatch({ type: ActionTypes.ADD_CAROUSEL_DATA, payload: carousel_data });
  };
};

export const EditCarousel = (data, ImagePath, id) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.EDIT_CAROUSEL_DATA,
      payload: { data: data, imagePath: ImagePath, ID: id },
    });
  };
};

export const DeleteCarousel = (id) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_CAROUSEL_DATA, payload: { id: id } });
  };
};

export const SubmitCarouselData = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SUBMIT_CAROUSEL_DATA,
    });
  };
};
