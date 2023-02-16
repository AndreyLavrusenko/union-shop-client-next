import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/reducer/userSlice";
import cartSlice from "@/redux/reducer/cartSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch