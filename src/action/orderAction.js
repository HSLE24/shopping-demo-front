import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);

    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    dispatch(
      commonUiActions.showToastMessage("주문이 완료 되었습니다.", "success")
    );
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (err) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order/me");
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data,
    });
    //console.log("getOrder ", response.data);
  } catch (err) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: err.error });
  }
};

const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order", {
      params: { ...query },
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: err.error });
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, {
      status,
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: response.data,
    });
    dispatch(getOrderList({ page: 1, orderNum: "" }));
  } catch (err) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err.error });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
