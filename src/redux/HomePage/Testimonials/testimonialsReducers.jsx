import { GET_TESTIMONIALS } from '../../types'
const initialState = {
    testimonialsList: []
}

const Testimonials = (state = initialState, action) => {

    switch (action.type) {
        case GET_TESTIMONIALS:
            return {
                ...state,
                testimonialsList: action.payload,
            }
        default:
            return state
    }
}

export default Testimonials;