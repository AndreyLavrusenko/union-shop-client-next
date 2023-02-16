import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'

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
        const sql = `SELECT * FROM product WHERE isTop = ? AND isVisible = ?`;
        const data = [1, 1];

        pool.query(sql, data, (error, result: any) => {
            if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

            if (result.length === 0) {
                return res.status(400).json({message: "Products not found", resultCode: 1})
            }

            return res.status(200).json(result)
        })


    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
}
