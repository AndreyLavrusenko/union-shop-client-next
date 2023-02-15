import type { NextApiRequest, NextApiResponse } from 'next'
import {popularFunc} from "@/utils/getPopularProduct";

type Data = {
    result?: any
    message?: string,
    resultCode?: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        popularFunc(res, 'category_2', 'categories2_name', 'categories2_desc')
    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}
