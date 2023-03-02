import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        error: false,
        isUpdate: false,
        quantity: 0,
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
        setCartQuantity: (state, action) => {
            state.quantity = action.payload
        }
    }
})


export const {cartStart, cartSuccess, cartError, setCartQuantity} = cartSlice.actions

export default cartSlice.reducer