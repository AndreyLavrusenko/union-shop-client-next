import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACK_URI,
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
    }


}


export const systemAPI = {
    getCopyright: async () => {
        const {data} = await instance.get('api/system/copyright')
        return data
    }
}