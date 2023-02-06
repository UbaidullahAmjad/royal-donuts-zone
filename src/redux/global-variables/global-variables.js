
export const user_id = atob(localStorage.getItem("user_id"));

let permission = localStorage.getItem("permissions");
      let permissions = atob(permission);
      let single = permissions.split(",").map((text) => text);

export const userPermissions = single;

let rol = localStorage.getItem("role");
let role = atob(rol);
export const userRole = role;