import { createSlice } from "@reduxjs/toolkit";

const techSepcsSlide = createSlice({
  name: "techSpecs",
  initialState: {
    techSpecs: {
      techSpecs: [],
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getTechSpecsStart: (state) => {
      state.techSpecs.isFetching = true;
    },
    getTechSpecsSuccess: (state, action) => {
      state.techSpecs.isFetching = false;
      state.techSpecs.techSpecs = action.payload;
      state.techSpecs.error = false;
    },
    getTechSpecsFailed: (state) => {
      state.techSpecs.isFetching = true;
      state.techSpecs.error = true;
    },
  },
});
export const { getTechSpecsStart, getTechSpecsSuccess, getTechSpecsFailed } =
  techSepcsSlide.actions;

export default techSepcsSlide.reducer;
