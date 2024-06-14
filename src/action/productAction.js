import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get("/product", {
      params: { ...query },
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: err.error });
  }
};
const getProductDetail = (id) => async (dispatch) => {
  try {
    //console.log("getProductDetail");
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/product/${id}`);
    //console.log(response);
    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({
      type: types.GET_PRODUCT_DETAIL_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    const response = await api.post("/product", formData);

    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({
      type: types.PRODUCT_CREATE_SUCCESS,
      payload: response.data,
    });
    dispatch(
      commonUiActions.showToastMessage("상품 생성을 완료했습니다.", "success")
    );
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const response = await api.delete(`/product/${id}`);

    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({
      type: types.PRODUCT_DELETE_SUCCESS,
    });
    dispatch(
      commonUiActions.showToastMessage("상품 삭제를 완료했습니다.", "success")
    );
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const response = await api.put(`/product/${id}`, formData);

    if (response.status !== 200) {
      throw new Error(response.error);
    }

    dispatch({
      type: types.PRODUCT_EDIT_SUCCESS,
      payload: response.data,
    });
    dispatch(
      commonUiActions.showToastMessage("상품 수정을 완료했습니다.", "success")
    );
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
