import * as types from "../constants/order.constants";

const initialState = {
  loading: false,
  error: "",
  orderNum: null,
  orderList: [],
  totalPageNum: 1,
  selectedOrder: {},
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNum: payload };
    case types.CREATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.GET_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_ORDER_REQUEST:
      return { ...state, loading: true, error: "" };
    case types.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.GET_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_SELECTED_ORDER:
      return { ...state, loading: true, error: "", selectedOrder: payload };
    default:
      return state;
  }
}
export default orderReducer;
