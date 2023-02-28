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

    getAllCategory: async (category: string = "all", page: number = 0, search: string = '') => {

        const {data} = await instance.get(`api/product/shop?page=${page}&category=${category !== 'all' ? category : 'all'}&search=${search}`)

        return data
    },

    getAllCategoryType: async () => {
        const {data} = await instance.get('api/product/category')
        return data
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

    getCart: async () => {
        const {data} = await instance.get('api/cart/all')
        return data
    },

    getItemFromCart: async (uniqCode: number) => {
        const {data} = await instance.get(`api/cart/${uniqCode}`)
        return data
    },

    plusQuantity: async (id: number) => {
        await instance.put(`api/cart/quantity/plus/${id}`)
    },

    minusQuantity: async (id: number) => {
        await instance.put(`api/cart/quantity/minus/${id}`)
    },

    deleteItemFromCart: async (id: number) => {
        await instance.delete(`api/cart/${id}`)
    },

}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('api/system/copyright')
        return data
    }
}