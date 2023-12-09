import { createSlice } from "@reduxjs/toolkit";

const reviewsSlide = createSlice({
  name: "reviews",
  initialState: {
    reviews: {
      comments: [],
      isFetching: false,
      error: false,
    },
    ratings: {
      ratings: [],
    },
    msg: "",
  },
  reducers: {
    getReviewsStart: (state) => {
      state.reviews.isFetching = true;
    },
    getReviewsSuccess: (state, action) => {
      state.reviews.isFetching = false;
      state.reviews.reviews = action.payload;
      state.reviews.error = false;
    },
    getReviewsFailed: (state) => {
      state.reviews.isFetching = true;
      state.reviews.error = true;
    },
  },
});
export const {getReviewsStart,getReviewsFailed,getReviewsSuccess } =
reviewsSlide.actions;

export default reviewsSlide.reducer;
