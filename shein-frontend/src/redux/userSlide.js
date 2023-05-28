import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice(
    {
        name: "users",
        initialState: {
            users: {
                allUser: null,
                isFetching: false,
                error: false
            },
            msg:"",
        },
        reducers: {
            getUsersStart: (state) => {
                state.users.isFetching = true;
            },
            getUsersSuccess: (state,action) => {
                state.users.isFetching = false;
                state.users.allUser = action.payload;
            },
            getUsersFailed: (state) => {
                state.users.isFetching = false;
                state.users.error = true;
            },
            
            deleteUsersStart: (state) => {
                state.users.isFetching = true;
            },
            deleteUsersSuccess: (state, action) =>  {
                state.users.isFetching = false;
                state.msg = action.payload
            },
            deleteUsersFailed: (state,action) => {
                state.users.isFetching = false;
                state.users.error = true;
                state.msg = action.payload
            }
        }
});

export const {
   getUsersFailed,
   getUsersStart,
   getUsersSuccess,
   deleteUsersFailed,
   deleteUsersStart,
   deleteUsersSuccess
} = userSlide.actions;

export default userSlide.reducer;
