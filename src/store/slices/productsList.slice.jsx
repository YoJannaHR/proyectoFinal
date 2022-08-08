import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsListSlice = createSlice({
  name: "productsList",
  initialState: [],
  reducers: {
    setProductsList: (state, action) => {
      const productsList = action.payload;
      return productsList;
    },
  },
});
export const getProductsListThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProductsList(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterHeadlineThunk = (searchValue) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`)
    .then((res) => dispatch(setProductsList(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};
export const filterCategoryThunk = (categoryId) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categoryId}`)
    .then((res) => dispatch(setProductsList(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};
export const { setProductsList } = productsListSlice.actions;

export default productsListSlice.reducer;
