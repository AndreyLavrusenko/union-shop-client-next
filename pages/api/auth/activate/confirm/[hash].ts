import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // Страница которая меняет статус подтвержденной почты

    try {
        const hash = req.query.hash

        const sql = `SELECT id FROM users WHERE confirmHash = ?`
        const data = [hash]

        // Отправка запроса и его проверка
        pool.query(sql, data, async (error, result: any) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            if (result.length > 0) {
                const setConfirmSql = "UPDATE users SET confirmed = ?, confirmHash = null WHERE id = ?"
                const setConfirmData = [1, result[0].id]

                pool.query(setConfirmSql, setConfirmData, async (error, result: any) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    return res.status(200).json("Почта подтверждена")
                })
            }
        })


        } catch (err) {
        return res.status(500).json("Что-то пошло не так")
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}