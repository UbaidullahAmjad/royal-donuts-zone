import * as ActionTypes from "./Carousel_action_types";

const initialState = {
  number_of_slides: 0,
  slides_array: [],
  submitted_carousel_data: [],
};

const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CAROUSEL_DATA: {
      var carousel_data_increment_slider_index = action.payload;
      carousel_data_increment_slider_index["number"] =
        state.number_of_slides + 1;
      return {
        ...state,
        number_of_slides: state.number_of_slides + 1,
        slides_array: state.slides_array.concat(
          carousel_data_increment_slider_index
        ),
      };
    }
    case ActionTypes.EDIT_CAROUSEL_DATA: {
      var slides_array_data = [...state.slides_array];
      var found_slides_array_with_id = slides_array_data.findIndex(
        (item) => item.id == action.payload.ID
      );
      if (found_slides_array_with_id > -1) {
        slides_array_data[found_slides_array_with_id]["image"] =
          action.payload.data[`slider_${action.payload.ID}_image`];
        slides_array_data[found_slides_array_with_id]["image_temp_path"] =
          action.payload.imagePath?.previewUrl;
        slides_array_data[found_slides_array_with_id]["first_heading"] =
          action.payload.data[`slider_${action.payload.ID}_firstHeading`];

        slides_array_data[found_slides_array_with_id]["second_heading"] =
          action.payload.data[`slider_${action.payload.ID}_secondHeading`];

        if (
          action.payload.data[`slider_${action.payload.ID}_btnText`] != "" ||
          action.payload.data[`slider_${action.payload.ID}_btnText`] !=
          undefined
        ) {
          slides_array_data[found_slides_array_with_id]["button_text"] =
            action.payload.data[`slider_${action.payload.ID}_btnText`];
        }
        if (
          action.payload.data[`slider_${action.payload.ID}_btnUrl`] != "" ||
          action.payload.data[`slider_${action.payload.ID}_btnUrl`] !=
          undefined
        ) {
          slides_array_data[found_slides_array_with_id]["url"] =
            action.payload.data[`slider_${action.payload.ID}_btnUrl`];
        }
        if (
          action.payload.data[`slider_${action.payload.ID}_impText`] != "" ||
          action.payload.data[`slider_${action.payload.ID}_impText`] !=
          undefined
        ) {
          slides_array_data[found_slides_array_with_id]["impText"] =
            action.payload.data[`slider_${action.payload.ID}_impText`];
        }
      }
    
      return {
        ...state,
        slides_array: slides_array_data,
      };
    }

    case ActionTypes.DELETE_CAROUSEL_DATA: {
      return {
        ...state,
        number_of_slides:
          state.number_of_slides > 0 ? state.number_of_slides - 1 : 0,
        slides_array: state.slides_array.filter(
          (item) => item.id != action.payload.id
        ),
      };
    }

    case ActionTypes.SUBMIT_CAROUSEL_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default CarouselReducer;
