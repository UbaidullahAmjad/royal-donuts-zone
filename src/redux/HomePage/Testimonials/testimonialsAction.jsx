import axios from 'axios'
import { URL } from '../../../env'
import { GET_TESTIMONIALS } from '../../types'

const setTestimonials = (data) => ({
  type: GET_TESTIMONIALS,
  payload: data
})


export const getTestimonials = () => {
  return async (dispatch) => {
    return await axios({
      method: 'get',
      url: `${URL}/index`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    }).then(response => {
      dispatch(setTestimonials(response.data.testimonial))
    })
  }
}
