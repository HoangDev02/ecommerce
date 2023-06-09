import { createSlice } from "@reduxjs/toolkit";

const productSlide = createSlice(
    {
        name:"products",
        initialState: {
            products: {
                allProduct: null,
                isFetching: false,
                error: false
            },
            detailProduct: {
                product: [],
                isFetching: false,
                error: false
            },
            msg: ""
        },
        reducers: {
            getProductsStart: (state) => {
                state.products.isFetching = true;
            },
            getProductsSuccess: (state, action) => {
                state.products.isFetching = false;
                state.products.allProduct = action.payload
            },
            getProductsFailed: (state) => {
                state.products.isFetching = false;
                state.products.error = true;
            },

            getSingleProductStart: (state) => {
                state.detailProduct.isFetching = true;
            },
            getSingleProductSuccess: (state, action) => {
                state.detailProduct.isFetching = false;
                state.detailProduct.product = action.payload
            },
            getSingleProducFailed: (state) => {
                state.detailProduct.isFetching = false;
                state.detailProduct.error = true;
            },

            updateProductStart: (state) => {
                state.detailProduct.isFetching = true;
            },
            updateProductSuccess: (state, action) => {
                state.detailProduct.isFetching = false;
                state.detailProduct.product = action.payload
            },
            updateProductFail: (state) => {
                state.detailProduct.error = false;
                state.detailProduct.isFetching = false
            },
            deleteProductStart: (state) => {
                state.products.isFetching = true
            },
            deleteProductSuccess: (state, action) => {
                state.products.isFetching = false;
                state.msg = action.payload
            },
            deleteProductFail: (state, action) => {
                state.msg = action.payload;
                state.products.isFetching = false;
                state.products.error = true;
            }
        }
    },
)
export const {
    getProductsFailed,
    getProductsStart,
    getProductsSuccess,
    getSingleProducFailed,
    getSingleProductStart,
    getSingleProductSuccess,
    updateProductFail,
    updateProductStart,
    updateProductSuccess,
    deleteProductFail,
    deleteProductStart,
    deleteProductSuccess
} = productSlide.actions

export default productSlide.reducer