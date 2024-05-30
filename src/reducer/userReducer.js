import * as types from "../constants/user.constants";
const initialState = {
  error: "",
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  if (type === types.REGISTER_USER_FAIL) {
    return { ...state, error: payload };
  }
  if (type === types.REGISTER_USER_REQUEST) {
    return { ...state, error: "" };
  }
  if (type === types.REGISTER_USER_SUCCESS) {
    return { ...state, error: "" };
  }

  return state;
}

export default userReducer;
