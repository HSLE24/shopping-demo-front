import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });

    const response = await api.get("/user/me");

    if (response.status !== 200) {
      throw new Error(response.status, ", ", response.error);
    }

    dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: err.error });
    dispatch(logout());
  }
};
const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });

      const response = await api.post("/auth/login", { email, password });

      if (response.status !== 200) {
        throw new Error(response.status, ", ", response.error);
      }
      //sessionStorage.setItem("token", response.data.token);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
      dispatch(
        commonUiActions.showToastMessage("로그인을 완료했습니다.", "success")
      );
    } catch (err) {
      dispatch({ type: types.LOGIN_FAIL, payload: err.error });
      dispatch(commonUiActions.showToastMessage(err.error, "error"));
    }
  };
const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });

  //sessionStorage.removeItem("token");
  localStorage.removeItem("token");
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });
    if (response.status !== 200) {
      throw new Error(response.status, ", ", response.error);
    }
    //sessionStorage.setItem("token", response.data.token);
    localStorage.setItem("token", response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    dispatch(
      commonUiActions.showToastMessage("로그인을 완료했습니다.", "success")
    );
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post("/user", { email, name, password });
      if (response.status !== 200) {
        throw new Error(response.status, ", ", response.error);
      }
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료했습니다.", "success")
      );
      navigate("/");
    } catch (err) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: err.error });
      dispatch(commonUiActions.showToastMessage(err.error, "error"));
    }
  };

const userErrorClear = () => async (dispatch) => {
  dispatch({ type: types.USER_ERROR_CLEAR });
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  userErrorClear,
};
