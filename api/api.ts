import axios from "axios";
import {Dispatch} from "redux";
import {cartError, cartStart, cartSuccess} from "@/redux/reducer/cartSlice";
import {IProductInfo} from "@/models/IProductInfo";
import {IUserData} from "@/models/IUserData";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACK_URI,
})


export const authAPI = {
    getUserInfo: async () => {
        return await instance.get('api/auth/userInfo')
    },

    getUserEmailConfirmed: async () => {
        return await instance.get('api/auth/user-confirmed')
    },

    // Для повторнй отправки письма
    sendConfirmEmail: async (email: string) => {
        return await instance.post('api/auth/send-email', {email})
    },

    confirmGoogleUser: async (email: string, token: string) => {
        return await instance.post('api/auth/confirm-google-account', {email, token})
    }
}

export const profileAPI = {
    getUserInfo: async () => {
      return await instance.get('api/profile/get-profile-info')
    },

    setUserInfo: async (data: string) => {
        return await instance.post('api/profile/save-profile-info', {data})
    },

    getUserEmail: async () => {
        return await instance.get('api/profile/get-user-email')
    }
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

    renderNew: async () => {
        try {
            const {data} = await instance.get('api/product/new')
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

    getProductById: async (id: string | string[]) => {
        try {
            const product = await instance.get(`api/product/${id}`)

            return {product}

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

    getCartQuantity: async () => {
        const {data} = await instance.get('api/cart/quantity')
        return data
    },

    saveDiscountPrice: async (price: number) => {
        await instance.put(`api/cart/save-discount-price`, {price})
    }
}


export const orderAPI = {
    getOrders: async () => {
        return await instance.get('api/order')
    },

    getOrderSum: async () => {
        return await instance.get('api/order/order-sum')
    },

    createOrder: async (deliverType: string, letter: string) => {
        return await instance.post('api/order', {deliverType, letter})
    },

    setNewDeliveryPrice: async (price: number, deliveryType: string) => {
        return await instance.post('api/order/change-price', {price, deliveryType})
    },

    setUserInfoDelivery: async (userInfo: IUserData, email: string) => {
        return await instance.put('api/order/delivery-user-info', {userInfo, email})
    },

    getOrdersQuantity: async () => {
        return await instance.get('api/order/get-quantity-orders')
    },

    setPerformedOrderStatus: async () => {
        return await instance.put('api/order/delivery-buy', {})
    },

    getOrderById: async (id: string | string[]) => {
        return await instance.get(`api/order/${id}`)
    },

    getCompleteOrders: async () => {
        return await instance.get(`api/order/get-complete-orders`)
    },
}

export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('api/system/copyright')
        return data
    }
}