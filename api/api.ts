import axios from "axios";
import jwt_decode from 'jwt-decode'
import {Dispatch} from "redux";

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