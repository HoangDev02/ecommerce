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

        }
    },
)
export const {
  getCategoryFailed,
  getCategoryStart,
  getCategorySuccess
} = categorySlide.actions

export default categorySlide.reducer