import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // Страница которая меняет почту у пользователя
    try {
        const hash = req.query.hash

        const sql = `SELECT id, newEmail, userInfo FROM users WHERE newEmailHash = ?`
        const data = [hash]

        // Получаю данные о пользователе
        pool.query(sql, data, async (error, result: any) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            // Если пользователь с такие email найден
            if (result[0]) {

                // Меняю email в userInfo
                let newUserInfo = null

                if (result[0].userInfo) {
                    newUserInfo = JSON.parse(result[0].userInfo)
                    newUserInfo.email = result[0].newEmail
                }

                const sqlChangeEmail = "UPDATE users SET email = ?, newEmail = ?, newEmailHash = ?, userInfo = ? WHERE id = ?"
                const dataChangeEmail = [result[0].newEmail, null, null, newUserInfo ? JSON.stringify(newUserInfo) : req.body.userInfo, result[0].id]

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