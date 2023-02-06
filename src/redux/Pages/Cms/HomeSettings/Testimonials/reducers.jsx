/* eslint-disable no-unused-vars */
import {
    TESTIMONIALS_LIST,
    TESTIMONIAL_DELETE,
    TESTIMONIAL_CREATE,
    TESTIMONIAL_EDIT,
} from "../../../../actionTypes";

const initialState = {
    testimonialsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const TestimonialsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TESTIMONIALS_LIST: {
            let allTestimonials = [];
            if (payload.response != null) {
                allTestimonials = payload.response.testimonials;
                allTestimonials.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allTestimonials.length;
            }
            return {
                ...state,
                testimonialsList: allTestimonials,
                tempArrLength: state.tempArrLength,
                createdLength: state.tempArrLength,
                editedLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case TESTIMONIAL_DELETE: {
            let deleted_category = state.testimonialsList
            if (payload.prodId) {
                if (state.testimonialsList.length > 0 && payload.isError == false) {
                    deleted_category = state.testimonialsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                testimonialsList: deleted_category,
                tempArrLength: state.tempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case TESTIMONIAL_CREATE: {
            let newTempArrLength = state.testimonialsList.length;
            newTempArrLength = newTempArrLength + 1;
            state.createdLength = state.createdLength + 1;
            if (payload.isError == false) {
                // let testimonialCreated = payload.response.testimonial;
                // let oldArray = [...state.testimonialsList];
                // oldArray.push(testimonialCreated);
                // setTestimonials([...oldArray]);
            }
            return {
                ...state,
                testimonialsList: state.testimonialsList,
                tempArrLength: newTempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case TESTIMONIAL_EDIT: {
            let newTempArrLength = state.testimonialsList.length;
            if (state.testimonialsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
                state.editedLength = state.editedLength + 1;
            }
            return {
                ...state,
                testimonialsList: state.testimonialsList,
                tempArrLength: newTempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
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

export default TestimonialsReducer;