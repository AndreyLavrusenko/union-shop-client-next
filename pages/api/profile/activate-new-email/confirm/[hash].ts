import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // Страница которая меняет почту у пользователя
    try {
        const hash = req.query.hash

        const sql = `SELECT id, newEmail FROM users WHERE newEmailHash = ?`
        const data = [hash]


        // Отправка запроса и его проверка
        pool.query(sql, data, async (error, result: any) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            if (result[0]) {
                const sqlChangeEmail = "UPDATE users SET email = ?, newEmail = ?, newEmailHash = ? WHERE id = ?"
                const dataChangeEmail = [result[0].newEmail, null, null, result[0].id]

                pool.query(sqlChangeEmail, dataChangeEmail, async (error, result: any) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    return res.status(200).json("Почта изменена")
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