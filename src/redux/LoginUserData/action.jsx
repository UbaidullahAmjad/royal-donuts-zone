import * as actionTypes from "../actionTypes";

export const UserRolePermission = (data) => {
  console.log("DATAAAAAA", data);
  return {
    type: actionTypes.user_role_permission,
    payload: { data: data },
  };
};
