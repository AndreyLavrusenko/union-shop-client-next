import {pool} from "@/config/db";
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    result?: any
    message?: string,
    resultCode?: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'GET') {

        try {
            const sql = "SELECT * FROM product WHERE uniqCode = ?"
            const data = [req.query.id]

            pool.query(sql, data, (error, result: any) => {
                if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                //@ts-ignore
                return res.status(200).json(...result)

            })

        } catch (err) {
            return res.status(500).json({message: "Что-то пошло не так"})
        }

    } else if (req.method === "DELETE") {

        try {

            const sql = "DELETE FROM cart WHERE id = ?"
            const data = [req.query.id]

            pool.query(sql, data, (error, result) => {
                if (error) return res.status(400).json({message: "Товар не найден", resultCode: 1})

                return res.status(201).json({resultCode: 0})
            })


        } catch (err) {
            return res.status(500).json({message: "Что-то пошло не так"})
        }
    }

}


export const config = {
    api: {
        externalResolver: true,
    },
}