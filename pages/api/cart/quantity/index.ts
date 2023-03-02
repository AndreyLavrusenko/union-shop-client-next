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

            const sql = "SELECT quantity FROM cart WHERE userId = ?"
            const data = [authHeader]

            pool.query(sql, data, (error, result: any[]) => {
                if (error) return res.status(400).json({message: "Products not found", resultCode: 1})


                const price = result.reduce((accumulator, object) => {
                    return accumulator + object.quantity
                }, 0)

                return res.status(201).json(price)

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