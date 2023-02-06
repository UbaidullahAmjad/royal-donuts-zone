import * as actionTypes from '../../actionTypes'
import * as variables from '../../global-variables/global-variables'

const initialState = {
    user_detail: null,
    userPermissions: variables.userPermissions,
    userRole: variables.userRole,
    leadLastFromSubmitted_Stage: null,
    user_id: variables.user_id

}

const setDashboardDetails = (state= initialState, action)=>{
   switch (action.type){
    case actionTypes.DashboardDetail:{
       return{ 
        ...state,
        user_detail: action.payload.data
       }

    }
    case actionTypes.LeadLastForm:{
        return{ 
         ...state,
         leadLastFromSubmitted_Stage: action.payload
        }
 
     }
   default:
    return state
   }
}
export default setDashboardDetails;