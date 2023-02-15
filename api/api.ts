import axios from "axios";
import {Dispatch} from "redux";
import {loginOrRegFailure, loginStart, loginSuccess} from "@/redux/reducer/userSlice";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACK_URI,
})


export const authAPI = {
}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('api/system/copyright')
        return data
    }
}