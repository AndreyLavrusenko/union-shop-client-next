import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        error: false,
        isUpdate: false,
    },
    reducers: {
        cartStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        cartSuccess: (state) => {
            state.isLoading = false;
            state.error = false;
            state.isUpdate = !state.isUpdate
        },
        cartError: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    }
})


export const {cartStart, cartSuccess, cartError} = cartSlice.actions

export default cartSlice.reducer