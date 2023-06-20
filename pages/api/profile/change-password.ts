import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import md5 from 'md5'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            // Проверка были отправлены какие нибудь данные или нет
            if (!req.body.passwords.oldPassword || !req.body.passwords.newPassword) return res.status(400).json({resultCode: 1})

            const hash = md5(req.body.passwords.oldPassword)

            // Проверка совпадают ли пароли у пользователя
            const sql = "SELECT password FROM users WHERE id = ?"
            const data = [authHeader]

            pool.query(sql, data, (error, result: any) => {
                if (error) return res.status(400).json({message: error, resultCode: 1})

                if (result[0]) {
                    if (result[0].password === hash) {

                        const newPasswordHash = md5(req.body.passwords.newPassword)

                        // Если совпали то меняем старый пароль на новый
                        const sqlChangePassword = "UPDATE users SET password = ? WHERE id = ?"
                        const dataChangePassword = [newPasswordHash, authHeader]

                        pool.query(sqlChangePassword, dataChangePassword, (error, result: any) => {
                            if (error) return res.status(400).json({message: error, resultCode: 1})

                            return res.status(200).json({resultCode: 0})
                        })
                    } else {
                        return res.json({resultCode: 1})
                    }
                } else {
                    return res.json({resultCode: 1})
                }
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