import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
        unionError: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginUnionFailure: (state) => {
            state.isLoading = false;
            state.unionError = true;
        },
        loginGoogleStart: (state) => {
            state.isLoading = true
        },
        loginGoogleSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginGoogleFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        loginOrRegFailure: (state) => {
            state.isLoading = false;
            state.error = true
        },
        loginFailureServices: (state) => {
            state.isLoading = false;
        },
        logoutStart: (state) => {
            state.isLoading = true
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.error = false;
            state.unionError = false;
            state.currentUser = null;
        },
        logoutFailure: (state) => {
            state.isLoading = false;
        },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginUnionFailure,
    loginOrRegFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    loginFailureServices,
    loginGoogleStart,
    loginGoogleFailure,
    loginGoogleSuccess
} = userSlice.actions;
export default userSlice.reducer;