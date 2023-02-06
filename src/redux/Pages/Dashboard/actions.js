import axios from "axios";
import * as actionTypes from '../../actionTypes'
import { URL } from "../../../env";

export const getDetails = ()=>{
    return (dispatch) =>{
        axios.get(`${URL}/admin/dashboard`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            }
          }).then((response)=>{
            dispatch({
                type: actionTypes.DashboardDetail,
                payload: response
            })
          }).catch((error)=>{
          })
    }
}

export const leadLastFormSubmitted = (user_id)=>{
    return (dispatch) =>{
        axios.get(`${URL}/leadhistory`, {
            params: { id: user_id },
          }).then((response)=>{
            dispatch({
                type: actionTypes.LeadLastForm,
                payload: response.data.data[0]
            })
          }).catch((error)=>{
          })
    }
}