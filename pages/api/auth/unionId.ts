import type { NextApiRequest, NextApiResponse } from 'next'
import {union_pool} from '@/config/db'
import md5 from 'md5'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        // Проверка были отправлены какие нибудь данные или нет
        if (!req.body.email || !req.body.password) return res.status(400).json({resultCode: 1})

        // Получение пользователя по введенным данным
        const sql = `SELECT email FROM registration WHERE email = ? AND password = ?`;
        const data = [req.body.email, md5(req.body.password)];

        // Отправка запроса и его проверка
        union_pool.query(sql, data, (error, result: any) => {
            if (error) return res.status(400).json({message: "Accounts not found", error, resultCode: 1})

            if (result.length === 0) {
                return res.status(400).json({message: "Accounts not found", resultCode: 1})
            }

            return res.status(200).json(result[0])
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