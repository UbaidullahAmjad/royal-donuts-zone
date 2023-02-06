import * as actionTypes from "../actionTypes";

export const UserRolePermission = (data) => {
  return {
    type: actionTypes.user_role_permission,
    payload: { data: data },
  };
};
