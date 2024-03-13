import { createSlice } from "@reduxjs/toolkit";

const orderSlide = createSlice(
    {
        name: "orders",
        initialState: {
            order: {
                order: [],
                isFetching: false,
                error: false
            },
        },
        reducers: {
            getOrderStart: (state) => {
                state.order.isFetching = true;
            },
            
            getOrderSuccess: (state, action) => {
                state.order.isFetching = true;
                state.order.order = action.payload;
            },
            getOrdersFail: (state) => {
                state.order.isFetching = false;
                state.order.error = true;
            }
        }

    }
)
export const {
    getOrdersFail,
    getOrderSuccess,
    getOrderStart
} = orderSlide.actions

export default orderSlide.reducer