import {pool} from "@/config/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

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

        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            const sql = "UPDATE cart SET quantity = quantity + 1 WHERE id = ? AND userId = ?"
            const data = [req.query.id, authHeader]

            pool.query(sql, data, (error, result) => {
                if (error) return res.status(400).json({message: "Товар не найден", resultCode: 1})

                return res.status(201).json({resultCode: 0})
            })

        }

    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }

}


export const config = {
    api: {
        externalResolver: true,
    },
}