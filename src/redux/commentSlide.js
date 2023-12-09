import { createSlice } from "@reduxjs/toolkit";

const commentSlide = createSlice({
  name: "comments",
  initialState: {
    comments: {
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
    getCommentStart: (state) => {
      state.comments.isFetching = true;
    },
    getCommentSuccess: (state, action) => {
      state.comments.isFetching = false;
      state.comments.comments = action.payload;
      state.comments.error = false;
    },
    getCommentsFailed: (state) => {
      state.comments.isFetching = true;
      state.comments.error = true;
    },
  },
});
export const { getCommentStart, getCommentSuccess, getCommentsFailed } =
  commentSlide.actions;

export default commentSlide.reducer;
