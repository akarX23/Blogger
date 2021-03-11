import { LOGIN, LOGOUT, SIGNUP, USER_AUTH } from "../ACTION_TYPES";

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_AUTH:
      return { ...state, ...payload };
    case LOGIN:
      return { ...state, ...payload };
    case LOGOUT:
      return { ...state, ...payload, user: null };
    case SIGNUP:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default userReducer;
