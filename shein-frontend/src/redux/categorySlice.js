import { createSlice } from "@reduxjs/toolkit";

const categorySlide = createSlice(
    {
        name:"categories",
        initialState: {
            categories: {
                allCategory: null,
                isFetching: false,
                error: false
            },
            detailCategory: {
                Category: null,
                isFetching: false,
                error: false
            },
            msg: ""
        },
        reducers: {
            getCategoryStart: (state) => {
                state.categories.isFetching = true;
            },
            getCategorySuccess: (state, action) => {
                state.categories.isFetching = false;
                state.categories.allCategory = action.payload
            },
            getCategoryFailed: (state) => {
                state.categories.isFetching = false;
                state.categories.error = true;
            },
            getDetailCategoryStart: (state) => {
                state.detailCategory.isFetching = true;
            },
            getDetailCategorySuccess: (state, action) => {
                state.detailCategory.isFetching = false;
                state.detailCategory.Category = action.payload
            },
            getDetailCategoryFailed: (state) => {
                state.detailCategory.isFetching = false;
                state.detailCategory.error = true;
            },
        }
    },
)
export const {
  getCategoryFailed,
  getCategoryStart,
  getCategorySuccess,
  getDetailCategoryFailed,
  getDetailCategoryStart,
  getDetailCategorySuccess
} = categorySlide.actions

export default categorySlide.reducer