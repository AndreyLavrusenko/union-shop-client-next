import type {NextApiRequest, NextApiResponse} from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            const sqlFindUser = "SELECT email FROM users WHERE id = ?"
            const dataFindUser = [authHeader]

            pool.query(sqlFindUser, dataFindUser, (error, resultFind: any[]) => {
                if (error) return res.status(400).json({message: error, resultCode: 1})


                const sql = "UPDATE users SET userInfo = ? WHERE id = ?"
                const data = [req.body.data, authHeader]

                pool.query(sql, data, (error, result) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    return res.status(200).json({resultCode: 0})
                })

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