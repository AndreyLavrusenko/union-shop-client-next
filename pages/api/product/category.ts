import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        const sql = `SELECT categories FROM product WHERE isVisible = 1 GROUP BY categories`;

        pool.query(sql, (error, result) => {
            if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

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
