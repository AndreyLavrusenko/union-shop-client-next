import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        const sql = `SELECT * FROM product WHERE id = ${req.query.id}`;

        pool.query(sql, (error, result: any) => {
            if (error) return res.status(400).json({message: "Products not found", resultCode: 1})


            const sql = `SELECT * FROM all_products WHERE uniqCode = ?`;
            const data = [result[0].uniqCode]

            pool.query(sql, data, (error, info_result) => {
                if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                return res.status(200).json({result, info_result})
            })

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