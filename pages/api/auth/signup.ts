import type {NextApiRequest, NextApiResponse} from 'next'
import {pool} from '@/config/db'
import md5 from 'md5'
import {v4 as uuidv4} from 'uuid';


// Регистрация или вход обычным способом
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        // Проверка были отправлены какие нибудь данные или нет
        if (!req.body.email || !req.body.password) return res.status(400).json({resultCode: 1})

        const hash = md5(req.body.password)

        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
        const data = [req.body.email, hash]

        // Отправка запроса и его проверка
        pool.query(sql, data, async (error, result: any) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            // Если пользователя не сущетсвует то создаем его
            //@ts-ignore
            if (result.length === 0) {

                const id = uuidv4()

                const sql_reg = `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`
                const regData = [id, req.body.email, hash]

                pool.query(sql_reg, regData, async (error, result: any) => {
                    if (error) return res.status(400).json({message: "Something went wrong!", resultCode: 1})

                    return res.status(200).json(result[0])
                })
            } else {
                // Записываем email пользователя
                return res.status(200).json(result[0])
            }
        })

    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}
