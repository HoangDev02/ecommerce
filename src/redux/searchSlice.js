import { createSlice } from "@reduxjs/toolkit";

const searchSlide = createSlice(
    {
        name: "searchs",
        initialState: {
            search: {
                allSearch: null,
                isFetching: false,
                error: false
            },
        },
        reducers: {
            getSearchsStart: (state) => {
                state.search.isFetching = true;
            },
            
            getSearchsSuccess: (state, action) => {
                state.search.isFetching = true;
                state.search.allSearch = action.payload;
            },
            getSearchsFail: (state) => {
                state.search.isFetching = false;
                state.search.error = true;
            }
        }

    }
)
export const {
    getSearchsFail,
    getSearchsSuccess,
    getSearchsStart
} = searchSlide.actions

export default searchSlide.reducer