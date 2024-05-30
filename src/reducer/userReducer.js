import * as types from "../constants/user.constants";
const initialState = {
  error: "",
  loading: false,
  user: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.REGISTER_USER_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: "" };
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload };

    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, error: "", user: payload.user };
    case types.LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default userReducer;
