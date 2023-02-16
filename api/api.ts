import axios from "axios";
import {Dispatch} from "redux";
import {cartError, cartStart, cartSuccess} from "@/redux/reducer/cartSlice";
import {IProductInfo} from "@/models/IProductInfo";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACK_URI,
})


export const authAPI = {
}

export const productAPI = {
    renderTop: async () => {
        try {
            const {data} = await instance.get('api/product/top')
            return data;
        } catch (err) {
            console.log(err)
        }
    },

    renderCategory: async () => {
        try {
            const firstCategory = await instance.get('api/product/popular/first')

            const secondCategory = await instance.get('api/product/popular/second')

            const thirdCategory = await instance.get('api/product/popular/third')

            return {
                firstCategory,
                secondCategory,
                thirdCategory
            }

        } catch (err) {
            console.log(err)
        }
    },

    getAdvertising: async () => {
        const {data} = await instance.get("api/product/advertising")
        return data
    },

    getProductById: async (id: string) => {
        try {
            return await instance.get(`api/product/${id}`)
        } catch (err) {
            console.log(err)
        }
    },


}


export const cartAPI = {

    setProduct: async (product: IProductInfo, dispatch: Dispatch, userId: string) => {
        dispatch(cartStart())
        try {
            await instance.post('api/cart', product, {
                headers: {userId}
            })
            dispatch(cartSuccess())
        } catch (err) {
            dispatch(cartError())
        }
    },

}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('api/system/copyright')
        return data
    }
}