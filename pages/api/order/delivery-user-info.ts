import type { NextApiRequest, NextApiResponse } from 'next'
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

            const sql = "UPDATE orders SET userInfo = ?, email = ? WHERE userId = ? AND status = ?"
            const data = [req.body.userInfo, req.body.email, authHeader, 'process']


            pool.query(sql, data, (error, result_update) => {
                if (error) return res.status(400).json({message: error, resultCode: 1})


                const find_user_sql = "SELECT * FROM users WHERE id = ?"
                const find_user_data = [authHeader]


                pool.query(find_user_sql, find_user_data, (error, result: any[]) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    if (result.length === 0) {
                        const user_sql = "INSERT INTO users (id, userId, userInfo) VALUES (?, ?, ?)"
                        const user_data = [authHeader, authHeader, req.body.userInfo]

                        pool.query(user_sql, user_data, (error, result) => {
                            if (error) return res.status(400).json({message: error, resultCode: 1})

                            return res.status(200).json({resultCode: 0})
                        })
                    } else {
                        const sql_user = "UPDATE users SET userInfo = ? WHERE id = ?"
                        const data_user = [req.body.userInfo, authHeader]

                        pool.query(sql_user, data_user, (error, result) => {
                            if (error) return res.status(400).json({message: error, resultCode: 1})

                            return res.status(200).json({resultCode: 0})
                        })
                    }
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